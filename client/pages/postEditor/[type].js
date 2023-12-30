import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { getTagList } from "@/lib/apis/tags";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { getPost } from "@/lib/apis/posts";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  console.log(pageProps);
  const { postData } = pageProps;
  const router = useRouter();

  // console.log(postData);
  const postIdx = router.query.post;
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);

  // console.log(subject);
  // console.log(content);
  // console.log(selectedTag);

  return !router.isReady ? null : <EditorWrapSt></EditorWrapSt>;
}

const EditorWrapSt = styled.article`
  display: flex;
  gap: 10px;

  width: 100%;
`;

export const getServerSideProps = ssrRequireAuthentication(
  async (ctx, user) => {
    const { type } = ctx.params;

    if (type != "edit") return {};

    const postData = await getPost({ postIdx, ssr: true, user });

    //* error
    if (postData.status) return { redirect: `/${postData.status}` };

    return { postData };
  }
);
