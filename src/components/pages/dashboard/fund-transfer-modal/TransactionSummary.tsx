"use client";

import Image from "next/image";

import type { FundTransferProps } from "../../../../types/transaction";
import { formatCurrency } from "../../../../utilities/general";
import Button from "../../../inputs/Button";
import EmptyWalletIcon from '../../../../assets/svgs/empty-wallet.svg';
import { useAccountsContext } from "../../../../context/Accounts";

type Props = {
  form: FundTransferProps
  onNext: () => void
  onPrev: () => void
}

function DisplayData({ label = "", value = "" }) {
  return (
    <div className="w-full flex justify-between py-3.5 border-t">
      <span className="font-bold ff-bold">{label}</span>
      <span className="font-bold text-right">{value}</span>
    </div>
  );
}

function TransactionSummary({ onNext, onPrev, form }: Props) {
  const { accounts } = useAccountsContext();
  const { wallet, identity } = accounts || {};
  const primaryAccount = identity?.accountDetails[0];

  return (
    <div className="w-full py-5">
      <div className="mb-7">
        <h1 className="w-full text-textColor ff-bold text-xl">Summary</h1>
      </div>

      <div className="w-full mb-7">
        <DisplayData label="Processing fee:" value={formatCurrency(form?.processFee || 0)} />
        <DisplayData label="Account Name:" value={primaryAccount.bankName} />
        <DisplayData label="Account Number:" value={primaryAccount.accountNumber} />
        <DisplayData label="Amount:" value={formatCurrency(form?.amount)} />
        <DisplayData label="Fee:" value={formatCurrency(10)} />
        <div className="w-full mb-7 space-y-3">
          <div
            onClick={() => { }}
            className="w-full p-4 py-2 border rounded-md cursor-pointer flex justify-between items-center transition border-borderColor bg-borderColor/10"
          >
            <div className='flex space-x-2'>
              <Image src={EmptyWalletIcon} alt="Icon" className={'w-10 h-auto'} />
              <p className="font-bold ff-bold mt-3">Balance</p>
            </div>
            <p className="ff-bold">{formatCurrency(wallet?.wallets[0]?.balance, false) || "N/A"}</p>
          </div>
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
            Cancel
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Button
            onClick={onNext}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2.5"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummary;
