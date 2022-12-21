import axios from "axios";

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // const accessToken = config.headers.Authorization;
    console.log(config);
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
