import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { logInUser } from "../../redux/logInUser/action";
import { logInUser } from "../../redux/user";
import Button from "../Button/Button";

function LogIn({ handler }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const logInReq = (e, id, pw) => {
    e.preventDefault();

    console.log(id);
    console.log(pw);

    const body = { id, password };

    dispatch(logInUser(body));
  };

  return (
    <LogInWrap>
      <LogInOverlay onClick={handler} />
      <LogInContent>
        <LogInForm
          onSubmit={(e) => {
            logInReq(e, id, password);
          }}
        >
          <LogInTitle className="headline">Sign In</LogInTitle>
          <LogInInput
            className="normalText"
            placeholder="Username"
            onChange={(e) => setId(e.target.value)}
          />
          <LogInInput
            className="normalText"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button text="Log In" classname="mt10" />
        </LogInForm>
      </LogInContent>
    </LogInWrap>
  );
}

const LogInWrap = styled.article`
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
const LogInOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--primary-color-d), transparent);
  position: fixed;
  left: 0;
  top: 0;
`;
const LogInContent = styled.div`
  width: 400px;
  height: 300px;
  max-width: 90%;
  padding: 0 20px;
  background: #ffffff;
  border-radius: var(--border-radius);
  position: relative;
  z-index: 1;
`;
const LogInForm = styled.form`
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
const LogInInput = styled.input`
  all: unset;
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
const LogInTitle = styled.h2`
  align-self: flex-start;
  margin-bottom: 24px;
`;

export default LogIn;
