import Navbar from "./components/Navbar"
import { BrowserRouter, Link } from "react-router-dom"
import Pages from "./pages/Pages"
import Search from "./components/Search"
import styled from "styled-components"
import { GiKnifeFork } from "react-icons/gi"

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Nav>
          <GiKnifeFork />
          <Logo to={"/"}>deliciousss</Logo>
        </Nav>
        <Search />
        <Navbar />
        <Pages />
      </BrowserRouter>
    </AppWrapper>
  )
}

const AppWrapper = styled.div`
  border: 2px solid black;
  margin: 0 15%;
  @media (max-width: 991px) {
    border: 2px solid red;
    padding: 0;
    margin: 0;
  }
`

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
`

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid red;
  svg {
    font-size: 2rem;
  }
`

export default App
