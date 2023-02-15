import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useCookies } from 'react-cookie';

import notification from '../utilities/notification';
import AuthWrapper from '../components/wrappers/Auth';
import LoginForm from '../components/layouts/authForms/Login';

const Login: NextPage = () => {
  const [cookie,, removeCookie] = useCookies(['err']);

  useEffect(() => {
    if (cookie?.err) {
      notification({ title: 'Unauthorized Access', message: cookie?.err, type: 'danger' });
      removeCookie('err');
    }
  }, [cookie, removeCookie]);

  return (
    <AuthWrapper title='Bridge by ALAT - Login'>
      <LoginForm />
    </AuthWrapper>
  );
};

export default Login;
