import authAxios from "../utils/axios";
import axios from "axios";

/**
 * * 토큰을 재발급 해주는 함수
 *
 * @returns 요청 결과 상태, 에러메세지, accessToken, userId
 */
export async function refreshAuth() {
  try {
    const res = await authAxios.get("/apis/auth/refresh");
    const { accessToken, user } = res.data;
    const { id } = user;

    return { status: 200, accessToken, id };
  } catch (err) {
    const { status } = err.response;
    const { msg } = err.response.data;

    return { status, msg };
  }
}

/**
 * * 로그아웃시 권한을 제거해주는 함수
 */
export function removeAuth() {
  authAxios.delete("/apis/auth");
  authAxios.defaults.headers.common["Authorization"] = "";
}

/**
 * * api요청의 accessToken 유효성을 검사해주는 함수
 */
export async function verifyToken() {
  try {
    const result = await axios.get("/apis/auth/verify-token");

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
