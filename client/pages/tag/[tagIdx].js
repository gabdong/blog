import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";

import PostList from "@/components/PostList";
import WithAuthorization from "@/components/WithAuthorization";

function Tag({tagIdx, page}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((store) => store.user);
  // const [tagIdx, setTagIdx] = useState();
  // const [page, setPage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);

    if (router.isReady) {
      // setTagIdx(router.query.tagIdx);
      // setPage(router.query.page);

      (async () => {
        // const userData = await checkLogin();
        // if (userData && Object.keys(userData).length > 0) {
        //   dispatch(loginUser(userData));
        // } 
        // else {
        //   if (router.query.tagIdx == "private")
        //     router.push("/?tabItem=latestPostList");
        // }

        // setLoading(false);
      })();
    }
  }, [router.query.tagIdx]);

  return (
    <>
      {/* {!page || !tagIdx || loading ? null : ( */}
        <PostList tagIdx={tagIdx} page={Number(page)} limit={9} />
      {/* )} */}
    </>
  );
}

export default WithAuthorization(Tag);