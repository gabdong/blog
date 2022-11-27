import styled from "styled-components";
import NavBtn from "./NavBtn";

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
`;
function Nav() {
  return (
    <NavSt id="nav">
      <NavBtn path="/" text="home" />
      <NavBtn path="/board" text="Board" />
    </NavSt>
  );
}

export default Nav;
