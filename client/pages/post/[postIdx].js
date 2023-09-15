import { getPost } from "@/lib/apis/posts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ssrRequireAuthentication } from "@/lib/utils/utils";
import { loginUser } from "@/store/modules/user";

import PostContent from "@/components/PostContent";

export default function Post({ pageProps }) {
  const dispatch = useDispatch();
  const { userData } = pageProps;
  const { postIdx, postData } = pageProps.gsspProps;

  useEffect(() => {
    if (userData && userData.isLogin) dispatch(loginUser(userData));
  }, [userData]);

  return <PostContent postIdx={postIdx} postData={postData} />;
}

export const getServerSideProps = ssrRequireAuthentication(async (ctx) => {
  const { postIdx } = ctx.params;
  const postData = postIdx ? await getPost(postIdx, true) : null;

  return { postIdx, postData };
});
