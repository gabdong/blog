import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/ssrRequireAuthentication";
import { editPost, getPost, uploadPost } from "@/lib/apis/posts";
import { getSearchTag } from "@/lib/apis/tags";
import useInput from "@/lib/hooks/useInput";
import { elDisplayToggle } from "@/lib/utils/utils";

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

  //* post data state
  const postIdx = postData?.idx ?? "";
  const [subject, subjectHandler, setSubject] = useInput(
    postData?.subject ?? ""
  );
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTagsData, setselectedTagsData] = useState(
    postData?.tagData ?? []
  ); // tag data
  const [selectedTags, setselectedTags] = useState(postData?.tags ?? []); // tag idx list

  //* etc state
  const [searchTagsData, setSearchTagsData] = useState([]);
  const [searchTagsWord, setSearchTagsWord] = useState("");
  const [uploadImagesData, setUploadImagesData] = useState([]);

  //* ref
  const searchResultWrapRef = useRef(null);
  const selectedTagsWrapRef = useRef(null);

  useEffect(() => {
    //* 수정 -> 새글 / 새글 -> 수정 전환시 state 변경
    if (pageProps.urlParams.type == "edit" && postData.subject != subject) {
      setSubject(postData.subject);
      setContent(postData.content);
      setselectedTagsData(postData.tagData);
      setselectedTags(postData.tags);
    } else if (pageProps.urlParams.type == "new" && subject) {
      setSubject("");
      setContent();
      setselectedTagsData([]);
      setselectedTags([]);
    }
  }, [pageProps.urlParams]);

  /**
   * * 태그 검색결과 표시해주는 함수
   * @param {String} searchWord
   */
  const getSearchTagResult = async (searchWord) => {
    if (searchWord) {
      const searchTagDataRes = await getSearchTag(searchWord, selectedTags);

      if (Array.isArray(searchTagDataRes)) {
        setSearchTagsData(searchTagDataRes);
      } else {
        setSearchTagsData([]);
      }

      searchResultWrapRef.current.classList.add("active");
      elDisplayToggle(
        ["searchTagResultWrap", "searchTagInput"],
        "searchTagResultWrap",
        "active",
        true
      );
    } else {
      searchResultWrapRef.current.classList.remove("active");
      elDisplayToggle(null, null, null, false);
    }
  };

  /**
   * * 태그 검색결과 선택
   * @param {Array} data
   */
  const clickSearchTagResult = (data) => {
    // 선택한 태그리스트
    setselectedTagsData((prev) => {
      prev.push(data);
      return [...prev];
    });
    setselectedTags((prev) => {
      prev.push(data.idx);
      return [...prev];
    });

    // 태그 검색결과 리스트
    setSearchTagsData((prev) => {
      const clickTagIndex = prev.findIndex((el) => (el.idx = data.idx));
      if (clickTagIndex !== -1) prev.splice(clickTagIndex, 1);

      return [...prev];
    });
  };

  /**
   * * 게시글 저장/수정
   * @param {String} isPublic - 게시글 임시저장(공개) 여부(Y/N)
   */
  const savePost = async (isPublic = "N") => {
    const data = { isPublic, subject, content, tags: selectedTags };

    if (postIdx) {
      //* 수정
      data.postIdx = postIdx;
      editPost(data);
    } else {
      //* 저장
      uploadPost(data);
    }
  };

  return (
    <EditorWrapSt>
      {/* //* 선택된 태그리스트 */}
      <SelectedTagsWrapSt ref={selectedTagsWrapRef}>
        {selectedTagsData.length > 0
          ? selectedTagsData.map((data) => {
              return (
                <SelectedTagsItemSt key={data.idx}>
                  <span className="caption">#{data.name}</span>
                </SelectedTagsItemSt>
              );
            })
          : null}
      </SelectedTagsWrapSt>

      {/* //* 제목인풋 */}
      <Input
        defaultValue={subject}
        onChange={subjectHandler}
        border="bottom"
        style={{
          color: "var(--gray-l)",
        }}
        placeholder="제목"
      />

      {/* //* 태그검색 */}
      <SearchTagWrapSt>
        {/* //* 검색인풋 */}
        <SearchInput
          searchFunc={(searchWord) => getSearchTagResult(searchWord)}
          border="bottom"
          style={{
            width: "100%",
            color: "var(--gray-l)",
          }}
          placeholder="태그추가"
          onFocus={(e) => getSearchTagResult(e.target.value)}
          id="searchTagInput"
          defaultValue={searchTagsWord}
          setDefaultValue={setSearchTagsWord}
        />
        {/* //* 검색결과 리스트 */}
        <SearchResultWrapSt
          ref={searchResultWrapRef}
          id="searchTagResultWrap"
          className={searchTagsWord ? "active" : "noActive"}
        >
          {searchTagsData.length > 0 ? (
            searchTagsData.map((data) => {
              return (
                <SearchResultItemSt
                  key={data.idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    clickSearchTagResult(data);
                  }}
                >
                  <span className="normalText">{data.name}</span>
                </SearchResultItemSt>
              );
            })
          ) : (
            <span className="normalText">검색 결과가 없습니다.</span>
          )}
        </SearchResultWrapSt>
      </SearchTagWrapSt>

      {/* //* 게시글 에디터 */}
      <Editor
        value={content}
        onChange={setContent}
        height="500"
        setUploadImageData={setUploadImagesData}
      />

      {/* //* 저장, 취소버튼 */}
      <ButtonWrapSt>
        <Button text="취소" />
        <SaveButtonWrapSt>
          <Button text="임시저장" onClick={() => savePost("Y")} />
          <Button
            text="저장"
            style={{ background: "var(--primary-color)" }}
            onClick={() => savePost("N")}
          />
        </SaveButtonWrapSt>
      </ButtonWrapSt>
    </EditorWrapSt>
  );
}

const SelectedTagsWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SelectedTagsItemSt = styled.div`
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
