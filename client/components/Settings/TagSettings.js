import styled from "styled-components";

import useTagData from "@/lib/hooks/useTagData";
import useInput from "@/lib/hooks/useInput";
import { saveTag } from "@/lib/apis/tags";

import Input from "../Input";
import Button from "../Button";

export default function TagSettings() {
  const {
    tagData: { tagList, tagLoading },
    setTagData,
  } = useTagData();

  /**
   * * 태그 저장후 태그리스트 갱신
   * @param {*} newTagList
   */
  const addTagList = (newTagList) => {
    setTagData((prev) => {
      prev.tagList = { ...prev.tagList, ...newTagList };

      return { ...prev };
    });
  };

  const [saveTagName, saveTagNameHandler] = useInput("");

  return tagLoading ? (
    <></>
  ) : (
    <TagSettingWrapSt>
      <SettingContainer>
        <h2 className="title">태그설정</h2>
        <div className="disFlex gap10">
          <Input
            defaultValue={saveTagName}
            onChange={saveTagNameHandler}
            border="bottom"
            style={{
              color: "var(--gray-l)",
              flex: "1",
            }}
            placeholder="추가할 태그 입력"
            onKeyUp={(e) => e.keyCode == 13 && saveTag(saveTagName, addTagList)}
          />
          <Button
            text="추가"
            onClick={() => saveTag(saveTagName, addTagList)}
          />
        </div>
        <TagListSt>
          {Object.values(tagList).length > 0
            ? Object.entries(tagList).map(([tagIdx, data]) => {
                return (
                  <TagItemSt key={tagIdx}>
                    <span className="caption">#{data.name}</span>
                  </TagItemSt>
                );
              })
            : null}
        </TagListSt>
      </SettingContainer>
    </TagSettingWrapSt>
  );
}

const TagSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TagListSt = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const TagItemSt = styled.div`
  padding: var(--small-box-padding);
  border-radius: var(--border-radius);
  background: var(--dark-l-o);
  transition: var(--transition);
  cursor: pointer;

  & > .caption {
    color: var(--primary-color-d-text);
  }
  &:hover {
    background: var(--dark-l);
  }
`;
