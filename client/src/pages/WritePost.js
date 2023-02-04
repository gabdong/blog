import { useRef, useState } from "react";
import styled from "styled-components";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { Editor } from "@toast-ui/react-editor";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";

import axios from "../utils/axios";

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function WritePost() {
  const toolbarItems = [
    ["heading", "bold"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
  ];
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");

  //* title handler
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  /**
   * * 게시글 업로드
   */
  const uploadPost = () => {
    const markDown = editorRef.current.getInstance().getMarkdown();

    if (!title) return alert("제목을 입력해주세요.");

    const body = { markDown, title, checkAuth: true };

    axios.post("/apis/posts/", body).then((data) => {
      console.log(data);
    });
  };

  return (
    <WriteWrap>
      <h2 className="subTitle">게시글 작성</h2>
      {/* //* 제목 설정 */}
      <div className="disFlex alignItemCenter gap10">
        <p className="smallTitle">제목 : </p>
        <Input style={{ flex: 1 }} onChange={titleHandler} />
      </div>

      {/* //* mark down editor */}
      <EditorWrap className="scroll" style={{ wordBreak: "break-word" }}>
        <Editor
          previewStyle="vertical"
          height="auto"
          initialEditType="markdown"
          useCommandShortcut={false}
          plugins={[colorSyntax, [codeSyntax, { highlighter: Prism }]]}
          ref={editorRef}
          language="ko-KR"
          hideModeSwitch={true}
          toolbarItems={toolbarItems}
          theme="dark"
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

  max-height: 800px;
`;

export default WritePost;
