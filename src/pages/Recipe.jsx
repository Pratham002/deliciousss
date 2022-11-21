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
      if (ingredients.length !== 0) return
      const url = `${apiPrefix}/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      const res = await fetch(url)
      const data = await res.json()
      setDetails(data)
      console.log("data", data)
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
      <ViewRecipe>
        <h2>{details.title}</h2>
        <Image src={details.image} alt="" />
      </ViewRecipe>
      <Info>
        <ButtonsContainer>
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
        </ButtonsContainer>
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
          <UnOrderedList>
            {ingredients.map((ele, id) => (
              <li key={id}>{ele}</li>
            ))}
          </UnOrderedList>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin: 4rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
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
  @media (max-width: 991px) {
    margin: 2rem 0;
    padding: 1rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ViewRecipe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 991px) {
    margin: 0;
    padding: 0;
  }
`

const Image = styled.img`
  @media (max-width: 991px) {
    width: 100%;
  }
`

const ButtonsContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 991px) {
    justify-content: space-between;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  margin-right: 2rem;
  font-weight: 700;
  cursor: pointer;
  @media (max-width: 991px) {
    margin: 0 1rem;
  }
`
const UnOrderedList = styled.ul`
  @media (max-width: 991px) {
    margin: 0 1rem;
  }
`

const Info = styled.div`
  margin: 0 3rem;
`

const Description = styled.p`
  margin-top: 1.5rem;
  line-height: 1.4rem;
  @media (max-width: 991px) {
    margin: 1rem;
  }
`

export default Recipe
