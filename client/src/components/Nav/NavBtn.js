import { NavLink } from "react-router-dom";
import styled from "styled-components";

function NavBtn({ text, path, depth, child }) {
  return (
    <>
      <NavBtnSt to={path} depth={depth}>
        {text}
      </NavBtnSt>
      {child}
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
  }

  ${(props) => {
    if (props.depth === 2) {
      return `padding-left: 10px`;
    }
  }}
`;

export default NavBtn;
