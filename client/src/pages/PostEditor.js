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
import { getFirstDepthBoardList } from "../apis/boards";
import { getChildBoardList } from "../apis/boards";
import { uploadImage } from "../apis/images";

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

  //* subject handler
  const subjectHandler = (e) => {
    setsubject(e.target.value);
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

  }, []);

  return (
    <WriteWrap>
      <h2 className="subTitle">게시글 작성</h2>


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
            //TODO 이미지 저장
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

export default PostEditor;
