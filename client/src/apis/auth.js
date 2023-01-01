import authAxios from "../utils/axios";
import axios from "axios";

/**
 * * 로그아웃시 권한을 제거해주는 함수
 */
export function removeAuth() {
  authAxios.delete("/apis/auth");
  authAxios.defaults.headers.common["Authorization"] = "";
}

/**
 * * api요청의 accessToken 유효성을 검사해주는 함수
 *
 * @return status, user 정보, check auth result return
 */
export async function checkToken() {
  try {
    const result = await axios.get("/apis/auth/check-token");

    return result;
  } catch (err) {
    const error = { status: err.response.status, msg: err.response.data.msg };

    return error;
  }
}
