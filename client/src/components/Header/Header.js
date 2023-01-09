import { FaSearch as Search } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Login from "../Login/Login";
import { logoutUser } from "../../modules/user";
import { removeToken } from "../../apis/tokens";
import axios from "../../utils/axios";

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loginView, setloginView] = useState(false);

  /**
   * * login modal control
   *
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

  //! test
  const test = () => {
    window.localStorage.clear();
    const body = { test: "test", checkAuth: true };
    axios.post("/apis/users/test", body).then((res) => {
      console.log(res);
    });
  };

  return (
    <HeaderSt id="header">
      {/* //* Logo */}
      <Link to="/">
        <Logo id="logo">Gabdong</Logo>
      </Link>
      <HeaderBtnWrap>
        {/* //* Search Btn */}
        <HeaderBtn className="buttonText">
          <Search />
        </HeaderBtn>
        {/* //* login Btn */}
        <HeaderBtn
          className="buttonText"
          onClick={!user.isLogin ? loginWrapHandler : logoutFn}
        >
          {!user.isLogin ? "로그인" : "로그아웃"}
        </HeaderBtn>
        <HeaderBtn className="buttonText" onClick={test}>
          테스트
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
  min-height: 60px;
  background: #000000;
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

export default Header;
