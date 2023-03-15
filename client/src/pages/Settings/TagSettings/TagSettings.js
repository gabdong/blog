import { useEffect, useState } from "react";
import styled from "styled-components";

import { getTagList, addTag } from "../../../apis/tags";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import TagSettingItem from "./TagSettingItem";


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

  /**
   * * 태그 추가
   * @param {Event} e 
   * @returns 
   */
  const callAddTagFn = (e) => {
    if (e.type === "keyup" && e.code !== "Enter" && e.code !== "NumpadEnter") return;

    return addTag(tagName, setTagList);
  }

  useEffect(() => {
    (async function () {
      setTagList(await getTagList());
      setLoading(false);
    })();
  }, []);
  
  //TODO 태그검색기능 추가
  return (
    <TagSettingWrapSt>
      <div>
        <TagNameInputWrapSt>
          <p className="normalText">태그명 : </p>
          <Input
            type="text"
            value={tagName}
            onChange={tagNameHandler}
            onKeyUp={callAddTagFn}
          />
          <Button text="추가" onClick={callAddTagFn}/>
        </TagNameInputWrapSt>
        <p className="caption mt15">* 콤마로 구분하여 여러개를 추가할 수 있습니다. 추가할 태그명 입력후 추가버튼 혹은 엔터키를 입력해주세요.</p>
        <p className="caption mt15">* 공백과 특수문자, HTML은 제거됩니다.</p>
      </div>

      <TagListWrapSt className="scroll">
        {loading ? null : 
          tagList.map((tagData) => {
            const { idx: tagIdx, name } = tagData;

            return <TagSettingItem key={tagIdx} idx={tagIdx} name={name} />;
          })
        }
      </TagListWrapSt>
    </TagSettingWrapSt>
  );
}

const TagSettingWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  align-items: start;
  align-content: start;
  gap: 14px;

  min-height: 400px;
  max-height: 400px;
  padding: 14px;
  background: var(--dark-l);
`;

export default TagSettings;
