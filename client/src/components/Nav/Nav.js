import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { RiCloseFill as Close } from "react-icons/ri";

import { getBoardList } from "../../apis/boards.js";

import NavBtn from "./NavBtn.js";

function Nav() {
  const user = useSelector((store) => store.user);
  const { isLogin } = user;
  const location = useLocation();
  const { pathname } = location;

  //TODO nav 언제 안나오게할지 정하기
  // const { pathname } = location;
  // const navRendering = pathname === "/post/new" ? false : true;
  const navRendering = true;

  // const activeBoardIdx = location.state?.activeBoardIdx;
  const [activeBoardIdx, setActiveBoardIdx] = useState(null);
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * * nav close
   */
  const navClose = () => {
    const nav = document.getElementById('nav');
    const background = document.getElementById('navBackground');

    nav.classList.remove('active');
    background.classList.remove('active');
  }

  useEffect(() => {
    (async function () {
      const boardData = await getBoardList();

      setBoardList(boardData);

      if (pathname.includes('/board') || pathname.includes('/post') || location.state) {
        if (location.state && location.state.activeBoardIdx) {
          setActiveBoardIdx(location.state.activeBoardIdx);
        } else if (pathname.includes('/board')) {
          setActiveBoardIdx(pathname.replace('/board/', ''));
        } else {
          //TODO 게시글로 게시판 알아내는 요청 없이 할수있을지 생각해보기
          const postIdx = pathname.replace('/post/', '');
        }
      }

      setLoading(false);
    })();
  }, [location.state, pathname]);

  console.log('hi');
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
        <>
          {/* //TODO background 클릭시 nav닫기  */}
          <NavBackgroundSt id="navBackground" onClick={navClose}/>
          <NavSt id="nav">
            <CloseBtnSt onClick={navClose}/>
            {renderNavBoardList(boardList)}
            {isLogin ? <NavBtn path="/settings" text="Settings" /> : null}
          </NavSt>
        </>
      )}
    </>
  );
}

const NavSt = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;

  @media all and (max-width: 479px) {
    gap: 12px;

    width: 80%;
    height: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.7);
    overflow-y: auto;
    position: fixed;
    left: -80%;
    top: 0;
    z-index: 32;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 3px;
      background: var(--dark-l);
      border-radius: var(--border-radius);
    }
    &::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: var(--border-radius);
    }

    &.active {
      left: 0;
    }
  }
`;

const NavBackgroundSt = styled.div`
  @media all and (max-width: 479px) {
    &.active {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 31;
    }
  }
`;

const CloseBtnSt = styled(Close)`
  display: none;

  @media all and (max-width: 479px) {
    display: block;
    font-size: 32px;
  }
`;

export default Nav;
