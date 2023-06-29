import axios from "axios";

import { checkToken } from "../apis/tokens";

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

//* axios instance로 token 검증 요청시 무한루프 문제가 생겨 token검증용 axios instance 생성
export const authCheckAxios = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    if (!config.data) return config;

    let checkAuth, // 로그인 판별여부
      isFormData = false; // config에 FormData가 있는지 판별 -> user 값 넣는 방법 다름

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";

      checkAuth = config.data.get("checkAuth") === "true";
      isFormData = true;
    } else {
      config.headers["Content-Type"] = "application/json";

      checkAuth = config.data.checkAuth;
    }

    if (checkAuth === true) {
      //* check auth
      const checkAuthResult = await checkToken();

      const { newAccessToken } = checkAuthResult.data;
      const { user } = checkAuthResult.data;

      if (isFormData) {
        config.data.append("user", JSON.stringify(user));
      } else {
        config.data.user = user;
      }

      if (newAccessToken) {
        authCheckAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      }
    }

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;