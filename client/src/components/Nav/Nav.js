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

  /**
   * * Nav 게시판 리스트 렌더링
   * @param {Object} data
   * @returns {Array}
   */
  const renderNavBoardList = (data) => {
    const renderList = [];

    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child } = boardData;

      //* depth2
      const childArr = [];
      const childTmp = (
        <div
          className="navBoardChildWrap"
          key={`childWrap_${boardIdx}`}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          {Object.entries(child).map((childDataArr) => {
            const [childIdx, childData] = childDataArr;
            const {
              position: childPosition,
              parent,
              // auth: childAuth,
              title: childTitle,
            } = childData;

            if (parent === Number(boardIdx)) {
              childArr[childPosition] = (
                <NavBtn
                  key={childIdx}
                  text={childTitle}
                  path={`/board/${childIdx}`}
                  depth={2}
                />
              );
            }
            return true;
          })}

          {childArr}
        </div>
      );

      //* depth1
      renderList[position] = (
        <NavBtn
          key={boardIdx}
          text={title}
          path={`/board/${boardIdx}`}
          child={childTmp}
        />
      );
    }

    return renderList;
  };

  return (
    <>
      {loading ? null : (
        <NavSt id="nav">
          <NavBtn path="/" text="Home" />
          {renderNavBoardList(boardList)}
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
