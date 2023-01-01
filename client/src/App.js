import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import Header from "./components/Header/Header.js";
import Pages from "./pages/Pages.js";
import { checkToken } from "./apis/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "./modules/user";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const authCheck = await checkToken();
        const accessToken = authCheck.data.newAccessToken;
        const user = authCheck.data.user;
        user.accessToken = accessToken;
        user.isLogin = true;

        dispatch(loginUser(user));
      } catch (err) {}

      setLoading(true);
    })();
  }, [dispatch]);

  return (
    <Wrapper id="wrapper">
      {loading ? (
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Main>
            <Nav />
            <Pages />
          </Main>
        </Router>
      ) : null}
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
