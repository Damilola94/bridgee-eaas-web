import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import ClickableLogo from './ClickableLogo';
import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import { ResetPasswordProps } from '../../../types/auth';

function SetNewPassword({ gotoNextForm = () => {} }: ResetPasswordProps) {
  const [, setCookie] = useCookies(['data']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setCookie('data', res?.data);
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const validateForm = () => {
    if (!password) return 'Please, enter your new password';
    if (!confirmPassword) return 'Please, enter your new password confirmation';
    if (password !== confirmPassword) return 'Password mismatch';
    return null;
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      notification({
        title: 'Form Error',
        message: error,
        type: 'danger'
      });
      return;
    }

    gotoNextForm();
    return;
    loginMutation.mutate({
      endpoint: 'auth', extra: 'signin', method: 'POST', body: { password }
    });
  };

  const { isLoading } = loginMutation;

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white" onSubmit={handleLogin}>
        {isLoading && <Loading />}

        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <h1 className="w-full text-textColor font-bold text-xl mb-2">Set new Password</h1>
          <p className="text-sm text-lightText">Enter your new password</p>
        </div>

        <div className="w-full">
          <TextInput
            className="w-full mb-7"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            label="New Password"
            placeholder="Password"
          />

          <TextInput
            className="w-full mb-10"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            label="Confirm new password"
            placeholder="New password"
          />

          <Button
            className="w-full text-lg font-bold !rounded-md md-2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SetNewPassword;
