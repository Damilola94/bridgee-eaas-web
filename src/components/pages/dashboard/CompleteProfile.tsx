"use client";
import { useState } from "react";
import { useRouter } from 'next/router';

import Button from "../../inputs/Button";

import WithdrawalPinModal from "./withdrawal-pin-transfer-modal";

function CompleteProfile() {
  const [showWithdrawalPin, setShowWithdrawalPin] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="w-full bg-lightGreen py-3 px-4 sm:px-6 md:px-8 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div className="flex-1 text-green text-sm sm:text-base leading-relaxed">
            <p className="text-center sm:text-left">
              Kindly complete your profile to start transacting
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Button
              className="w-full sm:w-auto flex items-center justify-center whitespace-nowrap bg-green text-white"
              paddingY="py-2 sm:py-1.5"
              onClick={() => router.push("/settings")}
            >
              Complete Profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteProfile;
