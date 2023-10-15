import React from 'react';

import { useAccountsContext } from '../../../../context/Accounts';
import { FundTransferProps } from '../../../../types/transaction';
import { formatCurrency } from '../../../../utilities/general';
import AmountInput from '../../../inputs/Amount';
import Button from '../../../inputs/Button';

import SelectInput, { SelectOptionType } from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';
import ToggleInput from '../../../inputs/Toggle';

type Props = {
  categories: SelectOptionType[],
  onChange: (val: any, type?: string, inputName?: string) => void
  form: FundTransferProps
  onNext: () => void
  onPrev: () => void
};

function AmountDetails({
  categories, onNext, onPrev, onChange, form
}: Props) {
  const { accounts } = useAccountsContext();
  const { defaultWallets } = accounts || {};

  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Enter Amount</h1>
      </div>

      <div className="w-full mb-7">
        <AmountInput
          name="amount"
          value={form?.amount}
          onChange={(e) => e?.target?.value <= defaultWallets?.[0]?.balance && onChange(e)}
          className="w-full mb-4"
          label={`Amount: (Max: ${formatCurrency(defaultWallets?.[0]?.balance, true, defaultWallets?.[0]?.currency?.code)})`}
          currency={defaultWallets?.[0]?.currency?.code}
          maxValue={defaultWallets?.[0]?.balance}
        />
        <SelectInput
          onChange={(val) => onChange(val, 'select', 'categoryId')}
          value={form?.categoryId}
          className="w-full mb-4"
          label="Select transaction category"
          options={categories || []}
        />
        <TextInput
          name="narration"
          value={form?.narration}
          onChange={onChange}
          className="w-full mb-4"
          label="Narration"
        />
        <div className="">
          <ToggleInput
            value={form?.saveAsBeneficiary}
            label="Add to beneficiary"
            onChange={(val) => onChange(val, 'toggle', 'saveAsBeneficiary')} />
        </div>
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

export default AmountDetails;
