import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useAccountsContext } from '../../../context/Accounts';
import Button from '../../inputs/Button';
import { formatCurrency } from '../../../utilities/general';

import FundTransferModal from './fund-transfer-modal';

function WalletCard() {
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const { accounts } = useAccountsContext();
  const { wallet } = accounts || {};

  return (
    <>
      <div className="bg-white w-full px-4 py-4 rounded-lg shadow">
        <div className="">
          <div className="flex items-center mr-3 space-x-3">
            <div className="">
              <p className="flex items-center text-base mb-1">
                Wallet Balance&nbsp;
                <button onClick={() => setShowBalance(!showBalance)} className="ml-1">
                  {showBalance ? (
                    <AiOutlineEye className="text-gray-600" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-gray-600" />
                  )}
                </button>
              </p>
              <h1 className="text-3xl">
                <span className="text-success">{wallet?.wallets[0]?.currency || 'N/A'}</span>
                {' '}
                <span className="font-bold ff-heavy"> {showBalance ? formatCurrency(wallet?.wallets[0]?.balance, false) || "N/A" : "••••"}</span>
              </h1>
            </div>
          </div>
          <div className="flex min-w-max items-center space-x-2 mt-3">
            <Button
              paddingX="px-10"
              paddingY="pt-2.5 pb-2"
              onClick={() => setShowWithdrawal(true)}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </div>
      {showWithdrawal && <FundTransferModal onClose={() => setShowWithdrawal(false)} />}
    </>
  );
}

export default WalletCard;
