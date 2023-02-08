import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

import ClickableLogo from './ClickableLogo';
import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import { ResetPasswordProps } from '../../../types/auth';

function ValidateEmail({ gotoNextForm = () => {} }: ResetPasswordProps) {
  const router = useRouter();
  const [, setCookie] = useCookies(['data']);
  const [email, setEmail] = useState('');

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

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!(email)) {
      notification({
        title: 'Form Error',
        message: 'Please, enter your email',
        type: 'danger'
      });
      return;
    }

    gotoNextForm();
    return;
    loginMutation.mutate({
      endpoint: 'auth', extra: 'signin', method: 'POST', body: { email }
    });
  };

  const { isLoading } = loginMutation;

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white" onSubmit={handleLogin}>
        {isLoading && <Loading />}

        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-primary text-sm border border-primary flex items-center mb-3 rounded py-1 px-2"
          >
            <HiArrowLeft className="mr-2" />
            Back
          </button>

          <h1 className="w-full text-textColor font-bold text-xl mb-2">Forgot Password</h1>
          <p className="text-sm text-lightText">To reset your password, enter your email address.</p>
        </div>

        <div className="w-full">
          <TextInput
            className="w-full mb-10"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            label="Email Address"
            placeholder="Email Address"
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

export default ValidateEmail;
