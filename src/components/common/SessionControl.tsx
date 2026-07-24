import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import { logout } from '../../services/auth';
import notification from '../../utilities/notification';

type Props = {
  path?: string
};

const events = [
  'load',
  'mousedown',
  'mousemove',
  'click',
  'scroll',
  'keypress'
];

const WARNING_TIME = 1000 * 60 * 10;
const SIGNOUT_TIME = 1000 * 60 * 15;

function SessionControl({ path }: Props) {
  const [cookie] = useCookies(['data']);
  const { pathname } = useRouter();

  let warningTO: any = null;
  let signoutTO: any = null;

  const clearTimeoutFunc = () => {
    if (warningTO) {
      clearTimeout(warningTO);
    }
    if (signoutTO) {
      clearTimeout(signoutTO);
    }
  };

  const warn = () => {
    notification({
      title: 'SESSION TIMEOUT WARNING',
      message: `Due to inactivity on the portal, you will be logged out automatically in the next 5 minutes.
      To avoid being logged out, do something on the platform.`,
      type: 'warning'
    });
  };

  const setSessionTimeout = () => {
    warningTO = setTimeout(warn, WARNING_TIME);
    // signoutTO = setTimeout(() => logout(path), SIGNOUT_TIME);
  };

  const resetTimeout = () => {
    clearTimeoutFunc();
    setSessionTimeout();
  };

  useEffect(() => {
    if (cookie.data?.accessToken) {
      events.forEach((event) => {
        window.addEventListener(event, resetTimeout);
      });

      setSessionTimeout();
    }

    return () => {
      if (cookie.data?.accessToken) {
        events.forEach((event) => {
          window.removeEventListener(event, resetTimeout);
        });

        clearTimeout(warningTO);
        clearTimeout(signoutTO);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie.data?.accessToken, pathname]);

  return null;
}

SessionControl.defaultProps = {
  path: '/'
};

export default SessionControl;
