import { useState } from "react";
import styled from "styled-components";
import { FiMenu as NavIcon } from "react-icons/fi";
import { FaSearch as SearchIcon } from "react-icons/fa";
import Link from "next/link";

import LinkButton from "./LinkButton";
import LoginModal from "./LoginModal";

/**
 * * nav open
 */
const navOpen = () => {
  const nav = document.getElementById("nav");
  const background = document.getElementById("navBackground");

  nav.classList.add("active");
  background.classList.add("active");
};

export default function Header() {
  const [loginModalView, setloginModalView] = useState(false); // login modal control
  const [userMenuWrapView, setUserMenuWrapView] = useState(false); // login 돼있을경우 user menu control

  /**
   * * login modal handler
   */
  const loginModalHandler = () => {
    setloginModalView((prev) => !prev);
  };

  return (
    <HeaderSt id="header">
      <HeaderInnerSt>
        {/* //* nav button */}
        <NavIconSt className="mobileOnly" onClick={navOpen} />

        {/* //* logo */}
        <Link href="/?tabItem=latestPostList">
          <LogoSt id="logo">&lt;Gabdong /&gt;</LogoSt>
        </Link>

        {/* //* button wrap */}
        <HeaderButtonWrapSt>
          {/* //TODO 기능 완성 후 주석제거 */}
          {/* <SearchIcon className="serachIcon pcOnly"/> */}
          {/* //TODO 새글 작성버튼 로그인 작업 후 진행 */}
          {/* <LinkButton
            classname="pcOnly"
            text="새 글 작성"
            href="/postEditor/new"
          /> */}
          <HeaderButtonSt className="buttonText" onClick={loginModalHandler}>
            Login
          </HeaderButtonSt>
        </HeaderButtonWrapSt>
      </HeaderInnerSt>

      {/* //* login modal */}
      {loginModalView ? <LoginModal modalHandler={loginModalHandler} /> : null}
    </HeaderSt>
  );
}

const HeaderSt = styled.header`
  display: flex;

  width: 100%;
  background: var(--dark);
  position: sticky;
  left: 0;
  top: 0;
  z-index: 21;

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`;
const HeaderInnerSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;
  position: relative;

  @media all and (max-width: 767px) {
    height: 56px;
    min-height: 56px;
  }
`;
const NavIconSt = styled(NavIcon)`
  font-size: 20px;

  color: var(--gray-l);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }
`;
const LogoSt = styled.h1`
  font-family: "Ubuntu-Regular";
  font-size: 21px;
  letter-spacing: 0.15px;
  color: var(--primary-color);
  cursor: pointer;

  @media all and (max-width: 767px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const HeaderButtonWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const HeaderButtonSt = styled.button`
  display: flex;
  align-items: center;

  font-size: 1rem;
  color: var(--gray-l);
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }

  @media all and (max-width: 767px) {
    font-size: 0.9rem;
  }
`;
