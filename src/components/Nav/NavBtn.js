import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBtnSt = styled(NavLink)`
  font-family: "SUIT-Bold";
  font-size: 0.875rem;
  cursor: pointer;
  transition: var(--transition);
  &.active {
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
