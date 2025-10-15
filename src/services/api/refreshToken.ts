import mem from 'mem';
import axios from 'axios';
import Cookies from 'js-cookie';

import { logout } from '../auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshTokenFn() {
  const storedData = Cookies.get('data');
  const data = storedData && JSON.parse(storedData);

  try {
    const url = '/api/v1/auth/refresh-token';
    const body = {
      expiredToken: data?.accessToken,
      refreshToken: data?.refreshToken
    };

    const response: any = await axios({ url, method: 'POST', data: body });

    const { data: apiResponse } = response.data;
    if (!apiResponse?.accessToken) {
      logout();
    }

    // Update cookie with new tokens and other data from response
    Cookies.set('data', JSON.stringify({
      ...data,
      accessToken: apiResponse.accessToken,
      refreshToken: apiResponse.refreshToken,
      expiry: apiResponse.expiry,
      roles: apiResponse.roles,
      userId: apiResponse.userId
    }), { secure: true, sameSite: 'strict' });

    return apiResponse;
  } catch (error) {
    logout();
  }
  return null;
}

const memoizedRefreshToken = mem(refreshTokenFn, { maxAge: 10000 });

export default memoizedRefreshToken;