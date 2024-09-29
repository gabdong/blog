import { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMenu as NavIcon } from "react-icons/fi";
// import { FaSearch as SearchIcon } from "react-icons/fa"; //TODO 검색기능 작업시 필요
import { AiFillCaretDown as DownIcon } from "react-icons/ai";
import Link from "next/link";

import LinkButton from "@/components/LinkButton";
import LoginModal from "@/components/LoginModal";
import UserMenuWrap from "@/components/Header/UserMenuWrap";
import Modal from "@/components/Modal";

/**
 * * nav open
 */
const navOpen = () => {
  const nav = document.getElementById("nav");
  const background = document.getElementById("navBackground");

  nav.classList.add("active");
  background.classList.add("active");
};

export default function Header(props) {
  const {
    pageProps: { user },
    isNoNav,
  } = props;
  const [loginModalView, setloginModalView] = useState(false);
  const [userMenuWrapView, setUserMenuWrapView] = useState(false);

  /**
   * * login modal handler
   */
  const loginModalHandler = (e) => {
    setloginModalView((prev) => !prev);
  };

  /**
   * * user menu wrap handler
   */
  const userMenuWrapHandler = (e) => {
    setUserMenuWrapView((prev) => !prev);
  };

  /**
   * * userMenuWrap 이외영역 클릭시 userMenuWrap 닫기
   * @param {Event} e
   */
  const closeUserMenuWrap = (e) => {
    if (
      !e.target.closest(".headerUserBtnWrap") ||
      e.target.classList.contains(".menuWrapBtn") ||
      e.target.closest(".menuWrapBtn")
    ) {
      setUserMenuWrapView(false);
    }
  };

  useEffect(() => {
    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {
      const { scrollY } = window;

      if (scrollY > 0) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    });
  }, []);

  return (
    <HeaderSt id="header">
      <HeaderInnerSt id="headerInner">
        {/* //* nav button */}
        {!isNoNav && <NavIconSt className="mobileOnly" onClick={navOpen} />}

        {/* //* logo */}
        <Link href="/?tabItem=latestPostList">
          <LogoSt id="logo" />
        </Link>

        {/* //* button wrap */}
        <HeaderButtonWrapSt>
          {/* //TODO 기능 완성 후 주석제거 */}
          {/* <SearchIcon className="serachIcon pcOnly"/> */}

          {user?.isLogin && (
            <LinkButton
              classname="pcOnly"
              text="새 글 작성"
              href="/postEditor/new"
            />
          )}
          <LoginButtonSt
            className={"buttonText" + user?.isLogin && " headerUserBtnWrap"}
            onClick={!user?.isLogin ? loginModalHandler : userMenuWrapHandler}
          >
            {!user?.isLogin ? "Login" : `${user?.name} 님`}
            {user?.isLogin && <DownIconSt />}
          </LoginButtonSt>
          {user?.isLogin && userMenuWrapView && (
            <UserMenuWrap closeUserMenuWrapFn={closeUserMenuWrap} />
          )}
        </HeaderButtonWrapSt>
      </HeaderInnerSt>

      {/* //* login modal */}
      {
        <Modal
          modalView={loginModalView}
          component={<LoginModal modalHandler={loginModalHandler} />}
        />
      }
    </HeaderSt>
  );
}

//* 헤더 영역
const HeaderSt = styled.header`
  width: 100%;
  height: 60px;

  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  transition: var(--transition);

  &.active {
    backdrop-filter: blur(5px);
  }

  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    height: 56px;
  }
`;
//* 헤더 내부
const HeaderInnerSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  position: relative;
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

  &:after {
    content: "<Gabdong/>";
  }
  @media all and (max-width: ${process.env.NEXT_PUBLIC_MOBILE_WIDTH}) {
    font-size: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    &:after {
      content: "<G/>";
    }
  }
`;
const HeaderButtonWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  position: relative;
`;
const LoginButtonSt = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2rem;
  padding: 0 1rem;
  /* padding: 8px 12px; */
  background: var(--gray);
  color: #ffffff;
  font-size: 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
  }
`;
const DownIconSt = styled(DownIcon)`
  margin-left: 4px;
  font-size: 14px;
`;
