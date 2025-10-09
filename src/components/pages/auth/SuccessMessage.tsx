import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Kite from '../../../assets/images/success-kite.gif';

import Button from '../../inputs/Button';

import { ResetPasswordProps } from '../../../types/auth';

import ClickableLogo from './ClickableLogo';

function SuccessMessage({ message = '' }: ResetPasswordProps) {
  const router = useRouter();
  const [,, removeCookie] = useCookies(['form']);

  useEffect(() => () => removeCookie('form'), [removeCookie]);

  return (
    <div className="flex w-full h-full items-center">
      <div className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white">
        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">{message}</h1>
        </div>

        <div className="w-full text-center">
          <Image src={Kite} alt="Flying kite" width={250} height={250} className="inline-block w-[250px] h-[250px]" />

          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl mt-5"
            onClick={() => router.push('/seller/login')}
            paddingY="p-3.5"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
