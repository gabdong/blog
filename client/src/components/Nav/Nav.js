import styled from "styled-components";
import { useSelector } from "react-redux";

import NavBtn from "./NavBtn.js";

function Nav() {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;

  return (
    <NavSt id="nav">
      <NavBtn path="/" text="Home" />
      <NavBtn path="/board" text="Board" />
      {isLogin ? <NavBtn path="/settings" text="Settings" /> : null}
    </NavSt>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 200px;
`;

export default Nav;
