import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
import { getPost } from "../apis/posts";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

//TODO 컴포넌트 분리
function PostEditor() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const user = useSelector((store) => store.user.idx);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [tagList, setTagList] = useState([]);
  const [tagListLoading, setTagListLoading] = useState(true);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [selectedTagDataList, setSelectedTagDataList] = useState({});
  const [thumbnailFile, setThumbnailFile] = useState(""); // 저장용
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // 미리보기용
  const [thumbnail, setThumbnail] = useState(""); // input value용
  const [thumbnailAlt, setThumbnailAlt] = useState("");
  const [loading, setLoading] = useState(true);
  const postIdx =
    params.mode === "edit"
      ? Number(new URLSearchParams(location.search).get("post"))
      : null;

  //* 에디터 뒤로가기 버튼
  const editorUndo = document.createElement("span");
  editorUndo.classList.add("material-icons");
  editorUndo.textContent = "undo";
  editorUndo.style = "cursor: pointer; margin-top: 4px;";
  editorUndo.addEventListener("click", () => {
    editorRef.current.getInstance().exec("undo");
  });

  //* 에디터 앞으로가기 버튼
  const editorRedo = document.createElement("span");
  editorRedo.classList.add("material-icons");
  editorRedo.textContent = "redo";
  editorRedo.style = "cursor: pointer; margin-top: 4px;";
  editorRedo.addEventListener("click", () => {
    editorRef.current.getInstance().exec("redo");
  });

  const toolbarItems = [
    [
      {
        name: "undo",
        tooltip: "뒤로가기",
        el: editorUndo,
      },
      {
        name: "redo",
        tooltip: "앞으로가기",
        el: editorRedo,
      },
      "heading",
      "bold",
    ],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image", "code", "codeblock"],
  ];

  //* 제목 handler
  const subjectHandler = (e) => {
    setSubject(e.target.value);
  };

  //* 썸네일 handler
  const thumbnailHandler = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      setThumbnailPreview(e.target.result);
    };

    setThumbnail(e.target.value);
    setThumbnailFile(e.target.files[0]);
  };

  //* 썸네일 alt handler
  const thumbnailAltHandler = (e) => {
    setThumbnailAlt(e.target.value);
  };

  //* 선택된 태그 리스트 handler
  const selectedTagListHandler = (e, mode) => {
    const idx = Number(e.currentTarget.dataset.idx);

    if (mode === "add") {
      const tagData = { ...tagList[idx] };

      //* 선택된 태그 리스트 갱신
      setSelectedTagList((prev) => [...prev, ...[idx]]);
      setSelectedTagDataList((prev) => {
        prev[idx] = tagData;
        return { ...prev };
      });

      //* 태그목록 갱신
      setTagList((prev) => {
        delete prev[idx];
        return { ...prev };
      });
    } else {
      const tagData = { ...selectedTagDataList[idx] };

      //* 선택된 태그 리스트 갱신
      setSelectedTagList((prev) => {
        prev.splice(prev.indexOf(idx), 1);
        return [...prev];
      });
      setSelectedTagDataList((prev) => {
        delete prev[idx];
        return { ...prev };
      });

      //* 태그목록 갱신
      setTagList((prev) => {
        prev[idx] = tagData;
        return { ...prev };
      });
    }
  };

  /**
   * * 게시글 업로드
   */
  const uploadPost = async () => {
    const markDown = editorRef.current.getInstance().getMarkdown();

    if (!subject) return alert("제목을 입력해주세요.");

    const altText = thumbnailAlt ? thumbnailAlt : `${subject} 썸네일 이미지`;
    const { url, alt } = await uploadImage(thumbnailFile, altText);

    const body = {
      markDown,
      subject,
      user,
      checkAuth: true,
      tags: selectedTagList,
      thumbnail: url,
      thumbnailAlt: alt,
    };

    try {
      await axios.post("/apis/posts/", body).then((data) => {
        const { postIdx } = data.data;

        navigate(`/post/${postIdx}`);
      });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  /**
   * * 게시글 수정
   */
  const updatePost = async () => {
    const markDown = editorRef.current.getInstance().getMarkdown();

    if (!subject) return alert("제목을 입력해주세요.");

    const body = {
      markDown,
      subject,
      user,
      tags: selectedTagList,
      checkAuth: true,
    };

    try {
      await axios.put(`/apis/posts/${postIdx}`, body);

      navigate(`/post/${postIdx}`);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    (async function () {
      const getTagListRes = await getTagList();

      let selectedTagDataRes = [],
        postSubject = "",
        postContent = "",
        postThumbnail = "";
      if (params.mode === "edit") {
        const postDataRes = await getPost(Number(postIdx));

        selectedTagDataRes = postDataRes[0].tags;
        postSubject = postDataRes[0].subject;
        postContent = postDataRes[0].content;
      }

      //* 사용중인 태그는 태그목록에서 제외
      const selectedTagDataTmp = {};
      for (const selectedTagIdx of selectedTagDataRes) {
        selectedTagDataTmp[selectedTagIdx] = {
          ...getTagListRes[selectedTagIdx],
        };

        delete getTagListRes[selectedTagIdx];
      }

      //* 태그목록
      setTagList(getTagListRes);

      //* 적용중인 게시글설정 - 게시글 수정중 새글작성 페이지 이동시 초기화 위해 수정중아닐때도 설정
      setSelectedTagDataList(selectedTagDataTmp);
      setSelectedTagList(selectedTagDataRes);
      setSubject(postSubject);
      setContent(postContent);
      setThumbnail(postThumbnail);

      setTagListLoading(false);
      setLoading(false);
    })();
  }, [location.search, params.mode, postIdx]);

  return loading ? null : (
    <EditorWrapSt className="editorWrap">
      <h2 className="subTitle">게시글 작성</h2>

      <PostSettingsWrap className="postSettingWrap">
        <ThumbnailSettingWrap className="thumbnailSettingWrap">
          <p className="smallTitle">썸네일 설정</p>
          <label htmlFor="postThumbnailInput">
            <ThumbnailInputLabelSt>
              <ThumbnailPreviewWrapSt>
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt={thumbnailAlt} />
                ) : null}
              </ThumbnailPreviewWrapSt>
            </ThumbnailInputLabelSt>
          </label>
          <input
            id="postThumbnailInput"
            className="disNone"
            type="file"
            value={thumbnail || ""}
            onChange={thumbnailHandler}
          />
          <ThumbnailAltInputWrap>
            <p className="normalText">썸네일 설명 :</p>
            <Input
              type="text"
              value={thumbnailAlt}
              onChange={thumbnailAltHandler}
            />
          </ThumbnailAltInputWrap>
        </ThumbnailSettingWrap>

        {/* //* 태그 설정 */}
        <TagSettingWrap className="tagSettigWrap">
          <p className="smallTitle">태그 설정</p>

          {/* //* 태그 검색 */}
          <TagSearchWrapSt>
            <Input placeholder="검색할 단어 입력 후 엔터 혹은 검색버튼을 클릭하세요." />
            <Button text="검색" />
          </TagSearchWrapSt>

          {/* //* 태그 목록 */}
          <TagListSt className="mb10 scroll">
            {tagListLoading
              ? null
              : Object.entries(tagList).map((tagData) => {
                  //TODO 권한 확인
                  const tagIdx = tagData[0];
                  const { auth, name: tagName } = tagData[1];

                  return (
                    <TagItemSt
                      key={tagIdx}
                      onClick={(e) => {
                        selectedTagListHandler(e, "add");
                      }}
                      data-idx={tagIdx}
                    >
                      <p className="caption">{tagName}</p>
                    </TagItemSt>
                  );
                })}
          </TagListSt>

          {/* //* 선택된 태그 */}
          <SelectedTagListWrapSt>
            <p className="normalText">선택된 태그 :</p>
            <SelectedTagListSt className="scroll">
              {tagListLoading
                ? null
                : Object.entries(selectedTagDataList).map((selectedTagData) => {
                    const tagIdx = selectedTagData[0];
                    const { name: tagName } = selectedTagData[1];

                    return (
                      <TagItemSt
                        key={tagIdx}
                        onClick={(e) => {
                          selectedTagListHandler(e, "minus");
                        }}
                        data-idx={tagIdx}
                        data-name={tagName}
                      >
                        <p className="caption">{tagName}</p>
                      </TagItemSt>
                    );
                  })}
            </SelectedTagListSt>
          </SelectedTagListWrapSt>
        </TagSettingWrap>
      </PostSettingsWrap>

      {/* //* 제목 설정 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 className="smallTitle">제목 :</h3>
        <Input style={{ flex: 1 }} onChange={subjectHandler} value={subject} />
      </div>

      {/* //* mark down editor */}
      <EditorContainerSt className="scroll" style={{ wordBreak: "break-word" }}>
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
          initialValue={content}
          hooks={{
            addImageBlobHook: async (file, callback) => {
              const altText = document.getElementById(
                "toastuiAltTextInput"
              ).value;

              if (!altText) return alert("이미지 설명을 입력해주세요.");

              const { url, alt } = await uploadImage(file, altText);

              callback(url, alt);
            },
          }}
        />
      </EditorContainerSt>

      {/* //* save button */}
      <Button
        text="Save"
        style={{ alignSelf: "end" }}
        onClick={params.mode === "new" ? uploadPost : updatePost}
      />
    </EditorWrapSt>
  );
}

const EditorWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;
`;
const PostSettingsWrap = styled.div`
  display: flex;
  gap: 20px;

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`;
const ThumbnailSettingWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;
const ThumbnailInputLabelSt = styled.div`
  padding-top: 55%;
  position: relative;
`;
const ThumbnailPreviewWrapSt = styled.div`
  width: 100%;
  height: 100%;
  border: 1px dashed #eee;
  position: absolute;
  left: 0;
  top: 0;

  & > img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;
const ThumbnailAltInputWrap = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > input {
    flex: 1;
  }
`;
const TagSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  flex-wrap: wrap;
  align-items: strat;
  align-content: start;
  gap: 14px;

  padding: 14px;
  height: 80px;
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

  & > .normalText {
    white-space: nowrap;
  }
`;
const SelectedTagListSt = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
  gap: 14px;

  max-height: 80px;
`;
const EditorContainerSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default PostEditor;
