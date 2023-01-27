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
   * 
   * @param {Object} data 
   * @returns 
   */
  const renderNavBoardList = (data) => {
    const renderList = [];

    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child, depth } = boardData;

      //* depth2
      const childArr = [];
      const childTmp = (
        <div className="navBoardChildWrap" key={`childWrap_${boardIdx}`} style={{display: "flex", flexDirection: "column", gap: "5px"}}>
          {Object.entries(child).map((childDataArr) => {
            const [childIdx, childData] = childDataArr;
            const {
              position: childPosition,
              parent,
              // auth: childAuth,
              depth: childDepth,
              title: childTitle,
            } = childData;

            if (parent === Number(boardIdx)) {
              childArr[childPosition] = (
                <NavBtn
                  key={childIdx}
                  text={childTitle}
                  depth={childDepth}
                  idx={childIdx}
                  parent={parent}
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
          depth={depth}
          idx={boardIdx}
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
          <NavBtn path="/board" text="Board" />
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
