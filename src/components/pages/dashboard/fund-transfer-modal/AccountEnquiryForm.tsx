import React from 'react';

import Image from 'next/image';

import { FundTransferProps } from '../../../../types/transaction';
import Button from '../../../inputs/Button';
import BankIcon from '../../../../assets/svgs/bank.svg';

type Props = {
  onChange: (val: any, type?: string, inputName?: string) => void
  form: FundTransferProps
  onNext: () => void
};

function AccountEnquiryForm({
  onNext, onChange, form
}: Props) {
  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Choose bank account</h1>
      </div>

      <div className="w-full mb-7 space-y-3">
        <div
          onClick={() => {}}
          className="w-full p-4 border rounded-md cursor-pointer flex justify-between items-center transition border-primary bg-primary/10 "
        >

          <div className='flex space-x-2'>
            <Image src={BankIcon} alt="Icon" className={ 'w-10 h-auto'} />
            <div>
              <p className="font-bold ff-bold">Wema Bank Plc</p>
              <p className="text-sm text-gray-600">Toluwalase Obasun</p>
            </div>
          </div>
          <p className="text-sm ff- text-gray-600">0174632231</p>
        </div>
      </div>

      <Button
        onClick={onNext}
        paddingX="px-10"
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
        paddingY="p-3.5"
      >
        Continue
      </Button>
    </div>
  );
}

export default AccountEnquiryForm;
