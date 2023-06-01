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
 * @param {Booelean} ssr: server side rendering 판별
 * @return status, user 정보, check auth result
 */
export async function checkToken(ssr) {
  try {
    const url = ssr ? `${process.env.REACT_APP_SERVER_URL}apis/tokens/check-token` : '/apis/tokens/check-token';
    const result = await authCheckAxios.get(url);

    return result;
  } catch (err) { //TODO error handling
    const error = new Error(err.response.data.msg);
    error.status = err.response.status;

    throw error;
  }
}
