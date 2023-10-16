import React, { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import Skeleton from 'react-loading-skeleton';

import { useAccountsContext } from '../../../../context/Accounts';
import useGetQuery from '../../../../hooks/useGetQuery';
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

  const [debouncedAmount, setDebouncedAmount] = useState(form?.amount);

  const { data: processFee, status } = useGetQuery({
    endpoint: 'transaction',
    extra: 'calculate-fee',
    pQuery: { feeType: 'Transfer', amount: debouncedAmount },
    queryKey: ['calculate-transfer-fee', debouncedAmount],
    enabled: !!debouncedAmount
  });

  useEffect(() => {
    onChange(processFee?.data, 'api-data', 'processFee');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processFee?.data]);

  const debouncedSearch = useMemo(() => debounce(setDebouncedAmount, 1000), [setDebouncedAmount]);

  const handleAmountChange = (e: any) => {
    onChange(e);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Enter Amount</h1>
      </div>

      <div className="w-full mb-7">
        <AmountInput
          name="amount"
          value={form?.amount}
          onChange={(e) => e?.target?.value <= defaultWallets?.[0]?.balance && handleAmountChange(e)}
          className="w-full mb-1"
          label={`Amount: (Max: ${formatCurrency(defaultWallets?.[0]?.balance, true, defaultWallets?.[0]?.currency?.code)})`}
          currency={defaultWallets?.[0]?.currency?.code}
          maxValue={defaultWallets?.[0]?.balance}
        />
        <p className="text-xs mb-4 text-primary text-right">
          Processing Fee:
          {' '}
          {status === 'loading' ? <Skeleton className="w-[40px]" /> : formatCurrency(form?.processFee || 0)}
        </p>

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
            disabled={status === 'loading'}
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
