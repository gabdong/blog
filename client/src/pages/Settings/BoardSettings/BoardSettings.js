import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardSettingItem from "./BoardSettingItem";

function BoardSettings() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * * 게시판 메뉴리스트 요청함수
   */
  const getBoardList = async () => {
    try {
      const json = await axios.get("/apis/board");
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
   * 게시판 순서에 맞게 랜더링 해주는 함수
   *
   * @param {Object} data
   *
   * @return {String}
   *
   * TODO auth 적용
   */
  const renderBoardList = (data) => {
    const renderList = [];

    for (const [boardIdx, boardData] of Object.entries(data)) {
      // const { position, auth, title, child } = boardData;
      const { position, title, child, depth } = boardData;
      const childCnt = Object.keys(child).length;

      const sumCnt = renderList.length;
      const newPosition = position + sumCnt;

      //g depth2
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
            const newChildPosition = childPosition + sumCnt + 1;

            renderList[newChildPosition] = (
              <BoardSettingItem
                key={childIdx}
                text={childTitle}
                edit={true}
                depth={childDepth}
              />
            );
          }
        }
      }

      //g depth1
      renderList[newPosition] = (
        <BoardSettingItem
          key={boardIdx}
          text={title}
          edit={true}
          depth={depth}
        />
      );
    }

    return renderList;
  };

  console.log(boardList);
  return (
    <div className="h100">
      {loading ? null : (
        <BoardSettingSection className="scroll">
          <h2 className="normalText mb15">게시판 메뉴설정</h2>
          <BoardSettingWrap className="scroll">
            <BoardSettingItem text="메뉴 추가" edit={false} />
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
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  max-width: 860px;
  height: 300px;
  padding: 0 14px 0 0;
  border-radius: var(--border-radius);
`;

export default BoardSettings;
