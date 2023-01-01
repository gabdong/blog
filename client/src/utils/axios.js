import axios from "axios";
import store from "./store";
import { checkToken } from "../apis/auth";

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    if (!config.data) return config;

    const { checkAuth } = config.data;

    if (checkAuth === true) {
      let { accessToken } = store.getState().user;

      if (accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      //g check auth
      const checkAuthResult = await checkToken();
      const { status, msg } = checkAuthResult;

      if (status === 200) {
        const { newAccessToken } = checkAuthResult.data;

        if (newAccessToken)
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        return config;
      } else if (status === 401) {
        const authError = new Error(msg);
        authError.code = 401;

        throw authError;
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
