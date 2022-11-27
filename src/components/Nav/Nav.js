import styled from "styled-components";
import NavBtn from "./NavBtn";

const NavSt = styled.nav`
  width: 200px;
`;
function Nav() {
  return (
    <NavSt id="nav">
      <NavBtn path="/" text="home" />
    </NavSt>
  );
}

export default Nav;
