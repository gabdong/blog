import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Header from "./components/Header/Header.js";
import Pages from "./pages/Pages.js";
import { checkToken } from "./apis/tokens";
import { useDispatch } from "react-redux";
import { loginUser } from "./modules/user";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      //* 권한 확인
      try {
        const authCheck = await checkToken();
        const accessToken = authCheck.data.newAccessToken;
        const user = authCheck.data.user;
        user.accessToken = accessToken;
        user.isLogin = true;

        dispatch(loginUser(user));
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    })();
  }, [dispatch]);

  return (
    <Wrapper id="wrapper">
      {loading ? null : (
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Main>
            <Nav />
            <Pages />
          </Main>
        </Router>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 90%;
  height: 100%;
  margin: 0 auto;
  background: #000000;
  overflow: hidden;
  user-select: none;
`;
const Main = styled.main`
  display: flex;
  flex: 1;
  height: calc(100% - var(--header-height) - var(--main-gap));
  padding-bottom: 60px;
`;

export default App;
