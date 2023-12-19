import React, { useState } from 'react';

import AuthCode from 'react-auth-code-input';
import { useCookies } from 'react-cookie';

import Button from '../../inputs/Button';

import notification from '../../../utilities/notification';
import { ResetPasswordProps } from '../../../types/auth';

import ClickableLogo from './ClickableLogo';

function ValidatePIN({ gotoPrevForm = () => {}, gotoNextForm = () => {} }: ResetPasswordProps) {
  const [cookie, setCookie] = useCookies(['form', 'data']);
  const [pin, setPIN] = useState('');

  const handleValidateToken = (e: any) => {
    e.preventDefault();
    if (!pin || pin.length < 4) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid OTP',
        type: 'danger'
      });
      return;
    }

    const body = { ...cookie.form, pin };
    setCookie('form', body);
    gotoNextForm();
  };

  return (
    <div className="flex w-full h-full items-center">
      <form className="w-[30rem] px-8 pt-10 pb-12 mx-auto" onSubmit={handleValidateToken}>
        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor ff-bold text-xl mb-2">Enter PIN</h1>
        <p className="text-sm text-lightText mb-10">
          Enter your transaction PIN to validate this process
        </p>

        <div className="w-full">
          <AuthCode
            isPassword
            length={4}
            allowedCharacters="numeric"
            containerClassName="w-full flex justify-between mb-10"
            inputClassName="w-[22%] rounded h-16 xs:h-20 border border-[#777] text-center"
            onChange={(val: string) => setPIN(val)}
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

export default ValidatePIN;
