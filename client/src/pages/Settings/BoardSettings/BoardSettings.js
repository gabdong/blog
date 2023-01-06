import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import BoardSettingItem from "./BoardSettingItem";

function BoardSettings() {
  const [boardList, setBoardList] = useState([]);

  /**
   * * 게시판 메뉴리스트 요청함수
   */
  const getBoardList = async () => {
    try {
      const json = await axios.get("/apis/board");
      const boardData = json.data;

      setBoardList(boardData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <BoardSettingSection className="scroll">
      <h2 className="normalText mb15">게시판 메뉴설정</h2>
      <BoardSettingWrap className="scroll">
        <BoardSettingItem />
      </BoardSettingWrap>
    </BoardSettingSection>
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
