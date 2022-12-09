import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBtnSt = styled(NavLink)`
  cursor: pointer;
  transition: var(--transition);
  &.active {
    color: var(--primary-color);
  }
`;

function NavBtn({ text, path }) {
  return (
    <NavBtnSt to={path} className="subTitle">
      {text}
    </NavBtnSt>
  );
}

export default NavBtn;
