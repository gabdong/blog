import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/ssrRequireAuthentication";
import { getPost } from "@/lib/apis/posts";
import { getSearchTag } from "@/lib/apis/tags";
import useInput from "@/lib/hooks/useInput";

import Editor from "@/components/Editor";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import { useRouter } from "next/router";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  const {
    gsspProps: { postData },
  } = pageProps;
  const router = useRouter();

  const postIdx = postData?.idx ?? "";
  const [subject, subjectHandler, setSubject] = useInput(
    postData?.subject ?? ""
  );
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTag, setSelectedTag] = useState(postData?.tagData ?? []);
  const [searchTagData, setSearchTagData] = useState([]);

  const searchResultWrapRef = useRef(null);
  const selectedTagWrapRef = useRef(null);

  useEffect(() => {
    setSubject(postData?.subject ?? "");
    setContent(postData?.content ?? "");
    setSelectedTag(postData?.tagData ?? []);
  }, [router.query]);

  /**
   * * 태그 검색결과 표시해주는 함수
   * @param {String} searchWord
   */
  const getSearchTagResult = async (searchWord) => {
    if (searchWord) {
      const searchTagData = await getSearchTag(searchWord);
      if (Array.isArray(searchTagData)) {
        setSearchTagData(searchTagData);
      } else {
        setSearchTagData([]);
      }
      searchResultWrapRef.current.classList.add("active");
    } else {
      searchResultWrapRef.current.classList.remove("active");
    }
  };

  /**
   * * 태그 검색결과 선택
   * @param {Array} data
   */
  const clickSearchTagResult = (data) => {
    setSelectedTag((prev) => {
      prev.push(data);
      return [...prev];
    });
  };

  return (
    <EditorWrapSt>
      <SelectedTagWrapSt ref={selectedTagWrapRef}>
        {selectedTag.length > 0
          ? selectedTag.map((data) => {
              return (
                <SelectedTagItemSt key={data.idx}>
                  <span className="caption">#{data.name}</span>
                </SelectedTagItemSt>
              );
            })
          : null}
      </SelectedTagWrapSt>
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
              <>
                <SearchResultItemSt
                  key={data.idx}
                  onClick={() => clickSearchTagResult(data)}
                >
                  <span className="normalText">{data.name}</span>
                </SearchResultItemSt>
              </>
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

const SelectedTagWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SelectedTagItemSt = styled.div`
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
const SearchTagWrapSt = styled.div`
  width: 100%;
  position: relative;
`;
const SearchResultWrapSt = styled.div`
  display: none;
  gap: 8px;

  width: 100%;
  padding: var(--box-padding);
  background: var(--dark);
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  position: absolute;
  top: calc(100% + 10px);

  &.active {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
  }
`;
const SearchResultItemSt = styled.div`
  cursor: pointer;

  & > .normalText {
    transition: var(--transition);
  }
  &:hover > .normalText {
    color: var(--primary-color);
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
