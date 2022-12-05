import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBtnSt = styled(NavLink)`
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  &.active {
    font-family: "SUIT-Bold";
    color: var(--primary-color);
  }
`;

function NavBtn({ text, path }) {
  return (
    <NavBtnSt to={path}>
      {text}
    </NavBtnSt>
  );
}

export default NavBtn;
