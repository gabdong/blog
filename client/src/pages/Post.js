import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";

import { getPost } from "../apis/posts";

function Post() {
  const params = useParams();
  const user = useSelector((store) => store.user);
  const { postIdx } = params;
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  let subject, content, memberIdx, memberName, updateDatetime;
  if (!loading) {
    subject = postData[0].subject;
    content = postData[0].content;
    memberIdx = postData[0].member;
    memberName = postData[0].name;
    updateDatetime = postData[0].updateDatetime;
  }

  useEffect(() => {
    (async function () {
      setPostData(await getPost(postIdx));
      setLoading(false);
    })();
  }, [postIdx]);

  return loading ? null : (
    <div className="scroll h100">
      <h2 className="headline mb20">{subject}</h2>

      <div style={{display: "flex", justifyContent: "space-between"}}>
        <PostInfoWrapSt>
          <h3 className="subTitle">{memberName}</h3>
          <p className="normalText">{new Date(updateDatetime).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })}</p>
        </PostInfoWrapSt>
        {memberIdx !== user?.idx ? null : (
          <PostButtonWrapSt>
              <p className="buttonText">수정</p>
              <p className="buttonText">삭제</p>
          </PostButtonWrapSt>
        )}
      </div>

      <Viewer
        initialValue={content}
        plugins={[[codeSyntax, { highlighter: Prism }]]}
      />
    </div>
  );
}

const PostInfoWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const PostButtonWrapSt = styled.div`
  display: flex;
  gap: 8px;

  & > .buttonText {
    cursor: pointer;
    transition: var(--transition);
  }

  & > .buttonText:hover {
    color: var(--primary-color);
  }
`;

export default Post;
