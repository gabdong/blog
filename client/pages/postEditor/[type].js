import { useState } from "react";
import styled from "styled-components";

import { ssrRequireAuthentication } from "@/lib/utils/ssrRequireAuthentication";
import { getPost } from "@/lib/apis/posts";
import { getSearchTag } from "@/lib/apis/tags";
import useInput from "@/lib/hooks/useInput";

import Editor from "@/components/Editor";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  const {
    gsspProps: { postData },
  } = pageProps;

  const postIdx = postData?.idx ?? "";
  const [subject, subjectHandler] = useInput(postData?.subject ?? "");
  const [content, setContent] = useState(postData?.content ?? "");
  const [selectedTag, setSelectedTag] = useState([]);

  return (
    <EditorWrapSt>
      <Input
        defaultValue={subject}
        onChange={subjectHandler}
        border="bottom"
        style={{
          color: "var(--gray-l)",
        }}
        placeholder="제목"
      />
      <SearchInput
        searchFunc={(searchWord) => getSearchTag(searchWord)}
        border="bottom"
        style={{
          color: "var(--gray-l)",
        }}
        placeholder="태그추가"
      />

      <Editor value={content} onChange={setContent} height="500" />

      <ButtonWrapSt>
        <Button text="취소" />
        <SaveButtonWrapSt>
          <Button text="임시저장" />
          <Button text="저장" style={{ background: "var(--primary-color)" }} />
        </SaveButtonWrapSt>
      </ButtonWrapSt>
    </EditorWrapSt>
  );
}

const EditorWrapSt = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`;
const ButtonWrapSt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;
const SaveButtonWrapSt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
