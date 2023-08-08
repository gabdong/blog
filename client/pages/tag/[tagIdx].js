import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import PostList from "@/components/PostList";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { loginUser } from "@/store/modules/user";

export default function Tag({pageProps}) {
  const dispatch = useDispatch();
  const { userData } = pageProps;

  if (userData && userData.isLogin) dispatch(loginUser(userData));

  const router = useRouter();
  const { tagIdx, page } = router.query;

  return <PostList tagIdx={tagIdx} page={page} />;
}

export const getServerSideProps = ssrRequireAuthentication();