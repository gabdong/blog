import { useState, useEffect } from "react";
import styled from "styled-components";

import { getBoardList } from "../../../apis/boards";

import BoardSettingItem from "./BoardSettingItem";

function BoardSettings() {
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBoardList(setBoardList, setLoading);
  }, []);

  /**
   * * 게시판 순서에 맞게 랜더링
   * @param {Object} data
   * @return {Array}
   * TODO auth 적용
   */
  const renderBoardList = (data) => {
    const renderList = [];

    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child, depth, isEditing } = boardData;

      //* depth2
      const childArr = [];
      const childTmp = (
        <div
          className="boardChildWrap"
          key={`childWrap_${boardIdx}`}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          {Object.entries(child).map((childDataArr) => {
            const [childIdx, childData] = childDataArr;
            const {
              position: childPosition,
              parent,
              // auth: childAuth,
              depth: childDepth,
              title: childTitle,
              isEditing: childIsEditing,
            } = childData;

            if (parent === Number(boardIdx)) {
              childArr[childPosition] = (
                <BoardSettingItem
                  key={childIdx}
                  title={childTitle}
                  edit={true}
                  depth={childDepth}
                  idx={childIdx}
                  boardList={boardList}
                  boardListHandler={setBoardList}
                  isEditing={childIsEditing}
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
        <BoardSettingItem
          key={boardIdx}
          title={title}
          edit={true}
          depth={depth}
          idx={boardIdx}
          child={childTmp}
          boardList={boardList}
          boardListHandler={setBoardList}
          isEditing={isEditing}
        />
      );
    }

    return renderList;
  };

  return (
    <>
      {loading ? null : (
        <BoardSettingSection className="scroll">
          <h2 className="normalText mb15">게시판 메뉴설정</h2>
          <BoardSettingWrap className="scroll">
            <BoardSettingItem
              title="메뉴 추가"
              edit={false}
              boardListHandler={setBoardList}
              boardList={boardList}
            />
            {renderBoardList(boardList)}
          </BoardSettingWrap>
        </BoardSettingSection>
      )}
    </>
  );
}

const BoardSettingSection = styled.section`
  height: 100%;
`;
const BoardSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  max-width: 860px;
  padding: 0 14px 0 0;
  border-radius: var(--border-radius);
`;

export default BoardSettings;
