import { checkLogin } from "@/lib/apis/tokens";

/**
 * * SSR 권한확인
 * @param {Function} gssp
 * @returns {Object}
 */
export function ssrRequireAuthentication(gssp = null) {
  return async (ctx) => {
    const { req, res } = ctx;
    const { url } = req;
    const userData = await checkLogin(true, req.headers?.cookie);

    if (url.includes("private") && (!userData || !userData.isLogin)) {
      return {
        redirect: {
          destination: "/?tabItem=latestPostList",
        },
        props: {},
      };
    }

    const gsspProps = typeof gssp == "function" ? await gssp(ctx) : null;

    return { props: { userData, gsspProps } };
  };
}
