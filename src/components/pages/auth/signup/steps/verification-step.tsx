/* eslint-disable no-duplicate-imports */
"use client";

import type React from "react";
import { useState } from "react";

import TextInput from "../../../../inputs/Text";
import Button from "../../../../inputs/Button";

interface VerificationStepProps {
  form: any;
  handleChange: (val: any, type?: string, inputName?: string) => void;
  handleContinue: () => void;
  setPhoneNumber: (phone: string) => void;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  form,
  handleChange,
  handleContinue,
  setPhoneNumber
}) => {
  const [countryCode, setCountryCode] = useState("+234");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,12}$/g.test(value)) {
      handleChange(e);
      setPhoneNumber(value);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-6">Verification</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Phone number</label>
        <div className="flex">
          <div className="relative">
            <select
              className="h-12 px-3 border border-r-0 rounded-l-md bg-white"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+234">+234</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
          </div>
          <TextInput
            className="w-full rounded-l-none"
            onChange={handlePhoneChange}
            value={form?.phoneNumber || ""}
            type="tel"
            name="phoneNumber"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
        paddingY="p-3.5"
        onClick={handleContinue}
      >
        Send verification code
      </Button>
    </div>
  );
};

export default VerificationStep;
