import { checkLogin } from "@/lib/apis/tokens";

/**
 * * SSR 권한확인
 * @detail 로그인여부 확인 후 url에 private가 포함되어있을경우 메인으로 redirect시키고, callback fn의 결과값을 userData, urlParams와 함께 return해주는 함수
 * @param {Function} gssp - getServerSideProps funciton
 * @returns {Object} { props: { userData, gsspProps, urlParams: { ...query } } }
 */
export function ssrRequireAuthentication(gssp = null) {
  return async (ctx) => {
    const { query, req: { url } } = ctx;
    const userData = await checkLogin(true, ctx.req.headers?.cookie);

    //* url에 private가 존재하면서 비로그인상태일경우 메인으로 redirect
    if (url.includes("private") && (!userData || !userData.isLogin)) {
      return {
        redirect: {
          destination: "/?tabItem=latestPostList",
        },
        props: {},
      };
    }

    const gsspProps = typeof gssp == "function" ? await gssp(ctx) : null;

    return { props: { userData, gsspProps, urlParams: { ...query } } };
  };
}
