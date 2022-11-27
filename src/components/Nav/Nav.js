import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavSt = styled.nav`
  width: 200px;
`;
function Nav() {
  return (
    <NavSt id="nav">
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
    </NavSt>
  );
}

export default Nav;
