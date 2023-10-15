import React from 'react';

import { FundTransferProps } from '../../../../types/transaction';
import { formatCurrency } from '../../../../utilities/general';
import Button from '../../../inputs/Button';

type Props = {
  form: FundTransferProps
  onNext: () => void
  onPrev: () => void
};

const DisplayData = ({ label = '', value = '' }) => {
  return (
    <div className="w-full flex justify-between py-3.5 border-t">
      <span className="">{label}</span>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
};

function TransactionSummary({ onNext, onPrev, form }: Props) {
  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Summary</h1>
      </div>

      <div className="w-full mb-7">
        <DisplayData label="Bank:" value={form?.bankCode?.label} />
        <DisplayData label="Account Name:" value={form?.accountName} />
        <DisplayData label="Account Number:" value={form?.accountNumber} />
        <DisplayData label="Amount:" value={formatCurrency(form?.amount)} />
        <DisplayData label="Fee:" value={formatCurrency(0)} />
        <DisplayData label="Category:" value={form?.categoryId?.label} />
        <DisplayData label="Narration:" value={form?.narration} />
      </div>

      <div className="flex -mx-2">
        <div className="w-1/2 px-2">
          <Button
            onClick={onPrev}
            border
            paddingX="px-10"
            bgColor="bg-white"
            textColor="text-success"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2.5"
          >
            Back
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Button
            onClick={onNext}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2.5"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummary;
