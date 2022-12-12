import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../modules/user";
import Button from "../Button/Button";

function Login({ handler }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const loginReq = (e, id, password) => {
    e.preventDefault();

    const body = { id, password };

    dispatch(loginUser(body));
  };

  return (
    <LoginWrap>
      <LoginOverlay onClick={handler} />
      <LoginContent>
        <LoginForm
          onSubmit={(e) => {
            loginReq(e, id, password);
          }}
        >
          <LoginTitle className="headline">Sign In</LoginTitle>
          <LoginInput
            className="inputText"
            placeholder="Username"
            onChange={(e) => setId(e.target.value)}
          />
          <LoginInput
            className="inputText"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
`;
//TODO input component 분리
const LoginInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    border: 2px solid var(--primary-color);
  }
`;
const LoginTitle = styled.h2`
  align-self: flex-start;
  margin-bottom: 24px;
`;

export default Login;
