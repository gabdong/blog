import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getTagList } from "@/lib/apis/tags";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { getPost } from "@/lib/apis/posts";
import { loginUser } from "@/store/modules/user";
import { setReduxUser } from "@/lib/apis/tokens";
import wrapper from "@/store/configureStore";

/**
 * * 게시글 에디터
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PostEditor({ pageProps }) {
  console.log(pageProps);
  const { postData, userData } = pageProps;
  const router = useRouter();

  setReduxUser(userData);

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

export const getServerSideProps = ssrRequireAuthentication(async (ctx) => {
  const { type } = ctx.params;

  if (type != "edit") return {};

  const postData = await getPost(postIdx, true);

  //* error
  if (postData.status) return { redirect: `/${postData.status}` };

  return { postData };
});
