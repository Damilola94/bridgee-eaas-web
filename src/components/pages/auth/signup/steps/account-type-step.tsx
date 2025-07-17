/* eslint-disable react/jsx-no-undef */
"use client";

import type React from "react";

import Image from "next/image";

import Button from "../../../../inputs/Button";
// import Business from "../../../../../assets/svgs/business.svg";
import Personal from "../../../../../assets/svgs/personal.svg";

interface AccountTypeStepProps {
  form: any;
  handleChange: (val: any, type?: string, inputName?: string) => void;
  handleContinue: () => void;
}

const AccountTypeStep: React.FC<AccountTypeStepProps> = ({
  form,
  handleChange,
  handleContinue
}) => {
  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-6">
        What kind of account would you like to open today?
      </h1>
      <p className="text-center text-gray-500 mb-8">
        You can choose to add another account later.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div
          className={`border rounded-lg p-6 cursor-pointer ${
            form?.isBusiness === "false"
              ? "border-[#D31FFF]"
              : "border-gray-200"
          }`}
          onClick={() => handleChange("false", "check", "isBusiness")}
        >
          <div className="flex justify-start mb-4">
            <Image
              src={Personal}
              alt="Personal"
              width={30}
              height={30}
            />
          </div>
          <h3 className="text-left font-semibold mb-2">Personal Account</h3>
          <p className="text-left text-sm text-gray-500">
            P2P escrow purpose. You don&apos;t need any document to onboard
          </p>
        </div>

        {/* <div
          className={`border rounded-lg p-6 cursor-pointer ${
            form?.isBusiness === "true" ? "border-[#D31FFF]" : "border-gray-200"
          }`}
          onClick={() => handleChange("true", "check", "isBusiness")}
        >
          <div className="flex justify-start mb-4">
            <Image
              src={Business}
              alt="Business"
              width={30}
              height={30}
            />
          </div>
          <h3 className="text-left font-semibold mb-2">Business Account</h3>
          <p className="text-left text-sm text-gray-500">
            For Business escrow purpose
          </p>
        </div> */}
      </div>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
        paddingY="p-3.5"
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
};

export default AccountTypeStep;
