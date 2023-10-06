import { useEffect, useState, useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import { FiMenu as NavIcon } from "react-icons/fi";
// import { FaSearch as SearchIcon } from "react-icons/fa"; //TODO 검색기능 작업시 필요
import { AiFillCaretDown as DownIcon } from "react-icons/ai";
import Link from "next/link";

import LinkButton from "@/components/LinkButton";
import LoginModal from "@/components/LoginModal";
import UserMenuWrap from "@/components/Header/UserMenuWrap";

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
  const user = useSelector((store) => store.user, shallowEqual);
  const [loginModalView, setloginModalView] = useState(false); // login modal control
  const [userMenuWrapView, setUserMenuWrapView] = useState(false); // login 돼있을경우 user menu control

  /**
   * * login modal handler
  const loginModalHandler = (e) => {
    e.preventDefault();

    setloginModalView((prev) => !prev);
  };

  /**
   * * user menu wrap handler
   */
  const userMenuWrapHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setUserMenuWrapView((prev) => !prev);
  };

  /**
   * * userMenuWrap 이외영역 클릭시 userMenuWrap 닫기
   * @param {Event} e
   */
  const closeUserMenuWrap = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !e.target.closest(".headerUserBtnWrap") ||
      e.target.classList.contains(".menuWrapBtn")
    ) {
      setUserMenuWrapView(false);
      window.removeEventListener("click", closeUserMenuWrap);
    }
  }, []);

  useEffect(() => {
    if (userMenuWrapView) window.addEventListener("click", closeUserMenuWrap);
    if (!userMenuWrapView)
      window.removeEventListener("click", closeUserMenuWrap);
  }, [userMenuWrapView]);

  return (
    <HeaderSt id="header">
      <HeaderInnerSt>
        {/* //* nav button */}
        <NavIconSt className="mobileOnly" onClick={navOpen} />

        {/* //* logo */}
        <Link href="/?tabItem=latestPostList">
          <LogoSt id="logo">&lt;Gabdong /&gt;</LogoSt>
        </Link>
        <p>{process.env.NEXT_PUBLIC_MOBILE_WIDTH}</p>

        {/* //* button wrap */}
        <HeaderButtonWrapSt>
          {/* //TODO 기능 완성 후 주석제거 */}
          {/* <SearchIcon className="serachIcon pcOnly"/> */}

          {!user.isLogin ? null : (
            <LinkButton
              classname="pcOnly"
              text="새 글 작성"
              href="/postEditor/new"
            />
          )}
          <HeaderButtonSt
            className={"buttonText" + user.isLogin ? "headerUserBtnWrap" : ""}
            onClick={!user.isLogin ? loginModalHandler : userMenuWrapHandler}
          >
            {!user.isLogin ? "Login" : `${user.name} 님`}
            {!user.isLogin ? null : <DownIconSt />}
          </HeaderButtonSt>
          {user.isLogin && userMenuWrapView ? <UserMenuWrap /> : null}
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

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
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

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
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

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
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

  position: relative;
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

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    font-size: 0.9rem;
  }
`;
const DownIconSt = styled(DownIcon)`
  margin-left: 4px;
  font-size: 14px;
`;
