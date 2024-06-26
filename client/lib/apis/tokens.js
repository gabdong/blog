/**
 * @info 로그인 권한 등 관리 api
 */
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from "@/lib/utils/axios";
import { loginUser } from "@/store/modules/user";

/**
 * * set redux user data
 * @param {Object} userData
 */
export function setReduxUser(userData) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData.isLogin) dispatch(loginUser(userData));
  }, [userData]);
}

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
 * @param {String} cookie
 * @return status, user 정보, check auth result
 */
export async function checkToken(ssr = false, cookie = "") {
  if (cookie) axios.defaults.headers.cookie = cookie;

  try {
    const url = ssr
      ? `${process.env.REACT_APP_SERVER_URL}/apis/tokens/check-token`
      : "/apis/tokens/check-token";
    const result = await axios.get(url, {
      data: { isCheckToken: true },
    });

    return result;
  } catch (err) {
    switch (err.response.status) {
      case 401:
        console.error(err.response?.data.msg);
        break;
      default:
        console.error(err.response?.data.msg);
    }
  }
}

/**
 * * 로그인 확인 후 redux user data return
 * @param {Object} ctx
 * @return {Object} user
 */
export const checkLogin = async (ssr = false, cookie = "") => {
  let user = null;

  try {
    const authCheck = await checkToken(ssr, cookie);

    if (authCheck) {
      const accessToken = authCheck.data.newAccessToken;
      user = { ...authCheck.data.user };
      user.accessToken = accessToken;
      user.isLogin = true;
    }

    return user;
  } catch (err) {
    console.error(err.message);
  }
};
