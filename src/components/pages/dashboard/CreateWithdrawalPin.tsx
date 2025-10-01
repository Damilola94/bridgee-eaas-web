"use client";
import { useState } from "react";

import Button from "../../inputs/Button";

import WithdrawalPinModal from "./withdrawal-pin-transfer-modal";

function WithdrawalPinBanner() {
  const [showWithdrawalPin, setShowWithdrawalPin] = useState(false);

  return (
    <>
      <div className="w-full bg-lightGreen py-3 px-4 sm:px-6 md:px-8 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* Text */}
          <div className="flex-1 text-green text-sm sm:text-base leading-relaxed">
            <p className="text-center sm:text-left">
              Kindly create a transaction pin for withdrawal
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center sm:justify-end">
            <Button
              className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap bg-green text-white"
              paddingY="py-2 sm:py-1.5"
              onClick={() => setShowWithdrawalPin(true)}
            >
              Create Withdrawal Pin
            </Button>
          </div>
        </div>
      </div>

      {showWithdrawalPin && (
        <WithdrawalPinModal onClose={() => setShowWithdrawalPin(false)} />
      )}
    </>
  );
}

export default WithdrawalPinBanner;
