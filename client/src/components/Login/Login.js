import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../modules/user";
import Button from "../Button/Button";
import axios from "../../utils/axios";
import { authCheckAxios } from "../../utils/axios";

function Login({ wrapHandler }) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  //* id, password handler
  const idHandler = (e) => {
    setId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  /**
   * * login
   * 
   * @param {Event} e 
   * @param {String} id 
   * @param {String} password 
   */
  const loginFn = async (e, id, password) => {
    e.preventDefault();

    const body = { id, password };

    if (!id) {
      return alert("아이디를 입력해주세요.");
    } else if (!password) {
      return alert("비밀번호를 입력해주세요.");
    }

    try {
      const res = await axios.post("/apis/users/login", body);
      const { user, accessToken } = res.data;

      axios.defaults.headers.common.Authorization = accessToken;
      authCheckAxios.defaults.headers.common.Authorization = accessToken;

      wrapHandler(e);

      dispatch(loginUser(user));
    } catch (err) {
      const { msg } = err.response.data;

      console.error(msg);
      return;
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
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  top: 0;
`;
const LoginContent = styled.div`
  width: 400px;
  height: 300px;
  max-width: 90%;
  padding: 0 20px;
  background: var(--dark-l);
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
  color: #ffffff;

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
