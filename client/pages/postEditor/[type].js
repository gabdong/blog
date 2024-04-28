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
  const [thumbnail, setThumbnail] = useState(postData?.thumbnail ?? "");
  const [thumbnailAlt, setThumbnailAlt] = useState(
    postData?.thumbnailAlt ?? ""
  );
  const [subject, subjectHandler, setSubject] = useInput(
    postData?.subject ?? ""
  );
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTagsData, setselectedTagsData] = useState(
    postData?.tagData ?? []
  ); // 선택한 tag data -> 출력용
  const [selectedTags, setselectedTags] = useState(postData?.tags ?? []); // 선택한 tag idx list -> 저장용

  //* etc state
  const [searchTagsData, setSearchTagsData] = useState([]); // 검색된 태그정보
  const [searchTagWord, setSearchTagWord] = useState(""); // 검색할 태그
  const [uploadThumbnail, setUploadThumbnail] = useState(null); // 업로드할 썸네일

  //* ref
  const searchResultWrapRef = useRef(null);
  const selectedTagsWrapRef = useRef(null);

  useEffect(() => {
    //* 수정 -> 새글 || 새글 -> 수정 전환시 state 변경
    if (pageProps.urlParams.type == "edit" && postData.subject != subject) {
      setSubject(postData.subject);
      setContent(postData.content);
      setselectedTagsData(postData.tagData);
      setselectedTags(postData.tags);
      setThumbnail(postData.thumbnail);
      setThumbnailAlt(postData.thumbnailAlt);
    } else if (pageProps.urlParams.type == "new" && subject) {
      setSubject("");
      setContent();
      setselectedTagsData([]);
      setselectedTags([]);
      setThumbnail("");
      setThumbnailAlt("");
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
   * @param {Array} data 태그정보
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
   * @param {String} isPublic 게시글 공개여부(Y/N)
   */
  const savePost = async (isPublic = "Y") => {
    const data = {
      isPublic,
      subject,
      content,
      tags: selectedTags,
      uploadThumbnail,
      thumbnailAlt,
    };

    console.log(data);

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

      {/* //* 태그추가 */}
      <SearchTagWrapSt>
        <h3 className="smallTitle">태그</h3>
        {/* //* 태그 검색인풋 */}
        <SearchInput
          searchFunc={(searchWord) => getSearchTagResult(searchWord)}
          border="bottom"
          style={{
            width: "100%",
            color: "var(--gray-l)",
          }}
          placeholder="검색"
          onFocus={(e) => getSearchTagResult(e.target.value)}
          id="searchTagInput"
          defaultValue={searchTagWord}
          setDefaultValue={setSearchTagWord}
        />
        {/* //* 태그 검색결과 리스트 */}
        <SearchTagResultWrapSt
          ref={searchResultWrapRef}
          id="searchTagResultWrap"
          className={searchTagWord ? "active" : "noActive"}
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
        </SearchTagResultWrapSt>
      </SearchTagWrapSt>

      {/* //* 썸네일 설정 */}
      <ThumbnailSettingWrapSt>
        <h3 className="smallTitle">썸네일</h3>
        <Input
          type="file"
          border="bottom"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          onChange={(e) => {
            const file = e.target.files[0];
            const allowedExtensions = [
              "image/png",
              "image/jpg",
              "image/jpeg",
              "image/gif",
            ];
            if (!allowedExtensions.includes(file.type))
              return alert("잘못된 확장자입니다.");

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              //* 썸네일 미리보기
              setThumbnail(reader.result);
              setUploadThumbnail(file);
            };
          }}
        />
        <Input
          defaultValue={thumbnailAlt}
          onChange={(e) => setThumbnailAlt(e.target.value)}
          border="bottom"
          style={{
            color: "var(--gray-l)",
          }}
          placeholder="썸네일 설명"
        />
        {/* //* 썸네일 미리보기 */}
        <ThumbnailPreivewWrapSt>
          {thumbnail ? (
            <ThumbnailImgSt id="thumbnail" src={thumbnail} alt={thumbnailAlt} />
          ) : null}
        </ThumbnailPreivewWrapSt>
      </ThumbnailSettingWrapSt>

      {/* //* 제목설정 */}
      <SubjectSettingWrapSt>
        <h3 className="smallTitle">제목</h3>
        <Input
          defaultValue={subject}
          onChange={subjectHandler}
          border="bottom"
          style={{
            color: "var(--gray-l)",
          }}
          placeholder="입력"
        />
      </SubjectSettingWrapSt>

      {/* //* 게시글 에디터 */}
      <ContentSettingWrapSt>
        <h3 className="smallTitle">내용</h3>
        <Editor value={content} onChange={setContent} height="500" />
      </ContentSettingWrapSt>

      {/* //* 저장, 취소버튼 */}
      <ButtonWrapSt>
        <Button text="취소" />
        <SaveButtonWrapSt>
          <Button text="비공개" onClick={() => savePost("N")} />
          <Button
            text="저장"
            style={{ background: "var(--primary-color)" }}
            onClick={() => savePost()}
          />
        </SaveButtonWrapSt>
      </ButtonWrapSt>
    </EditorWrapSt>
  );
}

const EditorWrapSt = styled.article`
  display: flex;
  flex-direction: column;
  gap: 25px;

  width: 100%;
`;
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
const ThumbnailSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ThumbnailPreivewWrapSt = styled.div`
  height: 120px;
  padding: 8px;
  border: 1px solid #dddddd;
  border-radius: var(--border-radius);
`;
const ThumbnailImgSt = styled.img`
  height: 100%;
`;
const SearchTagWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
`;
const SearchTagResultWrapSt = styled.div`
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
const SubjectSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const ContentSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
