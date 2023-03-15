import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//* markdown editor
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";

//* editor theme
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";

import axios from "../utils/axios";
import { uploadImage } from "../apis/images";
import { getTagList } from "../apis/tags";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

//TODO 썸네일 추가하기
function PostEditor() {
  //TODO 새글, 글수정
  const params = useParams();

  const navigate = useNavigate();
  const toolbarItems = [
    ["heading", "bold"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image", "code", "codeblock"],
  ];
  const editorRef = useRef(null);
  const user = useSelector((store) => store.user.idx);

  const [subject, setsubject] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagListLoading, setTagListLoading] = useState(true);
  //TODO 수정모드일 경우 사용중인 tagList 불러오기
  const [selectedTagList, setSelectedTagList] = useState([
    { idx: 1, name: "test" },
  ]);

  //* subject handler
  const subjectHandler = (e) => {
    setsubject(e.target.value);
  };

  //* selected tag list handler
  const selectedTagListHandler = (e) => {
    setSelectedTagList();
  };

  /**
   * * 게시글 업로드
   */
  const uploadPost = () => {
    const markDown = editorRef.current.getInstance().getMarkdown();

    if (!subject) return alert("제목을 입력해주세요.");

    const body = {
      markDown,
      subject,
      user,
      checkAuth: true,
    };

    axios.post("/apis/posts/", body).then((data) => {
      const { postIdx } = data.data;

      navigate(`/post/${postIdx}`);
    });
  };

  useEffect(() => {
    (async function () {
      setTagList(await getTagList());
      setTagListLoading(false);
    })();
  }, []);

  return (
    <WriteWrap>
      <h2 className="subTitle">게시글 작성</h2>

      {/* //* 태그 설정 */}
      <TagSettingWrap>
        <p className="smallTitle">태그설정</p>

        {/* //* 태그 검색 */}
        <TagSearchWrapSt>
          <Input placeholder="검색할 단어 입력 후 엔터 혹은 검색버튼을 클릭하세요." />
          <Button text="검색" />
        </TagSearchWrapSt>

        {/* //* 태그 목록 */}
        <TagListSt className="mb10 scroll">
          {tagListLoading
            ? null
            : tagList.map((tagData) => {
                //TODO 권한 확인
                const { idx: tagIdx, auth, name: tagName } = tagData;

                return (
                  <TagItemSt key={tagIdx}>
                    <p className="caption">{tagName}</p>
                  </TagItemSt>
                );
              })}
        </TagListSt>

        {/* //* 선택된 태그 */}
        <SelectedTagListWrapSt>
          <p className="normalText">선택된 태그 :</p>
          <SelectedTagListSt>
            {selectedTagList.map((selectedTagData) => {
              const { idx: tagIdx, name: tagName } = selectedTagData;

              return (
                <TagItemSt key={tagIdx}>
                  <p className="caption">{tagName}</p>
                </TagItemSt>
              );
            })}
          </SelectedTagListSt>
        </SelectedTagListWrapSt>
      </TagSettingWrap>

      {/* //* 제목 설정 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 className="smallTitle">제목 :</h3>
        <Input style={{ flex: 1 }} onChange={subjectHandler} />
      </div>

      {/* //* mark down editor */}
      <EditorWrap className="scroll" style={{ wordBreak: "break-word" }}>
        <Editor
          previewStyle="tab"
          height="auto"
          initialEditType="markdown"
          useCommandShortcut={false}
          plugins={[[colorSyntax], [codeSyntax, { highlighter: Prism }]]}
          ref={editorRef}
          language="ko-KR"
          hideModeSwitch={true}
          toolbarItems={toolbarItems}
          theme="dark"
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              const altText = document.getElementById(
                "toastuiAltTextInput"
              ).value;

              if (!altText) return alert("이미지 설명을 입력해주세요.");

              const { url, alt } = await uploadImage(blob, altText);

              callback(url, alt);
            },
          }}
        />
      </EditorWrap>

      {/* //* save button */}
      <Button text="Save" style={{ alignSelf: "end" }} onClick={uploadPost} />
    </WriteWrap>
  );
}

const WriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;
`;

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TagSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TagSearchWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  & > input {
    flex: 1;
  }
`;

const TagListSt = styled.div`
  display: flex;
  gap: 14px;

  padding: 14px;
  background: var(--dark-l);
`;

const TagItemSt = styled.div`
  padding: 8px 12px;
  background: var(--gray);
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
  }
`;

const SelectedTagListWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const SelectedTagListSt = styled.div`
  display: flex;
  gap: 14px;
`;

export default PostEditor;
