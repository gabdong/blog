import axios from "axios";
import store from "./store";
import { checkToken } from "../apis/auth";

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config) => {
    const {checkAuth} = config.data;

    if (checkAuth === true) {
      const {accessToken} = store.getState().user;
      console.log(accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const checkAuthResult = await checkToken();

      console.log(checkAuthResult);

      return config;
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
