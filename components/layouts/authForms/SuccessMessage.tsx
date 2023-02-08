import React from 'react';
import Image from 'next/image';

// import Kite from '../../../assets/images/success-kite.gif';
import Kite from '../../../assets/svgs/success.svg';

import ClickableLogo from './ClickableLogo';
import Button from '../../inputs/Button';

import { ResetPasswordProps } from '../../../types/auth';

function SuccessMessage({ gotoNextForm = () => {}, message = '' }: ResetPasswordProps) {
  return (
    <div className="flex w-full h-full items-center">
      <div className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white">
        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <h1 className="w-full text-textColor font-bold text-xl mb-2">{message}</h1>
        </div>

        <div className="w-full text-center">
          <Image src={Kite} alt="ALAT Logo" layout="fixed" width={250} height={250} className="!mb-10" />

          <Button
            className="w-full text-lg font-bold !rounded-md md-2:!rounded-xl"
            onClick={gotoNextForm}
            paddingY="p-3.5"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
