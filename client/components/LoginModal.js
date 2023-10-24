import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axios, { authCheckAxios } from "../lib/utils/axios";
import { loginUser } from "@/store/modules/user";

import Input from "./Input";
import Button from "./Button";
import useInput from "@/lib/hooks/useInput";

export default function LoginModal({ modalHandler }) {
  const dispatch = useDispatch();
  const [id, idHandler] = useInput('');
  const [password, passwordHandler] = useInput('');

  /**
   * * 로그인
   * @param {Event} e
   */
  const loginFn = async (e) => {
    e.preventDefault();

    const btn = e.currentTarget;
    btn.disabled = true;

    if (!id) return alert("아이디를 입력해주세요.");
    if (!password) return alert("비밀번호를 입력해주세요.");

    const body = { id, password };

    try {
      const res = await axios.post("/apis/users/login", body);
      const { user, accessToken } = res.data;

      axios.defaults.headers.common.Authorization = accessToken; // axios accessToken 값 저장
      authCheckAxios.defaults.headers.common.Authorization = accessToken; // 권한 check axios accessToken 값 저장

      dispatch(loginUser(user));
      modalHandler(e);
    } catch (error) {
      console.error(error);
    } finally {
      btn.disabled = false;
    }
  };

  return (
    <LoginModalSt>
      <LoginModalOverlay onClick={modalHandler} />
      <LoginModalContent>
        <LoginForm>
          <h2 className="headline">Welcome</h2>
          <Input
            placeholder="Username"
            value={id}
            onChange={idHandler}
            style={{ width: "100%" }}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={passwordHandler}
            style={{ width: "100%" }}
          />
          <Button text="Login" onClick={loginFn} />
        </LoginForm>
      </LoginModalContent>
    </LoginModalSt>
  );
}

const LoginModalSt = styled.div`
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
const LoginModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  left: 0;
  top: 0;
`;
const LoginModalContent = styled.div`
  width: 400px;
  height: 280px;
  max-width: 90%;
  padding: 0 20px;
  border-radius: var(--border-radius);
  background: var(--dark-l);
  position: relative;
  z-index: 1;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  width: 100%;
  height: 100%;
  color: #ffffff;

  h2 {
    align-self: flex-start;
    margin-bottom: 24px;
  }

  button {
    align-self: flex-end;
    margin-top: 10px;
  }
`;
