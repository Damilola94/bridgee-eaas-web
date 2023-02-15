import Cookies from 'js-cookie';

import { logger } from './general';
import { logout } from '../services/auth';

const errorHandler = (error: any, auth: boolean) => {
  let message = '';

  logger(error);

  if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED') {
    message = 'Network error. Please, check your internet connection.';
  } else if (error?.response) {
    const { response } = error;
    if (response?.status === 401 || response?.status === 403) {
      message = response?.data?.detail
        || response?.data?.title
        || 'You are either not autorized to access this resource or your session has expired. Please login again.';
      if (auth) {
        Cookies.set('err', message);
        logout();
      }
    } else if (Array.isArray(response?.data?.errors)) {
      message = response?.data?.errors?.join(', ');
    } else if (Array.isArray(response?.data?.Errors)) {
      message = response?.data?.Errors?.join(', ');
    } else {
      message = response.data?.detail
        || response?.data?.error?.message
        || response?.data?.message
        || response?.statusText
        || 'Something went wrong. Please, try again';
    }
  } else {
    message = 'Something went wrong. Please, try again.';
  }
  return message.toString();
};

export default errorHandler;
