import mem from 'mem';
import axios from 'axios';
import Cookies from 'js-cookie';

import { logout } from '../auth';
import endpoints from './endpoints';
import { logger } from '../../utilities/general';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshTokenFn() {
  const storedData = Cookies.get('data');
  const data = storedData && JSON.parse(storedData);

  try {
    const url = `${endpoints.auth}/refresh-token`;
    const headers = { authorization: data?.refreshToken };
    const body = { email: data?.email, refreshToken: data?.refreshToken };

    const response: any = await axios({
      url, headers, method: 'POST', data: body
    });

    logger(response);

    const { data: session } = response.data;
    if (!session?.accessToken) {
      logout();
    }

    Cookies.set('data', JSON.stringify(session));
    return session;
  } catch (error) {
    logout();
  }
};

export const memoizedRefreshToken = mem(refreshTokenFn, { maxAge: 10000 });
