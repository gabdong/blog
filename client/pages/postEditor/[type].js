import { useRef, useState } from "react";
import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/ssrRequireAuthentication";
import { getPost } from "@/lib/apis/posts";
import { getSearchTag } from "@/lib/apis/tags";
import useInput from "@/lib/hooks/useInput";

import Editor from "@/components/Editor";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  const {
    gsspProps: { postData },
  } = pageProps;

  const postIdx = postData?.idx ?? "";
  const [subject, subjectHandler] = useInput(postData?.subject ?? "");
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTag, setSelectedTag] = useState([]);
  const [searchTagData, setSearchTagData] = useState([]);
  const searchResultWrapRef = useRef(null);

  /**
   * * 태그 검색결과 표시해주는 함수
   * @param {String} searchWord
   */
  const getSearchTagResult = async (searchWord) => {
    if (searchWord) {
      const searchTagData = await getSearchTag(searchWord);
      if (Array.isArray(searchTagData)) {
        setSearchTagData(searchTagData);
        console.log(searchTagData);
      } else {
        setSearchTagData([]);
      }
      searchResultWrapRef.current.classList.add("active");
    } else {
      searchResultWrapRef.current.classList.remove("active");
    }
  };

  return (
    <EditorWrapSt>
      <Input
        defaultValue={subject}
        onChange={subjectHandler}
        border="bottom"
        style={{
          color: "var(--gray-l)",
        }}
        placeholder="제목"
      />
      <SearchTagWrapSt>
        <SearchInput
          searchFunc={(searchWord) => getSearchTagResult(searchWord)}
          border="bottom"
          style={{
            width: "100%",
            color: "var(--gray-l)",
          }}
          placeholder="태그추가"
        />
        <SearchResultWrapSt ref={searchResultWrapRef}>
          {searchTagData.map((data) => {
            console.log(data);
            return (
              <div key={data.idx}>
                <p>{data.name}</p>
              </div>
            );
          })}
        </SearchResultWrapSt>
      </SearchTagWrapSt>

      <Editor value={content} onChange={setContent} height="500" />

      <ButtonWrapSt>
        <Button text="취소" />
        <SaveButtonWrapSt>
          <Button text="임시저장" />
          <Button text="저장" style={{ background: "var(--primary-color)" }} />
        </SaveButtonWrapSt>
      </ButtonWrapSt>
    </EditorWrapSt>
  );
}

const SearchTagWrapSt = styled.div`
  width: 100%;
  position: relative;
`;
const SearchResultWrapSt = styled.div`
  display: none;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  padding: 12px;
  background: var(--dark);
  position: absolute;

  &.active {
    display: flex;
    z-index: 1;
  }
`;
const EditorWrapSt = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;
const ButtonWrapSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
const SaveButtonWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const getServerSideProps = ssrRequireAuthentication(
  async (ctx, user) => {
    const { type } = ctx.params;

    if (type != "edit") return {};

    const postIdx = ctx.query.post;
    const postData = await getPost({ postIdx, user });

    //* error
    if (postData.status) return { redirect: `/${postData.status}` };

    return { postData };
  }
);
