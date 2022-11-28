import { BrowserRouter as Router } from "react-router-dom";
import styled from 'styled-components';
import "./App.css";
import Nav from "./components/Nav/Nav";
import Header from "./components/Header/Header";
import Pages from "./pages/Pages";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Main = styled.main`
  display: flex;
  padding-top: 80px;
`;

function App() {
  return (
    <Wrapper id="wrapper">
      <Header />
      <Main>
        <Router basename={process.env.PUBLIC_URL}>
          <Nav />
          <Pages />
        </Router>
      </Main>
    </Wrapper>
  );
}

export default App;
