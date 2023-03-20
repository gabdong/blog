import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Prism from "prismjs";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-clojure";
import codeSyntax from "@toast-ui/editor-plugin-code-syntax-highlight";
import removeMd from "remove-markdown";
import { Viewer } from "@toast-ui/react-editor";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { getPost } from "../apis/posts";
import axios from "../utils/axios";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({});

  //* 게시글 정보
  const { postIdx } = params;
  let subject, content, memberIdx, memberName, updateDatetime, removeMdContent;
  if (!loading) {
    subject = postData[0].subject;
    content = postData[0].content;
    memberIdx = postData[0].member;
    memberName = postData[0].name;
    updateDatetime = postData[0].updateDatetime;
    removeMdContent = removeMd(content.replace(/<\/?[^>]+(>|$)/g, ""));

    if (removeMdContent.length > 200)
      removeMdContent = removeMdContent.substring(0, 200);
  }

  /**
   * * 게시글 삭제
   */
  const deletePost = async () => {
    if (!window.confirm("게시글 삭제를 진행하시겠습니까?")) return;

    try {
      await axios.delete(`/apis/posts/${postIdx}`);

      navigate(`/`);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    (async function () {
      setPostData(await getPost(postIdx));
      setLoading(false);
    })();
  }, [postIdx]);

  return loading ? null : (
    <>
      <Helmet>
        <title>{subject}</title>
        <meta name="title" content={subject} />
        <meta name="description" content={removeMdContent} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={subject} />
        <meta property="og:description" content={removeMdContent} />
        {/* <meta property="og:url" content="https://metatags.io/" /> */}
        {/* <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}

        <meta property="twitter:title" content={subject} />
        <meta property="twitter:description" content={removeMdContent} />
        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        {/* <meta property="twitter:url" content="https://metatags.io/" /> */}
        {/* <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" /> */}
      </Helmet>

      <PostWrapSt className="h100">
        <h2 className="headline">{subject}</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PostInfoWrapSt>
            <h3 className="subTitle">{memberName}</h3>
            <p className="normalText">
              {new Date(updateDatetime).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </PostInfoWrapSt>
          {memberIdx !== user?.idx ? null : (
            <PostButtonWrapSt>
              <NavLink
                className="buttonText"
                to={`/postEditor/edit?post=${postIdx}`}
              >
                수정
              </NavLink>
              <NavLink className="buttonText" onClick={deletePost}>
                삭제
              </NavLink>
            </PostButtonWrapSt>
          )}
        </div>

        <Viewer
          initialValue={content}
          plugins={[[codeSyntax, { highlighter: Prism }]]}
        />
      </PostWrapSt>
    </>
  );
}

const PostWrapSt = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-right: 20px;

  @media screen and (max-width: 479px) {
    padding-right: 0px;
  }
`;
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
