import { HiPlus as Plus } from "react-icons/hi";
import { MdDelete as Delete } from "react-icons/md";
import { MdModeEditOutline as Edit } from "react-icons/md";
import { MdDone as Done }from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { axios } from "../../../utils/axios"
import styled from "styled-components";

//TODO auth설정 추가
function BoardSettingItem({ text, edit, depth, idx = 0, parent = 0, boardList, boardListHandler }) {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(text);
  const boardEditInput = useRef(null);
  const editingTextHandler = (e) => {
    const { value } = e.target;

    setEditingText(value);
  }

  //* 게시판 설정아이템 추가
  const addBoardSettingItem = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    
  }

  //* 게시판 추가
  const addBoard = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;

    setEditing(!editing);
  }

  //* 게시판 수정
  const editBoard = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;

    setEditing(!editing);
  }

  //* 게시판 삭제
  const deleteBoard = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;

  }

  useEffect(() => {
    if (editing) boardEditInput.current.focus();
  }, [editing]);

  return (
    <BoardSettingItemSt
      className={`boardSettingItem ${depth !== 1 && edit ? "child" : ""}`}
      id={`boardSettingItem_${idx}`}
    >
      {editing ? <input type="text" className="inputText" id={`boardEditInput_${idx}`} value={editingText} onChange={editingTextHandler} ref={boardEditInput} autocomplete="off"/> : <p className="normalText">{editingText}</p>}

      {/* //* 버튼영역 */}
      <SettingBtnWrapSt>
        {/* //* 게시판 설정아이템 추가버튼 */}
        {depth !== 2 ? <Plus className="boardSettingBtn addBoardSettingItemBtn" onClick={addBoardSettingItem}/> : null}
        {/* //* 게시판 수정버튼 */}
        {edit && !editing ? <Edit className="boardSettingBtn editBoardBtn" onClick={editBoard}/> : null}
        {/* //* 게시판 추가버튼 */}
        {edit && editing ? <Done className="boardSettingBtn addBoardBtn" onClick={addBoard}/> : null}
        {/* //* 게시판 삭제버튼 */}
        {edit ? <Delete className="boardSettingBtn deleteBoardBtn" onClick={deleteBoard}/> : null}
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

  .boardSettingBtn {
    font-size: 18px;
    cursor: pointer;
  }
`;

const SettingBtnWrapSt = styled.div`
  display: flex;
  gap: 5px;
`;
export default BoardSettingItem;
