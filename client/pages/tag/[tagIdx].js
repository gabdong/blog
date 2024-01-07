import { ssrRequireAuthentication } from "@/lib/utils/utils";

import PostList from "@/components/PostList";

/**
 * * 태그에 속한 게시글리스트
 * @param {Object} props
 * @param {Object} props.pageProps
 * @param {Object} props.pageProps.userData - 로그인한 유저 정보
 * @param {Object} props.pageProps.urlParams - url 정보
 * @returns {JSX.Element} 게시글 리스트
 */
export default function Tag({ pageProps }) {
  const {
    urlParams: { tagIdx, page },
  } = pageProps;

  return <PostList tagIdx={tagIdx} page={page} />;
}

export const getServerSideProps = ssrRequireAuthentication();
