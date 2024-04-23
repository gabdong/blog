import axios from "axios";

import { checkToken } from "../apis/tokens";

const instance = axios.create({
  timeout: 3000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    if (!config.data) return config;

    const isFormData = config.data instanceof FormData;
    const checkAuth = isFormData
      ? config.data.get("checkAuth") === "true"
      : config.data.checkAuth; // 로그인 판별여부
    const isCheckToken = config.data.isCheckToken || false; // 토큰검증요청 여부
    const ssr = isFormData ? false : config.data.ssr;

    if (checkAuth === true && isCheckToken === false) {
      //* check auth - 권한없을경우 throw error
      const checkAuthResult = await checkToken(ssr);
      const { newAccessToken } = checkAuthResult.data;
      const { user } = checkAuthResult.data;

      if (isFormData) {
        config.data.append("user", JSON.stringify(user));
      } else {
        if (config.method == "get") {
          config.params.user = user;
        } else {
          config.data.user = user;
        }
      }

      if (newAccessToken)
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
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
