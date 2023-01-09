import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiOutlineMinus as Minus } from "react-icons/ai";
import styled from "styled-components";

//TODO auth설정 추가
function BoardSettingItem({ text, edit, depth }) {
  return (
    <BoardSettingItemSt
      className={`boardSettingItem ${depth !== 1 && edit ? "child" : ""}`}
    >
      <p className="normalText">{text}</p>
      <SettingBtnWrapSt>
        <Plus className="addBoardCategoryBtn" />
        {edit ? <Minus className="addBoardCategoryBtn" /> : null}
      </SettingBtnWrapSt>
    </BoardSettingItemSt>
  );
}

const BoardSettingItemSt = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 14px;
  border-radius: var(--border-radius);
  background: var(--primary-color-d-o);
  transition: var(--transition);

  &:hover {
    background: var(--primary-color-d);
  }

  &.child {
    margin-left: 20px;
  }

  .addBoardCategoryBtn {
    cursor: pointer;
  }
`;

const SettingBtnWrapSt = styled.div`
  display: flex;
  gap: 5px;
`;
export default BoardSettingItem;
