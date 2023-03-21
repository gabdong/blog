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

import { getPost } from "../apis/posts";
import axios from "../utils/axios";
import MetaTag from "../components/MetaTag/MetaTag";

function Post() {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);
  const [postDataRes, setPostData] = useState({});

  //* 게시글 정보
  const { postIdx } = params;
  let postData = {};
  if (!loading) {
    postData = { ...postDataRes[0] };
    postData.removeMdContent = removeMd(
      postData.content.replace(/<\/?[^>]+(>|$)/g, "")
    );

    if (postData.content.length > 200)
      postData.content = postData.content.substring(0, 200);
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
      <MetaTag subject={postData.subject} desc={postData.removeMdContent} />

      <PostWrapSt className="h100">
        <h2 className="headline">{postData.subject}</h2>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <PostInfoWrapSt>
            <h3 className="subTitle">{postData.memberName}</h3>
            <p className="normalText">
              {new Date(postData.updateDatetime).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
          </PostInfoWrapSt>
          {postData.memberIdx !== user?.idx ? null : (
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

        <ThumbnailWrap>
          <img src={postData.thumbnail} alt="게시글 썸네일" />
        </ThumbnailWrap>

        <Viewer
          initialValue={postData.content}
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
const ThumbnailWrap = styled.div`
  width: 100%;
  text-align: center;

  & img {
    max-width: 50%;
  }

  @media all and (max-width: 479px) {
    & img {
      max-width: 90%;
    }
  }
`;

export default Post;
