import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import { ResetPasswordProps } from '../../../types/auth';

import ClickableLogo from './ClickableLogo';

function ValidateEmail({ gotoNextForm = () => {} }: ResetPasswordProps) {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(['form']);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (cookie?.form?.email) {
      setEmail(cookie?.form?.email);
    } else {
      removeCookie('form');
    }
  }, [cookie, removeCookie]);

  const resetMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || 'A password reset OTP has been sent to your registered email address.',
        type: 'success'
      });
      setCookie('form', { email });
      gotoNextForm();
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

    resetMutation.mutate({
      endpoint: 'auth', extra: 'initiate-reset-password', method: 'POST', body: { email }
    });
  };

  const { isLoading, isSuccess } = resetMutation;

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white" onSubmit={handleLogin}>
        {(isLoading || isSuccess) && <Loading />}

        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-primary text-sm border border-primary flex items-center mb-3 rounded pt-2 pb-1 px-3"
          >
            <HiArrowLeft className="mr-2 mb-1" />
            <span>Back</span>
          </button>

          <h1 className="w-full text-textColor ff-bold text-xl mb-2">Forgot Password</h1>
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
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
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
