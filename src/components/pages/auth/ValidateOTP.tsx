import React, { useState } from 'react';

import AuthCode from 'react-auth-code-input';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';

import ClickableLogo from './ClickableLogo';

type Props = {
  gotoNextForm?: () => void
  gotoPrevForm?: () => void
  endpointExtra: string
};

function ValidateOTP({ endpointExtra = '', gotoPrevForm = () => { }, gotoNextForm = () => { } }: Props) {
  const [cookie, setCookie] = useCookies(['form', 'data']);
  const [otp, setOtp] = useState('');

  const activationMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.data?.message || 'Successful account verification.',
        type: 'success'
      });
      if (endpointExtra === 'verify') {
        setCookie('form', { otpValidationTicket: res?.data, email: cookie.form?.email });
      }
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

  const resendMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.data?.message || 'Token resent successfully',
        type: 'success'
      });
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

    const body = {
      identifier: cookie.form?.email,
      otp,
      purpose: "PasswordReset"
    };

    activationMutation.mutate({
      service: 'identity-service/api/v1',
      endpoint: 'otp',
      extra: endpointExtra,
      method: 'POST',
      body
    });
  };

  const resendOtp = () => {
    const body = { email: cookie.form?.email };
    resendMutation.mutate({
      service: 'identity-service/api/v1',
      endpoint: 'auth',
      extra: 'forgot-password',
      method: 'POST',
      body
    });
  };

  const { isLoading, isSuccess } = activationMutation;
  const { isLoading: resendingOtp } = resendMutation;

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto" onSubmit={handleValidateToken}>
        {(isLoading || isSuccess) && <Loading />}
        {resendingOtp && <Loading message="Resending OTP..." />}

        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor ff-bold text-xl mb-2">Forgot Password</h1>
        <p className="text-sm text-lightText mb-10">
          {/* {`Proceed to your email(${cookie.form?.email}) to get code`}
           */}
          A code has been send to your email, proceed to your email to get code
        </p>

        <div className="w-full">
          <AuthCode
            isPassword
            allowedCharacters="numeric"
            containerClassName="w-full flex justify-between mb-2"
            inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
            onChange={(val: string) => setOtp(val)}
          />

          <p className="mb-10 text-sm">
            Didn&apos;t recieve OTP?&nbsp;
            <button
              type="button"
              onClick={resendOtp}
              className="text-success underline cursor-pointer outline-none border-none"
            >
              Resend
            </button>
          </p>
          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Proceed
          </Button>
        </div>

        <p className="mt-5 text-center">
          Wrong email?&nbsp;
          <button type="button" onClick={gotoPrevForm} className="text-success cursor-pointer outline-none">click here</button>
        </p>
      </form>
    </div>
  );
}

export default ValidateOTP;
