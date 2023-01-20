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
  child,
}) {
  const [editing, setEditing] = useState(false);
  const [prevTitle, setPrevTitle] = useState(title);
  const [editedTitle, setEditedTitle] = useState(title);
  const boardEditInput = useRef(null);

  //* 게시판 이름 handler
  const editingTextHandler = (e) => {
    const { value } = e.target;

    setEditedTitle(value);
  };

  //* 게시판 수정모드 handler
  const editingHandler = () => {
    setEditing(!editing);
  }

  //* 게시판 설정아이템 추가
  const addBoardSettingItem = (e) => {
    const item = e.target.closest(".boardSettingItem");
    const childWrap = item.querySelector(".boardChildWrap");
    const settingItem = (<BoardSettingItem />);

    console.log(settingItem);
  };

  //* 게시판 수정 적용
  const updateBoard = (e) => {
    if (e.type === "keyup" && (e.code !== "Enter" && e.code !== "NumpadEnter")) return;

    const item = e.target.closest(".boardSettingItem");
    const { idx, prevTitle } = item.dataset;

    if (prevTitle !== editedTitle) {
      const body = { title: editedTitle, checkAuth: true };

      axios.post(`/apis/boards/${idx}`, body).then(() => {
        setPrevTitle(editedTitle);
      });
    }

    setEditing(!editing);
  };

  //* 게시판 삭제
  const deleteBoard = (e) => {
    if (!window.confirm('하위 게시판까지 삭제됩니다. 진행하시겠습니까?')) return;

    const item = e.target.closest('.boardSettingItem');
    const { idx } = item.dataset;

    axios.delete(`/apis/boards/${idx}`, {
      data: {
        checkAuth: true
      }
    }).then((data) => {
      item.remove();
    }).catch((err) => {
      console.error(err.response.data.msg);
    });
  };

  useEffect(() => {
    if (editing) boardEditInput.current.focus();
  }, [editing]);

  return (
    <BoardSttingItemWrap className="boardSttingItemWrap">
      <BoardSettingItemSt
        data-prev-title={prevTitle}
        data-idx={idx}
        data-parent={parent}
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
            onKeyUp={updateBoard}
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
            <Edit
              className="boardSettingBtn editBoardBtn"
              onClick={editingHandler}
            />
          ) : null}
          {/* //* 게시판 수정적용 */}
          {edit && editing ? (
            <Done
              className="boardSettingBtn addBoardBtn"
              onClick={updateBoard}
            />
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
      {child ? child : null}
    </BoardSttingItemWrap>
  );
}

const BoardSttingItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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
