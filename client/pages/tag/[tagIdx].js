import PostList from "@/components/PostList";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { setReduxUser } from "@/lib/apis/tokens";

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
    userData,
    urlParams: { tagIdx, page },
  } = pageProps;

  setReduxUser(userData);

  return <PostList tagIdx={tagIdx} page={page} />;
}

export const getServerSideProps = ssrRequireAuthentication();
