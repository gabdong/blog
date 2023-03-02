import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
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

import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

function PostEditor() {
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
  const [firstDepthLoading, setFirstDepthLoading] = useState(true);
  const [firstDepthBoardList, setFirstDepthBoardList] = useState([]);
  const [childBoardListLoading, setChidBoardListLoading] = useState(true);
  const [childBoardList, setChildBoardList] = useState([]);
  const [board, setBoard] = useState();

  //* subject handler
  const subjectHandler = (e) => {
    setsubject(e.target.value);
  };

  //* board handler
  const boardHandler = (e) => {
    setBoard(e.target.value);
  };

  /**
   * * 게시글 업로드
   */
  const uploadPost = () => {
    const markDown = editorRef.current.getInstance().getMarkdown();

    if (!subject) return alert("제목을 입력해주세요.");
    if (!board) return alert('게시판을 선택해주세요.');

    const body = { markDown, subject, board, user, checkAuth: true };

    axios.post("/apis/posts/", body).then((data) => {
      const { postIdx } = data.data;

      navigate(`/post/${postIdx}`);
    });
  };

  /**
   * * 하위 게시판 리스트 요청
   * @param {Event} e
   */
  const changeFirstDepth = async (e) => {
    setChildBoardList(await getChildBoardList(e.target.value));
    setChidBoardListLoading(false);
  };

  useEffect(() => {
    (async function () {
      //* 1차 게시판 리스트 요청
      setFirstDepthBoardList(await getFirstDepthBoardList());
      setFirstDepthLoading(false);
    })();
  }, []);

  return (
    <WriteWrap>
      <h2 className="subTitle">게시글 작성</h2>

      {/* //* 1차 메뉴 선택 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 className="smallTitle">1차 메뉴 :</h3>
        <select onChange={changeFirstDepth}>
          <option value="none">선택없음</option>
          {firstDepthLoading
            ? null
            : firstDepthBoardList.map((data) => {
                const { idx, title } = data;
                return (
                  <option key={idx} value={idx}>
                    {title}
                  </option>
                );
              })}
        </select>
      </div>

      {/* //* 2차 메뉴 선택 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 className="smallTitle">2차 메뉴 :</h3>
        <select onChange={boardHandler}>
          <option value="none">선택없음</option>
          {childBoardListLoading
            ? null
            : childBoardList.map((data) => {
                const { idx, title } = data;
                return (
                  <option key={idx} value={idx}>
                    {title}
                  </option>
                );
              })}
        </select>
      </div>

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
              console.log(blob);
              callback(blob);
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

  max-height: 800px;
`;

export default PostEditor;
