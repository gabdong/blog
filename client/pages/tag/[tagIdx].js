import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";

import PostList from "@/components/PostList";

export default function Tag({ pageProps }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { page, tagIdx, user } = pageProps;

  useEffect(() => {
    if (router.isReady) {
      if (user) {
        dispatch(loginUser(user));
      } else {
        if (router.query.tagIdx == 'private') router.push('/?tabItem=latestPostList');
      }
    }
  }, [router.isReady]);

  return (
    <>
      {!page || !tagIdx ? null : (
        <PostList tagIdx={tagIdx} page={Number(page)} limit={9} />
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const { page, tagIdx } = query;
  const user = await checkLogin(true, ctx.req.headers?.cookie);

  return { props: { page, tagIdx, user } };
}
