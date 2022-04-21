import React, {useState} from 'react';
import styled from "styled-components";
import {FaSearch} from "react-icons/fa";
import {useNavigate} from "react-router";

function Search() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/searched/' + input);
  }

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
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
    margin-left: 7rem;
    position: relative;
    width: 70%;
  }
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 0.9rem;
    color: white;
    padding: 0.5rem 2.5rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`

export default Search