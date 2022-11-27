import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.button`
  font-size: 18px;
`;
function NavBtn({ text, path }) {
  return (
    <NavLink to={path}>
      <Btn>{text}</Btn>
    </NavLink>
  );
}

export default NavBtn;
