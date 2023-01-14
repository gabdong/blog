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
   *
   * @param {Object} data
   *
   * @return {String}
   *
   * TODO auth 적용
   */
  const renderBoardList = (data) => {
    const renderList = [];

    /**
     * * depth1,2의 position은 별도이지만 출력배열은 하나이기때문에
     * * index 계산을 하기위한 변수
     */
    let childTotalCnt = 0;

    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child, depth } = boardData;
      const childCnt = Object.keys(child).length;
      const newPosition = position + childTotalCnt;

      //* depth1
      renderList[newPosition] = (
        <BoardSettingItem
          key={boardIdx}
          title={title}
          edit={true}
          depth={depth}
          idx={boardIdx}
          boardList={boardList}
          boardListHandler={setBoardList}
        />
      );

      //* depth2
      if (childCnt > 0) {
        for (const [childIdx, childData] of Object.entries(child)) {
          const {
            position: childPosition,
            parent,
            // auth: childAuth,
            depth: childDepth,
            title: childTitle,
          } = childData;

          if (parent === Number(boardIdx)) {
            // parent menu가 있기때문에 +1 해줌
            const newChildPosition =
              position + childPosition + childTotalCnt + 1;

            renderList[newChildPosition] = (
              <BoardSettingItem
                key={childIdx}
                title={childTitle}
                edit={true}
                depth={childDepth}
                idx={childIdx}
                boardList={boardList}
                boardListHandler={setBoardList}
              />
            );
          }
        }

        childTotalCnt += childCnt;
      }
    }

    return renderList;
  };

  return (
    <div className="h100">
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
    </div>
  );
}

const BoardSettingSection = styled.section`
  height: 100%;
`;
const BoardSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: 860px;
  padding: 0 14px 0 0;
  border-radius: var(--border-radius);
`;

export default BoardSettings;
