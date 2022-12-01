import styled from "styled-components";
import NavBtn from "./NavBtn.js";

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 200px;
`;
function Nav() {
  return (
    <NavSt id="nav">
      <NavBtn path="/" text="Home" />
      <NavBtn path="/board" text="Board" />
    </NavSt>
  );
}

export default Nav;
