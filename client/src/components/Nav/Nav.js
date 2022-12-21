import styled from "styled-components";
import NavBtn from "./NavBtn.js";

function Nav() {
  return (
    <NavSt id="nav">
      <NavBtn path="/" text="Home" />
      <NavBtn path="/board" text="Board" />
    </NavSt>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 200px;
`;

export default Nav;
