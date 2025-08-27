"use client";
import { useState } from "react";

import Button from '../../inputs/Button';

import WithdrawalPinModal from './withdrawal-pin-transfer-modal';

function WithdrawalPinBanner() {
  const [showWithdrawalPin, setShowWithdrawalPin] = useState(false);

  return (
    <>
      <div className="w-full bg-lightGreen py-3 px-8 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <div className="w-full sm:w-[calc(100%-180px)] max-w-lg text-green">
            <p className="text-base leading-relaxed">Kindly create a transaction pin for withdrawal</p>
          </div>
          <div className="flex-shrink-0">
            <Button
              className="w-fit flex items-center justify-center whitespace-nowrap bg-green text-white"
              paddingY="py-1.5"
              onClick={() => setShowWithdrawalPin(true)}
            >
              Create Withdrawal Pin
            </Button>
          </div>
        </div>
      </div>
      {showWithdrawalPin && <WithdrawalPinModal onClose={() => setShowWithdrawalPin(false)} />}
    </>
  );
}

export default WithdrawalPinBanner;
