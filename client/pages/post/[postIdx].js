import { getPost } from "@/lib/apis/posts";
import { ssrRequireAuthentication } from "@/lib/utils/ssrRequireAuthentication";
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
  const {
    user,
    gsspProps: { postIdx, postData },
  } = pageProps;

  return <PostContent postIdx={postIdx} postData={postData} user={user} />;
}

export const getServerSideProps = ssrRequireAuthentication(
  async (ctx, user) => {
    const { postIdx } = ctx.params;

    if (!postIdx)
      return {
        redirect: "/404",
      };

    const postData = await getPost({ postIdx, user });

    //* error
    if (postData.status) {
      switch (postData.status) {
        case 404:
          return { redirect: `/${postData.status}` };
        case 401:
          return { redirect: `/${postData.status}` };
      }
    }

    const html = await markdownToHtml(postData.content);
    postData.html = sanitizeHtml(html);

    return { postIdx, postData };
  }
);
