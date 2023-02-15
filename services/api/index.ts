import axios from "axios";

import { memoizedRefreshToken } from "./refreshToken";
import errorHandler from "../../utilities/errorHandler";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (!!config?.headers?.authorization && (error?.response?.status === 401 || error?.response?.status === 403)) {
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
        throw new Error(errorHandler(error, true));
      }
    }
    return Promise.reject(error);
  }
);
