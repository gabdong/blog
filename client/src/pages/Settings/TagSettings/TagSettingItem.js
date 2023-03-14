import { useState } from "react";
import styled from "styled-components";
import {MdDelete as Delete} from 'react-icons/md';
import { MdModeEditOutline as Edit } from "react-icons/md";


function TagSettingItem({idx, name}) {
    const [editing, setEditing] = useState(false);

    return (
        <TagSettingItemSt>
            <p className="caption">{name}</p>
            <Edit />
            <Delete />
        </TagSettingItemSt>
    );
}

const TagSettingItemSt = styled.div`
    padding: 8px 12px;
    border-radius: var(--border-radius);
    background: var(--gray);
    color: #ffffff;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
        background: var(--primary-color-d);
    }
`;

export default TagSettingItem;