import { checkLogin } from "@/lib/apis/tokens";
import reduxWrapper from "@/store/configureStore";
import { loginUser } from "@/store/modules/user";

/**
 * * SSR 권한확인
 * @detail 로그인여부 확인 후 url에 private가 포함되어있을경우 메인으로 redirect시키고, 로그인시 callback fn의 결과값을 user, urlParams와 함께 return해주는 함수
 * @param {Function} gssp - getServerSideProps funciton
 * @returns {Object} { props: { user, gsspProps, urlParams: { ...query } } }
 */
export function ssrRequireAuthentication(gssp = null) {
  return reduxWrapper.getServerSideProps((store) => async (ctx) => {
    let {
      query,
      req: { url },
    } = ctx;
    let user = await checkLogin(true, ctx.req.headers?.cookie);
    let prevUser = store.getState().user;

    if (!query) query = {};
    if (!prevUser) prevUser = { isLogin: false };
    if (!user) user = { ...prevUser };
    if (!url) url = "";

    //* 로그인 필요한 페이지 접근시 로그인 확인
    const privatePages = ["private", "settings", "postEditor"];
    for (const privateKey of privatePages) {
      if (url.includes(privateKey) && (!user || !user.isLogin)) {
        return {
          redirect: {
            destination: "/?tabItem=latestPostList",
          },
          props: {},
        };
      }
    }

    //* redux dispatch user data
    if (prevUser.isLogin != user.isLogin) store.dispatch(loginUser(user));

    const gsspProps = typeof gssp == "function" ? await gssp(ctx, user) : null;

    //* getServerSideProps 함수에서 redirect 있을경우
    if (gsspProps && gsspProps.redirect) {
      return {
        redirect: {
          destination: gsspProps.redirect,
        },
        props: {},
      };
    }

    return {
      props: { user, gsspProps, urlParams: { ...query }, url },
    };
  });
}
