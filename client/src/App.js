import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Header from "./components/Header/Header.js";
import Pages from "./pages/Pages.js";

function App() {
  useEffect(() => {
    console.log("hi");
  }, []);

  return (
    <Wrapper id="wrapper">
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Main>
          <Nav />
          <Pages />
        </Main>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  display: flex;
  padding-top: 40px;
`;

export default App;
