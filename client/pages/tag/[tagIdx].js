import PostList from "@/components/PostList";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { setUser } from "@/lib/apis/tokens";

export default function Tag({ pageProps }) {
  const { userData, urlParams } = pageProps;
  const { tagIdx, page } = urlParams;

  setUser(userData);

  return <PostList tagIdx={tagIdx} page={page} />;
}

export const getServerSideProps = ssrRequireAuthentication();
