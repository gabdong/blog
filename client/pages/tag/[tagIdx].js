import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { checkLogin } from "@/lib/utils/utils";
import PostList from "@/components/PostList";
import { loginUser } from "@/store/modules/user";

export default function Tag({pageProps}) {
    const dispatch = useDispatch();
  const { page, tagIdx, user } = pageProps;

  useEffect(() => {
    if (user) dispatch(loginUser(user));
  });

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
    const user = await checkLogin(ctx);

    return { props: { page, tagIdx, user } };
}