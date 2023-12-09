import { getPost } from "@/lib/apis/posts";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { setReduxUser } from "@/lib/apis/tokens";
import markdownToHtml from "@/lib/utils/markdownToHtml";
import sanitizeHtml from "@/lib/utils/sanitizeHtml";

import PostContent from "@/components/PostContent";

/**
 * * 게시글
 * @param {Object} props
 * @param {Object} props.pageProps
 * @param {Object} props.pageProps.userData - 로그인한 유저정보
 * @param {Object} props.pageProps.gsspProps - 게시글idx, 게시글정보
 * @returns {JSX.Element} 게시글 component
 */
export default function Post({ pageProps }) {
  const { userData } = pageProps;
  const { postIdx, postData } = pageProps.gsspProps;

  setReduxUser(userData);

  return <PostContent postIdx={postIdx} postData={postData} />;
}

export const getServerSideProps = ssrRequireAuthentication(async (ctx) => {
  const { postIdx } = ctx.params;

  if (!postIdx) return {};

  const postData = await getPost(postIdx, true);

  //* error
  if (postData.status) return { redirect: `/${postData.status}` };

  const html = await markdownToHtml(postData.content);
  postData.html = sanitizeHtml(html);

  return { postIdx, postData };
});
