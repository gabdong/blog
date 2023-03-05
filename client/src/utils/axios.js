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

    let checkAuth;
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";

      checkAuth = config.data.get("checkAuth");
    } else {
      config.headers["Content-Type"] = "application/json";

      checkAuth = config.data.checkAuth;
    }

    if (checkAuth === true) {
      //* check auth
      const checkAuthResult = await checkToken();
      const { status, msg } = checkAuthResult;

      if (status === 200) {
        const { newAccessToken } = checkAuthResult.data;
        const { user } = checkAuthResult.data;
        config.data.user = user;

        if (newAccessToken) {
          authCheckAxios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        }

        return config;
      } else if (status === 401) {
        const error = new Error(msg);
        error.code = 401;

        throw error;
      }
    }

    return config;
  },
  (err) => {
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
