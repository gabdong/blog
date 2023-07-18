import { checkLogin } from "@/lib/apis/tokens";
import { loginUser } from "@/store/modules/user";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WithAuthorization = (Component) => {
  return () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

    useEffect(() => {
      (async () => {

      })();
    }, [ user.isLogin, router.query.tagIdx, router.query.tag, router.query.page]);

    const tagIdx = router.query.tagIdx;
    const tag = router.query.tag;
    const page = router.query.page;
    const props = { tagIdx, tag, page };

    return <>
      {!router.isReady ? null : <Component {...props} />}
    </>
  }
}

export default WithAuthorization;