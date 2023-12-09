import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getTagList } from "@/lib/apis/tags";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { getPost } from "@/lib/apis/posts";
import { loginUser } from "@/store/modules/user";
import { setReduxUser } from "@/lib/apis/tokens";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  const router = useRouter();
  const { type: postType } = router.query;
  const { userData } = pageProps;

  setReduxUser(userData);

  const postIdx = router.query.post;
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);

  /**
   * 제목, 내용, 태그 -> state
   */
  useEffect(() => {
    (async () => {
      //* 로그인 안했을경우 게시글 작성불가
      if (!userData.isLogin) router.push("/tabItem=lastPostList");

      const getTagListRes = await getTagList();
      const { data: tagDataRes } = getTagListRes;

      if (postType === "edit") {
        const postDataRes = await getPost(Number(postIdx));

        setSubject(postDataRes.subject);
        setContent(postDataRes.content);
        setSelectedTag(postDataRes.tags);
      }

      console.log(tagDataRes);
    })();
  }, [postIdx]);

  console.log(subject);
  console.log(content);
  console.log(selectedTag);

  return !router.isReady ? null : <EditorWrapSt></EditorWrapSt>;
}

const EditorWrapSt = styled.article`
  display: flex;
  gap: 10px;

  width: 100%;
`;

export const getServerSideProps = ssrRequireAuthentication();
