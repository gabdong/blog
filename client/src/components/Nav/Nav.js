import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getBoardList } from "../../apis/boards.js";

import NavBtn from "./NavBtn.js";

function Nav() {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;
  const location = useLocation();
  const { pathname } = location;
  //TODO nav 언제 안나오게할지 정하기
  const navRendering = pathname === "/post/write" ? false : true;

  const activeBoardIdx = location.state?.activeBoardIdx;
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function() {
      const boardData = await getBoardList();

      setBoardList(boardData);
      setLoading(false);
    })();
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
      const { position, title, child, depth } = boardData;

      //* depth2
      const childArr = [];
      const childTmp =
        Object.keys(child).length > 0 ? (
          <div
            className="navBoardChildWrap"
            key={`childWrap_${boardIdx}`}
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            {Object.entries(child).map((childDataArr) => {
              const [childIdx, childData] = childDataArr;
              const {
                position: childPosition,
                parent,
                // auth: childAuth,
                title: childTitle,
                depth: childDepth,
              } = childData;

              //* 게시판 순서를 맞추기위해 배열로 출력
              if (parent === Number(boardIdx)) {
                childArr[childPosition] = (
                  <NavBtn
                    key={childIdx}
                    text={childTitle}
                    path={`/board/${childIdx}`}
                    depth={childDepth}
                    state={{
                      title: childTitle,
                      parent: boardIdx,
                    }}
                    idx={childIdx}
                    active={activeBoardIdx === childIdx ? true : false}
                  />
                );
              }
              return true;
            })}

            {childArr}
          </div>
        ) : null;

      //* depth1
      renderList[position] = (
        <NavBtn
          key={boardIdx}
          text={title}
          path={`/board/${boardIdx}`}
          child={childTmp}
          depth={depth}
          state={{
            title,
          }}
          idx={boardIdx}
          active={activeBoardIdx === boardIdx ? true : false}
        />
      );
    }

    return renderList;
  };

  return (
    <>
      {loading || !navRendering ? null : (
        <NavSt id="nav">
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
  gap: 8px;
  width: 200px;
`;

export default Nav;
