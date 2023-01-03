import { AiOutlinePlus as Plus } from "react-icons/ai";
import styled from "styled-components";

function BoardSettings() {
  return (
    <BoardSettingSection className="scroll">
      <h2 className="normalText mb15">게시판 메뉴설정</h2>
      <BoardSettingWrap className="scroll">
        <BoardSettingItem className="boardSettingItem">
          <p className="normalText">Board</p>
          <Plus className="addBoardCategoryBtn" />
        </BoardSettingItem>
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
const BoardSettingItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border-radius: var(--border-radius);
  background: var(--primary-color-d-o);
  transition: var(--transition);

  &:hover {
    background: var(--primary-color-d);
  }

  .addBoardCategoryBtn {
    cursor: pointer;
  }
`;

export default BoardSettings;
