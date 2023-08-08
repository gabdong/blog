import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";

/**
 * * CSR component 권한 확인
 * @param {Component} Component
 */
const WithAuthorization = (Component) => (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      if (router.isReady && !user.isLogin) {
        const userData = await checkLogin();

        if (userData && userData.isLogin) {
          dispatch(loginUser(userData));
        } else {
          router.push("/?tabItem=latestPostList");
        }
      }
    })();
  }, [router.isReady, user.isLogin]);

  return <>{!router.isReady ? null : <Component {...props} />}</>;
};

export default WithAuthorization;
