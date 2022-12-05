import { FaSearch as Search } from "react-icons/fa";
import { useState } from "react";
import styled from "styled-components";
import LogIn from "../LogIn/LogIn";

const HeaderSt = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  position: sticky;
  left: 0;
  top: 0;
`;
const HeaderBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const HeaderBtn = styled.button`
  font-family: "SUIT-Medium";
  font-size: 1rem;
`;
const Logo = styled.h1`
  font-family: "SUIT-Bold";
  font-size: 1.3125rem;
  color: var(--primary-color);
`;

function Header() {
  const [logInView, setLogInView] = useState(false);
  const logInWrapHandler = (e) => {
    e.preventDefault();

    setLogInView(!logInView);
  };

  return (
    <HeaderSt id="header">
      {/* //g Logo */}
      <Logo>Gabdong</Logo>
      <HeaderBtnWrap>
        {/* //g Search Btn */}
        <HeaderBtn>
          <Search />
        </HeaderBtn>
        {/* //g LogIn Btn */}
        <HeaderBtn onClick={logInWrapHandler}>로그인</HeaderBtn>
      </HeaderBtnWrap>
      {/* //g logInWrap */}
      {logInView ? <LogIn handler={logInWrapHandler}></LogIn> : null}
    </HeaderSt>
  );
}

export default Header;
