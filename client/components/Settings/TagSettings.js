import styled from "styled-components";

import useTagData from "@/lib/hooks/useTagData";

export default function TagSettings() {
  const {
    tagData: { tagList, tagLoading },
  } = useTagData();

  console.log(tagList);
  return tagLoading ? (
    <></>
  ) : (
    <TagSettingWrapSt>
      <div>
        <h2 className="title">Tag</h2>
      </div>
    </TagSettingWrapSt>
  );
}

const TagSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
