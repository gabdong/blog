import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Header from "./components/Header/Header.js";
import Pages from "./pages/Pages.js";
import { refreshAuth } from "./apis/auth";
import authAxios from "./utils/axios";
import { useDispatch } from "react-redux";
import { loginUser } from "./modules/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const data = await refreshAuth();
      const { status, msg, accessToken, id } = data;

      if (status === 200) {
        authAxios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        const { user } = (await authAxios.get(`/apis/user/${id}`)).data;

        dispatch(loginUser(user));
      } else {
        console.error(msg);
      }
    })();
  }, [dispatch]);

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
