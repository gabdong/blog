import styled from "styled-components";
import { useSelector } from "react-redux";

import { getBoardList } from "../../apis/boards.js";

import NavBtn from "./NavBtn.js";
import { useEffect, useState } from "react";

function Nav() {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBoardList(setBoardList, setLoading);
  }, []);

  const renderBoardList = () => {};

  return (
    <>
      {loading ? null : (
        <NavSt id="nav">
          <NavBtn path="/" text="Home" />
          <NavBtn path="/board" text="Board" />
          {isLogin ? <NavBtn path="/settings" text="Settings" /> : null}
        </NavSt>
      )}
    </>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 200px;
`;

export default Nav;
