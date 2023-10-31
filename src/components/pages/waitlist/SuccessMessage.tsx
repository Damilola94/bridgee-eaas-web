import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Kite from '../../../assets/images/success-kite.gif';

import ClickableLogo from '../auth/ClickableLogo';
import Button from '../../inputs/Button';

function SuccessMessage() {
  const router = useRouter();

  return (
    <div className="flex w-full h-full items-center">
      <div className="w-[30rem] px-8 pt-10 pb-12 mx-auto bg-white">
        <ClickableLogo className="mb-10" />

        <div className="mb-7">
          <h1 className="w-full text-textColor ff-medium text-xl mb-2">
            You have successfully joined our waitlist. Watch out for us.
          </h1>
        </div>

        <div className="w-full text-center">
          <Image src={Kite} alt="Flying kite" width={250} height={250} className="inline-block w-[250px] h-[250px]" />

          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl mt-5"
            onClick={() => router.push('/')}
            paddingY="p-3.5"
          >
            Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
