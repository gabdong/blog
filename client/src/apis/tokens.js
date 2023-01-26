import axios from "../utils/axios";
import { authCheckAxios } from "../utils/axios";

/**
 * * 로그아웃시 권한을 제거해주는 함수
 */
export function removeToken() {
  axios.delete("/apis/tokens");
  axios.defaults.headers.common["Authorization"] = "";
}

/**
 * * api요청의 accessToken 유효성을 검사, 재발급해주는 함수
 * @return status, user 정보, check auth result
 */
export async function checkToken() {
  try {
    const result = await authCheckAxios.get("/apis/tokens/check-token");

    return result;
  } catch (err) {
    const error = new Error(err.response.data.msg);
    error.code = err.response.status;

    throw error;
  }
}
