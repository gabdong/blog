import { AiOutlinePlus as Plus } from "react-icons/ai";
import { AiOutlineMinus as Minus } from "react-icons/ai";
import styled from "styled-components";

function BoardSettingItem() {
    return (
        <BoardSettingItemSt className="boardSettingItem">
            <p className="normalText">Board</p>
            <Plus className="addBoardCategoryBtn" />
            <Minus className="addBoardCategoryBtn" />
        </BoardSettingItemSt>
    );
}

const BoardSettingItemSt = styled.div`
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
export default BoardSettingItem;