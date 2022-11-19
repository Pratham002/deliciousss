import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import { Link } from "react-router-dom"
import { apiPrefix } from "../constants"

function Popular() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    getPopular()
  }, [])

  const getPopular = async () => {
    try {
      const dataPresent =
        localStorage.getItem("dishes") !== undefined
          ? JSON.parse(localStorage.getItem("dishes"))
          : null

      if (dataPresent) {
        setDishes(dataPresent)
      } else {
        const url = `${apiPrefix}/random?number=15&apiKey=${process.env.REACT_APP_API_KEY}`
        const res = await fetch(url)
        const data = await res.json()

        localStorage.setItem("dishes", JSON.stringify(data.recipes))
        setDishes(data.recipes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          rewind: true,
          rewindSpeed: 500,
          autoplay: true,
          perPage: 4,
          gap: "0.5rem",
          pagination: false,
          type: "loop",
          drag: "free",
        }}
      >
        {dishes &&
          dishes.map((recipe, id) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
      </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 2rem 0.5rem;
`

const Card = styled.div`
  min-height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 1.4rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: #fff;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
    height: 40%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`

export default Popular
