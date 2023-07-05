import { checkToken } from "@/lib/apis/tokens";

/**
 * * 로그인 확인
 * @param {Object} ctx
 */
export const checkLogin = async (ctx = null) => {
  const cookie = ctx ? ctx.req.headers?.cookie : null;

  let user = null;
  try {
    const authCheck = await checkToken(true, cookie);
    if (authCheck) {
      const accessToken = authCheck.data.newAccessToken;
      user = { ...authCheck.data.user };
      user.accessToken = accessToken;
      user.isLogin = true;
    }
    return user;
  } catch (err) {
    console.log(err.message);
  }
};
