import { useEffect, useState } from "react";
import styled from "styled-components";

import { getTagList } from "../../apis/tags";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

function TagSettings() {
  const [tagList, setTagList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagName, setTagName] = useState("");

  /**
   * * Tag Name handler
   * @param {Event} e
   */
  const tagNameHandler = (e) => {
    setTagName(e.target.value);
  };

  useEffect(() => {
    (async function () {
      await getTagList(setTagList);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? null : (
        <TagSettingWrapSt>
          <TagNameInputWrapSt>
            <p className="normalText">태그명 : </p>
            <Input
              type="text"
              value={tagName}
              onChange={tagNameHandler}
              placeholder="콤마로 구분하여 여러개를 추가할 수 있습니다. 추가할 태그명 입력후 추가버튼 혹은 엔터키를 입력해주세요."
            />
            <Button text="추가" />
          </TagNameInputWrapSt>
          <TagListWrapSt>
            {tagList.map((tagData) => {
              const { idx: tagIdx, name } = tagData;

              return (
                <TagItemSt key={tagIdx} data-idx={tagIdx}>
                  <p className="caption">{name}</p>
                </TagItemSt>
              );
            })}
          </TagListWrapSt>
        </TagSettingWrapSt>
      )}
    </>
  );
}

const TagSettingWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TagNameInputWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;

  & > input {
    flex: 1;
  }
`;

const TagListWrapSt = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;

  padding: 14px;
  background: var(--dark-l);
`;

const TagItemSt = styled.div`
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

export default TagSettings;
