import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link, useParams} from "react-router-dom";

function Searched() {

    const [searched, setSearched] = useState([]);
    let params = useParams();

    const getSearched = async (name) => {
        const url = `https://api.spoonacular.com/recipes/complexSearch?number=9&apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`;
        const res = await fetch(url);
        const data = await res.json();
        setSearched(data.results);
    }

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);

  return (
    <Grid>
      {
        searched.map((recipe) => {
          return (
            <Card key={recipe.id}>
              <Link to={'/recipe/' + recipe.id}>
                <img src={recipe.image} alt={recipe.id} />
                <h4>{recipe.title}</h4>
              </Link>
            </Card>
          );
        })
      }
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 1.5rem;
`
const Card = styled.div`
  img{
    width: 100%;
    border-radius: 1.2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding: 0.5rem;
  }
`

export default Searched;