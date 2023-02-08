import axios from "axios";
import Cookies from 'js-cookie';

import { memoizedRefreshToken } from "./refreshToken";
import { logout } from "../auth";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (!config?.sent) {
        config.sent = true;

        const result = await memoizedRefreshToken();

        if (result?.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `bearer ${result.accessToken}`
          };
        }

        return axiosInstance(config);
      } else {
        const message = 'You are either not autorized to access this platform or your session has expired. Please login again.';
        Cookies.set('err', message);
        logout();
      }
    }
    return Promise.reject(error);
  }
);
