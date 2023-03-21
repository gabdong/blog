import styled from "styled-components";
import { NavLink } from "react-router-dom";

/**
 * @param {Boolean} active: 게시글 등 NavButton path와 맞지 않아도 active효과를 주기 위함
 */
function NavButton({ text, path, idx, active }) {
  return (
    <>
      <NavButtonSt className={active ? "active" : ""} to={path}>
        {text}
      </NavButtonSt>
    </>
  );
}

const NavButtonSt = styled(NavLink)`
  font-family: "SUIT-Regular";
  font-size: 14px;
  letter-spacing: 0.15px;
  cursor: pointer;
  transition: var(--transition);

  &.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  @media all and (max-width: 479px) {
    font-size: 16px;
  }
`;

export default NavButton;
