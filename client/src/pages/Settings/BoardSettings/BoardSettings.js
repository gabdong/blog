import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import BoardSettingItem from "./BoardSettingItem";

function BoardSettings() {
  const [boardList, setBoardList] = useState({});
  const [loading, setLoading] = useState(true);

  /**
   * TODO apis 로 옮기기
   * * 게시판 메뉴리스트 요청함수
   */
  const getBoardList = async () => {
    try {
      const json = await axios.get("/apis/boards");
      const boardData = json.data;

      setBoardList(boardData);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  /**
   * * 게시판 순서에 맞게 랜더링 해주는 함수
   * @param {Object} data
   * @return {String}
   * TODO auth 적용
   */
  const renderBoardList = (data) => {
    const renderList = [];

    /**
     * * depth1,2의 position은 별도이지만 출력배열은 하나이기때문에
     * * index 계산을 하기위한 변수
     */
    let childTotalCnt = 0;
    let childWrapKey = 0;
    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child, depth, isEditing } = boardData;
      const newPosition = position + childTotalCnt;

      //* depth2
      const childArr = [];
      const childTmp = (
        <div className="boardChildWrap" key={`childWrap_${childWrapKey}`} style={{display: "flex", flexDirection: "column", gap: "5px"}}>
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
      renderList[newPosition] = (
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

      childWrapKey++;
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
