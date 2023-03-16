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
        const { user } = authCheck.data;
        user.accessToken = accessToken;
        user.isLogin = true;

        dispatch(loginUser(user));
      } catch (err) {
        if (err.status !== 401) console.error(err);
      } finally {
        setLoading(false);
      }
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
  align-items: center;
  gap: var(--header-main-space);

  width: 1600px;
  max-width: 90%;
  margin: 0 auto;
  user-select: none;
`;

const Main = styled.main`
  display: flex;

  width: 1200px;
  max-width: 100%;
  padding-bottom: var(--main-footer-space);
`;

export default App;
