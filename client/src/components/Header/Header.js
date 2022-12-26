import { FaSearch as Search } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Login from "../Login/Login";
import { logoutUser } from "../../modules/user";
import { removeAuth } from "../../apis/auth";
import authAxios from '../../utils/axios';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loginView, setloginView] = useState(false);

  const loginWrapHandler = (e) => {
    e.preventDefault();

    setloginView(!loginView);
  };

  const logoutFn = () => {
    removeAuth();
    dispatch(logoutUser());
  };

  //! test
  const test = () => {
    const body = {test: 'test'};
    authAxios.post('/apis/user/test', body).then((res) => {
      // console.log('return');
    });
  }

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
        <HeaderBtn
          className="buttonText"
          onClick={!user.isLogin ? loginWrapHandler : logoutFn}
        >
          {!user.isLogin ? "로그인" : "로그아웃"}
        </HeaderBtn>
        <HeaderBtn
          className="buttonText"
          onClick={test}
        >
          테스트
        </HeaderBtn>
      </HeaderBtnWrap>
      {/* //g loginWrap */}
      {loginView ? <Login wrapHandler={loginWrapHandler}></Login> : null}
    </HeaderSt>
  );
}

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

export default Header;
