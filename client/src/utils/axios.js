import axios from "axios";
import { verifyToken } from "../apis/auth";

const instance = axios.create({
  timeout: 1000,
  withCredentials: true,
});

/**
 * * axios 요청만들어주는 함수
 *
 * @param {String} method
 * @param {String} url
 * @param {Object} body
 * @param {Boolean} checkAuth
 */
export function request(method, url, dataToSubmit = {}, checkAuth = false) {
  instance({
    method,
    url,
    data: dataToSubmit,
  });

  if (checkAuth) {
    instance.interceptors.request.use(
      async (config) => {
        // if (!config.headers.Authorization) return config;

        verifyToken();

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
  }
}

// export default request;

export default instance;
