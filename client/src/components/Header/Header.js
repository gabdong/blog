import { FaSearch as Search } from "react-icons/fa";
import { FiMenu as Menu } from "react-icons/fi"
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { removeToken } from "../../apis/tokens";
import { logoutUser } from "../../modules/user";

import Login from "../Login/Login";
import LinkButton from "../LinkButton/LinkButton";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loginView, setloginView] = useState(false);

  /**
   * * login modal control
   * @param {Event} e
   */
  const loginWrapHandler = (e) => {
    e.preventDefault();

    setloginView(!loginView);
  };

  /**
   * * logout
   */
  const logoutFn = () => {
    removeToken();
    dispatch(logoutUser());
  };

  /**
   * * nav open
   */
  const navOpen = () => {
    const nav = document.getElementById('nav');
    const background = document.getElementById('navBackground');

    nav.classList.add('active');
    background.classList.add('active');
  }

  return (
    <HeaderSt id="header">
      <MenuSt onClick={navOpen}/>
      {/* //* Logo */}
      <Link to="/">
        <Logo id="logo">GABDONG</Logo>
      </Link>
      <HeaderBtnWrap>
        {/* //* Search Btn */}
        <HeaderBtn className="buttonText">
          <Search />
        </HeaderBtn>
        {!user.isLogin ? null : <LinkButton text="새 글 작성" path="/post/new" />}
        {/* //* login Btn */}
        <HeaderBtn
          className="buttonText"
          onClick={!user.isLogin ? loginWrapHandler : logoutFn}
        >
          {!user.isLogin ? "Login" : "Logout"}
        </HeaderBtn>
      </HeaderBtnWrap>
      {/* //* loginWrap */}
      {loginView ? <Login wrapHandler={loginWrapHandler}></Login> : null}
    </HeaderSt>
  );
}

const HeaderSt = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: var(--header-height);
  background: var(--dark);
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;

  @media all and (max-width: 479px) {
    height: var(--mo-header-height);
  }
`;

const HeaderBtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media all and (max-width: 479px) {
    gap: 8px;
  }
`;

const HeaderBtn = styled.button`
  font-size: 1rem;

  @media all and (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const Logo = styled.h1`
  font-family: "SUIT-ExtraBold";
  font-size: 21px;
  letter-spacing: 0.15px;
  transition: var(--transition);
  color: var(--primary-color);
  cursor: pointer;

  @media all and (max-width: 479px) {
    font-size: 26px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const MenuSt = styled(Menu)`
  display: none;

  @media all and (max-width: 479px) {
    display: block;
    font-size: 20px;
  }
`;

export default Header;
