import { HiPlus as Plus } from "react-icons/hi";
import { MdDelete as Delete } from "react-icons/md";
import { MdModeEditOutline as Edit } from "react-icons/md";
import { MdDone as Done } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "../../../utils/axios";

//TODO auth설정 추가
function BoardSettingItem({
  title,
  edit,
  depth,
  idx = 0,
  parent = 0,
  boardList,
  boardListHandler,
}) {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const boardEditInput = useRef(null);

  //* 게시판 이름 handler
  const editingTextHandler = (e) => {
    const { value } = e.target;

    setEditedTitle(value);
  };

  //* 게시판 설정아이템 추가
  const addBoardSettingItem = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
  };

  //* 게시판 수정 적용
  const updateBoard = (e) => {
    const item = e.target.closest(".boardSettingItem");
    const { idx, prevTitle } = item.dataset;

    if (prevTitle !== editedTitle) {
      const body = { idx, title: editedTitle, checkAuth: true };

      axios.post("/apis/boards/", body).then(() => {
        setEditing(!editing);
      });
    }
  };

  //* 게시판 수정
  const editBoard = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;

    setEditing(!editing);
  };

  //* 게시판 삭제
  const deleteBoard = (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
  };

  useEffect(() => {
    if (editing) boardEditInput.current.focus();
  }, [editing]);

  return (
    <BoardSettingItemSt
      data-prev-title={title}
      data-idx={idx}
      className={`boardSettingItem ${depth !== 1 && edit ? "child" : ""}`}
      id={`boardSettingItem_${idx}`}
    >
      {editing ? (
        <input
          type="text"
          className="inputText"
          id={`boardEditInput_${idx}`}
          value={editedTitle}
          onChange={editingTextHandler}
          ref={boardEditInput}
          autoComplete="off"
        />
      ) : (
        <p className="normalText">{editedTitle}</p>
      )}

      {/* //* 버튼영역 */}
      <SettingBtnWrapSt>
        {/* //* 게시판 설정아이템 추가버튼 */}
        {depth !== 2 ? (
          <Plus
            className="boardSettingBtn addBoardSettingItemBtn"
            onClick={addBoardSettingItem}
          />
        ) : null}
        {/* //* 게시판 수정버튼 */}
        {edit && !editing ? (
          <Edit className="boardSettingBtn editBoardBtn" onClick={editBoard} />
        ) : null}
        {/* //* 게시판 수정적용 */}
        {edit && editing ? (
          <Done className="boardSettingBtn addBoardBtn" onClick={updateBoard} />
        ) : null}
        {/* //* 게시판 삭제버튼 */}
        {edit ? (
          <Delete
            className="boardSettingBtn deleteBoardBtn"
            onClick={deleteBoard}
          />
        ) : null}
      </SettingBtnWrapSt>
    </BoardSettingItemSt>
  );
}

const BoardSettingItemSt = styled.div`
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

  &.child {
    width: calc(100% - 20px);
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
