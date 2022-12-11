import { FaSearch as Search } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Login from "../Login/Login";

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
  font-size: 1rem;
`;
const Logo = styled.h1`
  font-family: "SUIT-Bold";
  font-size: 21px;
  letter-spacing: 0.15px;
  transition: var(--transition);
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;

function Header() {
  const [loginView, setloginView] = useState(false);
  const loginWrapHandler = (e) => {
    e.preventDefault();

    setloginView(!loginView);
  };

  return (
    <HeaderSt id="header">
      {/* //g Logo */}
      <Link to="/">
        <Logo id="logo">Gabdong</Logo>
      </Link>
      <HeaderBtnWrap>
        {/* //g Search Btn */}
        <HeaderBtn className="buttonText">
          <Search />
        </HeaderBtn>
        {/* //g login Btn */}
        <HeaderBtn className="buttonText" onClick={loginWrapHandler}>
          로그인
        </HeaderBtn>
      </HeaderBtnWrap>
      {/* //g loginWrap */}
      {loginView ? <Login handler={loginWrapHandler}></Login> : null}
    </HeaderSt>
  );
}

export default Header;
