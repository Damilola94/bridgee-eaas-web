import axios from 'axios';

import errorHandler from '../../utilities/errorHandler';

import memoizedRefreshToken from './refreshToken';

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
=======
  // baseURL: "https://api.usebridgee.com"
  baseURL: "https://staging-api.usebridgee.com/"
>>>>>>> c5c0bf42717d3f92fe6c1720dc6f31a3b0459629
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (!!config?.headers?.authorization
      && (error?.response?.status === 401 || error?.response?.status === 403)) {
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
      }
      throw new Error(errorHandler(error, true));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
