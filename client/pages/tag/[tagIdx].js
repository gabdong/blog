import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import PostList from "@/components/PostList";
import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { loginUser } from "@/store/modules/user";
import { useEffect } from "react";

export default function Tag({ pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { userData } = pageProps;
  const { tagIdx, page } = router.query;

  useEffect(() => {
    if (userData && userData.isLogin) dispatch(loginUser(userData));
  }, [userData]);

  return <PostList tagIdx={tagIdx} page={page} />;
}

export const getServerSideProps = ssrRequireAuthentication();
