import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineEyeInvisible } from 'react-icons/ai';

import WalletIcon from '../../../assets/svgs/wallet.svg';

import { useAccountsContext } from '../../../context/Accounts';
import Button from '../../inputs/Button';
import { formatCurrency } from '../../../utilities/general';
import BankTransferModal from './BankTransferModal';
import WithdrawalModal from './fund-transfer-modal/WithdrawalModal';

function WalletCard() {
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);

  const { accounts } = useAccountsContext();
  const { defaultWallets: wallets } = accounts || {};

  return (
    <>
      <div className="bg-white w-full px-7 py-7 rounded-lg shadow">
        <h3 className="text-lg mb-5">
          Hello&nbsp;
          <span className="font-bold">{accounts?.defaultMerchant?.name || accounts?.user?.firstName || ''}</span>
        </h3>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center mr-3 space-x-3">
            <span className="bg-primary w-12 h-12 p-3 rounded-full">
              <Image src={WalletIcon} alt="" width={50} height={50} className="w-auto h-auto" />
            </span>
            <div className="">
              <p className="flex items-center text-base mb-1">
                Wallet Balance&nbsp;
                <AiOutlineEyeInvisible className="" />
              </p>
              <h1 className="text-3xl">
                <span className="text-success">{wallets?.[0]?.currency?.code || 'N/A'}</span>
                {' '}
                <span className="font-bold ff-heavy">{formatCurrency(wallets?.[0]?.balance, false) || 'N/A'}</span>
              </h1>
            </div>
          </div>
          <div className="flex min-w-max items-center space-x-2 my-3">
            <Button
              border
              paddingX="px-10"
              bgColor="bg-white"
              textColor="text-success"
              paddingY="pt-2.5 pb-2"
              onClick={() => setShowBankTransfer(true)}
            >
              Add Fund
            </Button>
            <Button
              paddingX="px-10"
              paddingY="pt-2.5 pb-2"
              onClick={() => setShowWithdrawal(true)}
            >
              Transfer
            </Button>
          </div>
        </div>
      </div>

      {showBankTransfer && <BankTransferModal onClose={() => setShowBankTransfer(false)} />}
      {showWithdrawal && <WithdrawalModal onClose={() => setShowWithdrawal(false)} />}
    </>
  );
}

export default WalletCard;
