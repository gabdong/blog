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

function PostEditor() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const user = useSelector((store) => store.user.idx);

  //* 제목, 내용
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  //* 태그
  const [tagList, setTagList] = useState([]);
  const [tagListLoading, setTagListLoading] = useState(true);
  const [selectedTagList, setSelectedTagList] = useState([]);
  const [selectedTagDataList, setSelectedTagDataList] = useState({});

  //* 썸네일
  const [thumbnailFile, setThumbnailFile] = useState(""); // 저장용
  const [thumbnailPreview, setThumbnailPreview] = useState(""); // 미리보기용
  const [thumbnail, setThumbnail] = useState(""); // input value용
  const [thumbnailAlt, setThumbnailAlt] = useState("");
  
  const [publicPost, setPublicPost] = useState('Y');
  const [loading, setLoading] = useState(true);

  const postIdx =
    params.mode === "edit"
      ? Number(new URLSearchParams(location.search).get("post"))
      : null;

  const toolbarItems = [
    ["heading", "bold"],
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
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        setThumbnailPreview(e.target.result);
      };

      setThumbnail(e.target.value);
      setThumbnailFile(e.target.files[0]);
    } else {
      setThumbnail("");
    }
  };

  //* 썸네일 alt handler
  const thumbnailAltHandler = (e) => {
    setThumbnailAlt(e.target.value);
  };

  //* 선택된 태그 리스트 handler
  const selectedTagListHandler = (e, mode) => {
    const idx = Number(e.currentTarget.dataset.idx);

    if (mode === "add") { //* 태그 선택
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
    } else { //* 태그 해제
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

    let url, alt;
    if (thumbnailFile) {
      const altText = thumbnailAlt ? thumbnailAlt : `${subject} 썸네일 이미지`;
      const uploadImageRes = await uploadImage(thumbnailFile, altText);

      url = uploadImageRes.url;
      alt = uploadImageRes.alt;
    }

    const body = {
      markDown,
      subject,
      user,
      tags: selectedTagList,
      thumbnail: url,
      thumbnailAlt: alt,
      checkAuth: true,
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

    let url, alt;
    if (thumbnailFile) {
      const altText = thumbnailAlt ? thumbnailAlt : `${subject} 썸네일 이미지`;
      const uploadImageRes = await uploadImage(thumbnailFile, altText);

      url = uploadImageRes.url;
      alt = uploadImageRes.alt;
    } else if (params.mode === "edit" && thumbnailPreview && !thumbnail) {
      //* 수정이면서 썸네일 변경 없을경우
      url = thumbnailPreview;
      alt = thumbnailAlt;
    }

    const body = {
      markDown,
      subject,
      user,
      tags: selectedTagList,
      thumbnail: url,
      thumbnailAlt: alt,
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
        postThumbnail = "",
        postThumbnailAlt = "";
      if (params.mode === "edit") {
        const postDataRes = await getPost(Number(postIdx));

        selectedTagDataRes = postDataRes[0].tags;
        postSubject = postDataRes[0].subject;
        postContent = postDataRes[0].content;
        postThumbnail = postDataRes[0].thumbnail;
        postThumbnailAlt = postDataRes[0].thumbnailAlt;
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
      setThumbnailPreview(postThumbnail);
      setThumbnailAlt(postThumbnailAlt);

      setTagListLoading(false);
      setLoading(false);
    })();
  }, [location.search, params.mode, postIdx]);

  return loading ? null : (
    <EditorWrapSt className="editorWrap">
      <h2 className="subTitle">게시글 작성</h2>

      <PostSettingsWrapSt className="postSettingWrap">
        <ThumbnailSettingWrapSt className="thumbnailSettingWrap">
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
          <ThumbnailAltInputWrapSt>
            <p className="normalText">썸네일 설명 :</p>
            <Input
              type="text"
              value={thumbnailAlt || ""}
              onChange={thumbnailAltHandler}
              placeholder="같은 이미지의 설명글은 수정할 수 없습니다."
            />
          </ThumbnailAltInputWrapSt>
        </ThumbnailSettingWrapSt>

        <PostSettingsRightWrapSt>
          {/* //* 태그 설정 */}
          <TagSettingWrapSt className="tagSettigWrap">
            <p className="smallTitle">태그 설정</p>

            {/* //* 태그 검색 */}
            <TagSearchWrapSt>
              <Input placeholder="단어 입력 후 엔터 혹은 검색버튼 클릭" />
              <Button text="검색" />
            </TagSearchWrapSt>

            {/* //* 태그 목록 */}
            <TagListSt className="scroll">
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
          </TagSettingWrapSt>

          <PublicSettingWrapSt>
            <p className="smallTitle">공개 여부</p>
            <input type="radio" name="public" id="publicY"/>
            <label for="publicY">공개</label>
            <input type="radio" name="public" id="publicN"/>
            <label for="publicY">비공개</label>
          </PublicSettingWrapSt>
        </PostSettingsRightWrapSt>
      </PostSettingsWrapSt>

      {/* //* 제목 설정 */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h3 className="smallTitle">제목 :</h3>
        <Input
          style={{ flex: 1 }}
          onChange={subjectHandler}
          value={subject || ""}
        />
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
          onKeyup={() => {
              //* undo / redo
              let timeout;
              if(window.event.keyCode === 90 && window.event.ctrlKey) {
                timeout = setTimeout(() => {
                  editorRef.current.getInstance().exec("undo");
                }, 150);
              }
              if (window.event.keyCode === 90 && window.event.ctrlKey && window.event.shiftKey) {
                clearTimeout(timeout);
                editorRef.current.getInstance().exec("redo");
              }
            }
          }
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
const PostSettingsWrapSt = styled.div`
  display: flex;
  gap: 20px;

  @media all and (max-width: 767px) {
    flex-direction: column;
  }
`;

//* 썸네일 설정영역
const ThumbnailSettingWrapSt = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
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
const ThumbnailAltInputWrapSt = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & > input {
    flex: 1;
  }
`;

//* 설정영역 우측
const PostSettingsRightWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
`;

//* 태그 설정영역
const TagSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 14px;
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

//* 공개여부 설정영역
const PublicSettingWrapSt = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

//* 에디터
const EditorContainerSt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default PostEditor;
