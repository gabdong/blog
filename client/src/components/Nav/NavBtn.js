import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavBtn({ text, path, idx, active }) {
  return (
    <>
      <NavBtnSt className={active ? 'active' : ''} to={path}>
        {text}
      </NavBtnSt>
    </>
  );
}

const NavBtnSt = styled(NavLink)`
  font-family: 'SUIT-Regular';
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

export default NavBtn;
