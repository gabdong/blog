import { FiMenu as NavIcon } from "react-icons/fi";
import { AiFillCaretDown as DownIcon } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import LoginModal from "../LoginModal/LoginModal";
import LinkButton from "../LinkButton/LinkButton";
import UserMenuWrap from "./UserMenuWrap";

function Header() {
  const user = useSelector((store) => store.user);
  const [loginModalView, setloginModalView] = useState(false);
  const [userMenuWrapView, setUserMenuWrapView] = useState(false);

  /**
   * * login modal control
   * @param {Event} e
   */
  const loginWrapHandler = (e) => {
    e.preventDefault();

    setloginModalView(!loginModalView);
  };

  /**
   * * user menu wrap control
   * @param {Event} e
   */
  const userMenuWrapHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setUserMenuWrapView(!userMenuWrapView);
  };

  /**
   * * nav open
   */
  const navOpen = () => {
    const nav = document.getElementById("nav");
    const background = document.getElementById("navBackground");

    nav.classList.add("active");
    background.classList.add("active");
  };

  useEffect(() => {
    /**
     * * userMenuWrap 이외영역 클릭시 userMenuWrap 닫기
     * @param {Event} e
     */
    const _closeUserMenuWrap = (e) => {
      e.preventDefault();

      if (
        !e.target.closest("#userMenuWrap") ||
        e.target.classList.contains(".menuWrapBtn") ||
        e.target.closest(".menuWrapBtn")
      ) {
        setUserMenuWrapView(false);
        window.removeEventListener("click", _closeUserMenuWrap);
      }
    };

    if (userMenuWrapView) window.addEventListener("click", _closeUserMenuWrap);
  }, [userMenuWrapView]);

  return (
    <HeaderSt id="header">
      <HeaderInnerSt>
        {/* //* nav button */}
        <NavIconSt className="mobileOnly" onClick={navOpen} />

        {/* //* Logo */}
        <Link to="/">
          <LogoSt id="logo">GABDONG</LogoSt>
        </Link>

        <HeaderBtnWrapSt>
          {/* //* Search Btn */}
          {/* //TODO 기능완성 후 살리기 */}
          {/* <HeaderBtnSt className="buttonText">
            <Search className="pcOnly"/>
          </HeaderBtnSt> */}
          {!user.isLogin ? null : (
            <LinkButton classname="pcOnly" text="새 글 작성" path="/post/new" />
          )}
          {/* //* login Btn */}
          <HeaderBtnSt
            className="buttonText"
            onClick={!user.isLogin ? loginWrapHandler : userMenuWrapHandler}
          >
            {!user.isLogin ? "Login" : `${user.name} 님`}
            {!user.isLogin ? null : <DownIconSt />}
          </HeaderBtnSt>
          {user.isLogin && userMenuWrapView ? <UserMenuWrap /> : null}
        </HeaderBtnWrapSt>
      </HeaderInnerSt>

      {/* //* mobile search wrap */}
      {/* //TODO 기능완성 후 살리기 */}
      {/* <MobileSearchWrapSt className="mobileOnly">
        <Input placeholder="전체 게시글 검색"/>
        <Search />
      </MobileSearchWrapSt> */}

      {/* //* login modal */}
      {loginModalView ? (
        <LoginModal wrapHandler={loginWrapHandler}></LoginModal>
      ) : null}
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
  z-index: 1;

  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;

const HeaderInnerSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: var(--header-height);
  position: relative;

  @media all and (max-width: 479px) {
    height: var(--mo-header-height);
    min-height: var(--mo-header-height);
  }
`;

const HeaderBtnWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  position: relative;

  @media all and (max-width: 479px) {
    gap: 8px;
  }
`;

const HeaderBtnSt = styled.button`
  font-size: 1rem;
  color: var(--gray-l);
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }

  @media all and (max-width: 479px) {
    font-size: 0.9rem;
  }
`;

const LogoSt = styled.h1`
  font-family: "SUIT-ExtraBold";
  font-size: 21px;
  letter-spacing: 0.15px;
  transition: var(--transition);
  color: var(--primary-color);
  cursor: pointer;

  @media all and (max-width: 479px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const NavIconSt = styled(NavIcon)`
  font-size: 20px;
`;

const DownIconSt = styled(DownIcon)`
  margin-left: 4px;
  font-size: 14px;
`;

const MobileSearchWrapSt = styled.div`
  @media all and (max-width: 479px) {
    display: flex;
    gap: 10px;
    align-items: center;

    & > input {
      flex: 1;
    }
  }
`;

export default Header;
