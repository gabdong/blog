import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { checkToken } from "./apis/tokens";
import { loginUser } from "./modules/user";

import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Header from "./components/Header/Header.js";
import Pages from "./pages/Pages.js";

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
        <>
          <Header />
          <Router basename={process.env.PUBLIC_URL}>
            <Main>
              <Nav />
              <Pages />
            </Main>
          </Router>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 1600px;
  max-width: 90%;
  height: 100%;
  margin: 0 auto;
  background: #000000;
  overflow: hidden;
  user-select: none;
`;
const Main = styled.main`
  display: flex;

  width: 1024px;
  height: calc(100% - var(--header-height));
  padding-top: 40px;
  padding-bottom: 60px;
`;

export default App;
