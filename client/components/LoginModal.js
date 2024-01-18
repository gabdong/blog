import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import axios from "@/lib/utils/axios";
import useInput from "@/lib/hooks/useInput";

import Input from "./Input";
import Button from "./Button";

/**
 * * 로그인모달
 * @param {Object} props
 * @param {Function} props.modalHandler - 모달 display 조절
 * @returns {JSX.Element}
 */
export default function LoginModal({ modalHandler }) {
  const router = useRouter();
  const idInputRef = useRef(null);
  const [id, idHandler] = useInput("");
  const [password, passwordHandler] = useInput("");

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
      await axios.post("/apis/users/login", body);

      router.reload();
      modalHandler(e);
    } catch (error) {
      console.error(error);
    } finally {
      btn.disabled = false;
    }
  };

  useEffect(() => {
    idInputRef.current.focus();
  }, []);

  return (
    <LoginModalSt>
      <LoginModalOverlay onClick={modalHandler} />
      <LoginModalContent>
        <LoginForm>
          <h2 className="headline">Login</h2>
          <Input
            placeholder="Username"
            defaultValue={id}
            onChange={idHandler}
            style={{
              width: "100%",
              color: "var(--gray-l)",
            }}
            onKeyUp={(e) => e.key === "Enter" ?? loginFn()}
            ref={idInputRef}
            border="bottom"
          />
          <Input
            placeholder="Password"
            type="password"
            defaultValue={password}
            onChange={passwordHandler}
            style={{
              width: "100%",
              color: "var(--gray-l)",
            }}
            onKeyUp={(e) => e.key === "Enter" ?? loginFn()}
            border="bottom"
          />
          <Button
            text="Login"
            onClick={loginFn}
            style={{
              padding: "12px",
              marginTop: "10px",
              background: "var(--primary-color)",
              color: "var(--primary-text-color)",
            }}
          />
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
  position: fixed;
  left: 0;
  top: 0;
`;
const LoginModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
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
  background: var(--dark);
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
  color: var(--gray-l);

  h2 {
    align-self: flex-start;
    margin-bottom: 20px;
  }
`;
