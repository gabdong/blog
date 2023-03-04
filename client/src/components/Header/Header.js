import { FaSearch as Search } from "react-icons/fa";
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

  return (
    <HeaderSt id="header">
      {/* //* Logo */}
      <Link to="/">
        <Logo id="logo">GABDONG</Logo>
      </Link>
      <HeaderBtnWrap>
        {/* //* Search Btn */}
        <HeaderBtn className="buttonText">
          <Search />
        </HeaderBtn>
        {!user.isLogin ? null : <LinkButton text="New Post" path="/post/new" />}
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
  font-family: "SUIT-ExtraBold";
  font-size: 21px;
  letter-spacing: 0.15px;
  transition: var(--transition);
  color: var(--primary-color);
  cursor: pointer;
`;

export default Header;
