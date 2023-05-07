import { useState } from "react";
import styled from "styled-components";
import { FiMenu as NavIcon } from "react-icons/fi";

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

  return (
    <>
      <HeaderSt id="header">
        <HeaderInnerSt>
          {/* //* nav button */}
          <NavIconSt className="mobileOnly" onClick={navOpen} />

          {/* //* Logo */}
          <LogoSt id="logo">&lt;Gabdong /&gt;</LogoSt>
        </HeaderInnerSt>
      </HeaderSt>
    </>
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
  transition: var(--transition);
  color: var(--primary-color);
  cursor: pointer;

  @media all and (max-width: 767px) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
