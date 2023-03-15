import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdDelete as Delete } from 'react-icons/md';
import { MdDone as Done } from "react-icons/md";
import { MdModeEditOutline as Edit } from "react-icons/md";

import { updateTag, deleteTag } from "../../../apis/tags";

function TagSettingItem({idx, name}) {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [prevName, setPrevName] = useState(name);
    const nameEditInput = useRef(null);

    //* 태그 수정모드 handler
    const editingHandler = () => {
        setEditing(true);
    }

    //* 수정된 이름 handler
    const editedNameHandler = (e) => {
        setEditedName(e.target.value);
    }

    /**
     * * 태그 수정
     * @returns {Function} updateTag
     */
    const callUpdateTagFn = async (e) => {
        if (e.type === "keyup" && e.code !== "Enter" && e.code !== "NumpadEnter") return;

        if (prevName !== editedName) {
            try {
                await updateTag(idx, editedName);

                setPrevName(editedName);
            } catch (err) {
                if (err.response.status === 409) alert(err.response.data.msg);

                setEditedName(prevName);
            }
        }
        setEditing(false);
    }

    /**
     * * 태그 삭제
     */
    const callDeleteTagFn = async (e) => {
        if (!window.confirm("태그 삭제를 진행하시겠습니까?")) return;

        try {
            await deleteTag(idx);
    
            e.target.closest('.tagSettingItem').remove();
        } catch (err) {
            if (err.response.data.msg) {
                return alert(err.response.data.msg);
            } else {
                throw err;
            }
        }
    }

    useEffect(() => {
        if (editing) nameEditInput.current.focus();
    }, [editing]);

    return (
        <TagSettingItemSt className="tagSettingItem">
            {editing ? (
                <input
                    type="text"
                    className="caption"
                    id={`boardEditInput_${idx}`}
                    value={editedName}
                    onChange={editedNameHandler}
                    autoComplete="off"
                    ref={nameEditInput}
                    onKeyUp={callUpdateTagFn}
                />
            ) : (
                <p className="caption">{editedName}</p>
            )}
            <TagSettingBtnWrapSt>
                {editing ? <Done onClick={callUpdateTagFn}/> : <Edit onClick={editingHandler}/>}
                <Delete onClick={callDeleteTagFn}/>
            </TagSettingBtnWrapSt>
        </TagSettingItemSt>
    );
}

const TagSettingItemSt = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 8px 12px;
    border-radius: var(--border-radius);
    background: var(--gray);
    color: #ffffff;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
        background: var(--primary-color);
    }
`;

const TagSettingBtnWrapSt = styled.div`
    display: flex;
    gap: 4px;
`;

export default TagSettingItem;