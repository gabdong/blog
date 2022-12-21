import styled from "styled-components";
import axios from "../../utils/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../modules/user";
import Button from "../Button/Button";

function Login({ wrapHandler }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginFn = async (e, id, password) => {
    e.stopPropagation();
    e.preventDefault();

    const body = { id, password };

    if (!id) {
      return alert("ID를 입력해주세요.");
    } else if (!password) {
      return alert("Password를 입력해주세요.");
    }

    try {
      const res = await axios.post("/api/user/login", body);
      const {user, accessToken} = res.data;

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      wrapHandler(e);

      dispatch(loginUser(user));
    } catch (err) {
      const { error } = err.response.data;

      return alert(error);
    }
  };

  return (
    <LoginWrap>
      <LoginOverlay onClick={wrapHandler} />
      <LoginContent>
        <LoginForm
          onSubmit={(e) => {
            loginFn(e, id, password);
          }}
        >
          <h2 className="headline">Sign In</h2>
          <input
            className="inputText"
            placeholder="Username"
            value={id}
            onChange={idHandler}
          />
          <input
            className="inputText"
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordHandler}
          />
          <Button text="Log In" classname="mt10" />
        </LoginForm>
      </LoginContent>
    </LoginWrap>
  );
}

const LoginWrap = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;
const LoginOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--primary-color-d), transparent);
  position: fixed;
  left: 0;
  top: 0;
`;
const LoginContent = styled.div`
  width: 400px;
  height: 300px;
  max-width: 90%;
  padding: 0 20px;
  background: #ffffff;
  border-radius: var(--border-radius);
  position: relative;
  z-index: 1;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  color: #000000;

  input {
    width: 100%;
    padding: 8px 0px;
    border: none;
    border-bottom: 2px solid #ddd;
    cursor: pointer;
    transition: var(--transition);

    &:active,
    &:focus,
    &:hover {
      border-bottom: 2px solid var(--primary-color);
    }
  }

  h2 {
    align-self: flex-start;
    margin-bottom: 24px;
  }
`;

export default Login;
