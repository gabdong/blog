import { checkLogin } from "@/lib/apis/tokens";
import wrapper from "@/store/configureStore";

/**
 * * SSR 권한확인
 * @detail 로그인여부 확인 후 url에 private가 포함되어있을경우 메인으로 redirect시키고, 로그인시 callback fn의 결과값을 userData, urlParams와 함께 return해주는 함수
 * @param {Function} gssp - getServerSideProps funciton
 * @returns {Object} { props: { userData, gsspProps, urlParams: { ...query } } }
 */
export function ssrRequireAuthentication(gssp = null) {
  return wrapper.getServerSideProps((store) => async (ctx) => {
    const {
      query,
      req: { url },
    } = ctx;
    const userData = await checkLogin(true, ctx.req.headers?.cookie);

    //* private page로 접근시 로그인 확인
    const privatePages = ["private", "settings", "postEditor"];
    for (const privateKey of privatePages) {
      if (url.includes(privateKey) && (!userData || !userData.isLogin)) {
        return {
          redirect: {
            destination: "/?tabItem=latestPostList",
          },
          props: {},
        };
      }
    }

    //TODO userdata redux dispatch
    const gsspProps = typeof gssp == "function" ? await gssp(ctx) : null;

    //* getServerSideProps 함수에서 redirect 있을경우
    if (gsspProps && gsspProps.redirect) {
      return {
        redirect: {
          destination: gsspProps.redirect,
        },
        props: {},
      };
    }
    return { props: { userData, gsspProps, urlParams: { ...query } } };
  });
}
