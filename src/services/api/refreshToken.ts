import mem from 'mem';
import axios from 'axios';
import Cookies from 'js-cookie';

import { logout } from '../auth';
import endpoints from './endpoints';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function refreshTokenFn() {
  const storedData = Cookies.get('data');
  const data = storedData && JSON.parse(storedData);

  try {
    const url = `${endpoints.auth}/refresh-token/${data?.email}`;
    const headers = { access_token: data?.refreshToken };

    const response: any = await axios({ url, headers, method: 'POST' });

    const { data: session } = response.data;
    if (!session?.accessToken) {
      logout();
    }

    Cookies.set('data', JSON.stringify({ ...data, ...session }), { secure: true, sameSite: 'strict' });
    return session;
  } catch (error) {
    logout();
  }
};

export const memoizedRefreshToken = mem(refreshTokenFn, { maxAge: 10000 });
