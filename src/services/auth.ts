import Cookies from 'js-cookie';

export function logout(path = '/') {
  localStorage.clear();
  Cookies.remove('data');

  window.location.assign(path);
}
