import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { getPost } from "@/lib/apis/posts";
import useInput from "@/lib/hooks/useInput";
import Editor from "@/components/Editor";
import Input from "@/components/Input";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  const postData = pageProps.gsspProps.postData;

  const postIdx = postData?.idx;
  const [subject, subjectHandler] = useInput(postData?.subject ?? "");
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTag, setSelectedTag] = useState([]);
  const contentHandler = useCallback((value) => {
    setContent(value);
  }, []);

  return (
    <EditorWrapSt>
      <Input defaultValue={subject} onChange={subjectHandler} />
      <Editor value={content} onChange={contentHandler} />
    </EditorWrapSt>
  );
}

const EditorWrapSt = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

export const getServerSideProps = ssrRequireAuthentication(
  async (ctx, user) => {
    const { type } = ctx.params;

    if (type != "edit") return {};

    const postIdx = ctx.query.post;
    const postData = await getPost({ postIdx, ssr: true, user });

    //* error
    if (postData.status) return { redirect: `/${postData.status}` };

    return { postData };
  }
);
