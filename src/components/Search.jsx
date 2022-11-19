import React, { useState } from "react"
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router"

function Search() {
  const [input, setInput] = useState("")
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    navigate("/searched/" + input)
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Search"
          value={input}
        />
      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  margin: 0rem 10rem;
  div {
    position: relative;
    display: flex;
    justify-content: center;
  }
  input {
    margin: 0 auto;
    width: 80%;
    color: white;
    border: none;
    outline: none;
    font-size: 0.9rem;
    padding: 0.5rem 2.5rem;
    border-radius: 0.5rem;
    background: linear-gradient(35deg, #494949, #313131);
  }
  svg {
    position: absolute;
    top: 50%;
    left: 10%;
    transform: translate(100%, -50%);
    color: white;
  }

  @media (max-width: 991px) {
    padding: 0;
    margin: 0;
    div {
      margin: 0;
      width: 100%;
    }
    input {
      width: 60%;
      margin: 0 auto;
    }
    svg {
      left: 20%;
    }
  }
  @media (max-width: 767px) {
    input {
      width: 80%;
    }
    svg {
      left: 10%;
    }
  }
  @media (max-width: 575px) {
    input {
      width: 95%;
    }
    svg {
      left: 2%;
    }
  }
`

export default Search
