import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"
import { apiPrefix } from "../constants"

function Recipe() {
  let params = useParams()
  const [details, setDetails] = useState({})
  const [activeTab, setActiveTab] = useState("instructions")
  const [ingredients, setIngredients] = useState([])

  const fetchDetails = async () => {
    try {
      const url = `${apiPrefix}/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      setDetails(data)
      for (const ingredients of data.extendedIngredients) {
        setIngredients((prev) => {
          return [...prev, ingredients.original]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name])

  return (
    <DetailWrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <Description
              dangerouslySetInnerHTML={{ __html: details.summary }}
            ></Description>
            <Description
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            ></Description>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {ingredients.map((ele, id) => (
              <li key={id}>{ele}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 8rem;
  margin-bottom: 4rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1rem;
    line-height: 2.2rem;
  }
  ul {
    margin-top: 2rem;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 700;
  cursor: pointer;
`

const Info = styled.div`
  margin-left: 5rem;
`

const Description = styled.p`
  margin-top: 1.5rem;
  line-height: 1.4rem;
`

export default Recipe
