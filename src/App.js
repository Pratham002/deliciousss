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
  margin: 0 15%;
  @media (max-width: 991px) {
    padding: 0;
    margin: 0 7%;
  }
  @media (max-width: 767px) {
    margin: 0 2%;
  }
`

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  @media (max-width: 991px) {
    font-size: 2.5rem;
    font-weight: 500;
  }
`

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
  @media (max-width: 767px) {
    justify-content: center;
  }
`

export default App
