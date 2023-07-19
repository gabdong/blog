import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * * component 권한 확인
 * @param {Component} Component
 */
const WithAuthorization = (Component) => {
  return () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    useEffect(() => {
      (async () => {
        if (
          router.isReady &&
          (router.query.tagIdx === "private" || router.query.tag === "private")
        ) {
          if (!user.isLogin) {
            const userData = await checkLogin();

            if (userData && userData.isLogin) {
              dispatch(loginUser(userData));
            } else {
              router.push("/?tabItem=latestPostList");
            }
          }
        }
      })();
    }, [router.isReady, user.isLogin]);

    const tagIdx = router.query.tagIdx;
    const tag = router.query.tag;
    const page = router.query.page;
    const props = { tagIdx, tag, page };

    return <>{!router.isReady ? null : <Component {...props} />}</>;
  };
};

export default WithAuthorization;
