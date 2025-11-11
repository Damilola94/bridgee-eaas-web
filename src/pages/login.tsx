import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useCookies } from 'react-cookie';

import notification from '../utilities/notification';
import AuthWrapper from '../components/wrappers/Auth';
import LoginForm from '../components/pages/auth/Login';

const Login: NextPage = () => {
  const [cookie,, removeCookie] = useCookies(['err']);

  useEffect(() => {
    if (cookie?.err) {
      notification({ title: 'Unauthorized Access', message: cookie?.err, type: 'danger' });
      removeCookie('err');
    }
  }, [cookie, removeCookie]);

  return (
    <AuthWrapper title="UseBridgee Inc. - Login">
      <LoginForm />
    </AuthWrapper>
  );
};

export default Login;
