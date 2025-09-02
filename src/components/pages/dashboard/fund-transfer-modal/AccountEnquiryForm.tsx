import React from 'react';
import Image from 'next/image';

import { FundTransferProps } from '../../../../types/transaction';
import Button from '../../../inputs/Button';
import BankIcon from '../../../../assets/svgs/bank.svg';
import { useAccountsContext } from '../../../../context/Accounts';

type Props = {
  onChange: (val: any, type?: string, inputName?: string) => void;
  form: FundTransferProps;
  onNext: () => void;
};

function AccountEnquiryForm({ onNext, onChange, form }: Props) {
  const { accounts } = useAccountsContext();
  const { identity } = accounts || {};

  const primaryAccount = identity?.accountDetails[0];

  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Choose bank account</h1>
      </div>

      <div className="w-full mb-7 space-y-3">
        {primaryAccount && (
          <div
            onClick={() => {
              onChange(primaryAccount.accountNumber, 'input', 'accountNumber');
              onChange(primaryAccount.bankName, 'input', 'bankName');
            }}
            className="w-full p-4 border rounded-md cursor-pointer flex justify-between items-center transition border-primary bg-primary/10"
          >
            <div className="flex space-x-2">
              <Image src={BankIcon} alt="Icon" className="w-10 h-auto" />
              <div>
                <p className="font-bold ff-bold">{primaryAccount.bankName}</p>
                <p className="text-sm text-gray-600">{primaryAccount.accountName}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{primaryAccount.accountNumber}</p>
          </div>
        )}
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
