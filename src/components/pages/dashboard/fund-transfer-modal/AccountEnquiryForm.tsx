import React from 'react';

import { FundTransferProps } from '../../../../types/transaction';
import Button from '../../../inputs/Button';

import SelectInput, { SelectOptionType } from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';

type Props = {
  banks: SelectOptionType[],
  onChange: (val: any, type?: string, inputName?: string) => void
  form: FundTransferProps
  onNext: () => void
};

function AccountEnquiryForm({
  banks, onNext, onChange, form
}: Props) {
  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Choose bank account</h1>
      </div>

      <div className="w-full mb-7">
        <SelectInput
          onChange={(val) => onChange(val, 'select', 'bankCode')}
          value={form?.bankCode}
          className="w-full mb-4"
          label="Select bank"
          options={banks || []}
        />
        <TextInput
          name="accountNumber"
          value={form?.accountNumber}
          className="w-full mb-4"
          label="Account number"
          onChange={(e) => /^\d{0,10}$/g.test(e.target.value) && onChange(e)}
        />
        <TextInput
          value={form?.accountName}
          className="w-full"
          label="Account name"
          disabled
        />
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
