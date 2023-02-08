import React, { useState } from 'react';

import AuthCode from 'react-auth-code-input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import ClickableLogo from './ClickableLogo';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';

type Props = {
  gotoNextForm?: () => void
  gotoPrevForm?: () => void
};

function ValidateOTP({ gotoPrevForm = () => {}, gotoNextForm = () => {} }: Props) {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['data']);
  const [otp, setOtp] = useState('');

  const activationMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      const path = '/dashboard';
      setCookie('data', res?.data, { secure: true, sameSite: true });
      router.push(path);
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleValidateToken = (e: any) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid OTP',
        type: 'danger'
      });
      return;
    }

    gotoNextForm();
    return;

    const body = { accessToken: cookie.data?.token, pin: otp };

    activationMutation.mutate({
      endpoint: 'auth', extra: 'validate-pin', method: 'POST', body
    });
  };

  const { isLoading, isSuccess } = activationMutation;

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto" onSubmit={handleValidateToken}>
        {(isLoading || isSuccess) && <Loading />}

        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor font-bold text-xl mb-2">Enter Code</h1>
        <p className="text-sm text-lightText mb-10">Proceed to your email(main.joe@gmail.com) to get code</p>

        <div className="w-full">
          <AuthCode
            allowedCharacters="numeric"
            containerClassName="w-full flex justify-between mb-2"
            inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
            onChange={(val: string) => setOtp(val)}
          />

          <p className="mb-10 text-sm">
            Didn&apos;t recieve OTP?&nbsp;
            <span className='text-primary cursor-pointer'>Resend</span>
          </p>
          <Button
            className="w-full text-lg font-bold !rounded-md md-2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
          Proceed
          </Button>
        </div>

        <p className="mt-5 text-center">
          Wrong email?&nbsp;
          <button type="button" onClick={gotoPrevForm} className='text-primary cursor-pointer outline-none'>click here</button>
        </p>
      </form>
    </div>
  );
}

export default ValidateOTP;
