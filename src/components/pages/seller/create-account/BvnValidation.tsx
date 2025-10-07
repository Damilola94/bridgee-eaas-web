"use client";

import React, { useState, useEffect } from "react";
import TextInput from "../../../inputs/Text";
import { StepData } from "../../../../pages/seller/create-account";
import Button from "../../../inputs/Button";

interface Props {
  formData?: StepData;
  setFormData?: (data: StepData) => void;
  onNavigateNext?: () => void;
}

export default function BvnValidation({
  formData,
  setFormData,
  onNavigateNext,
}: Props) {
  const [bvn, setBvn] = useState(formData?.bvn || "");
  const [isBvnValid, setIsBvnValid] = useState(false);

  // Use useEffect to check BVN length whenever it changes
  useEffect(() => {
    setIsBvnValid(bvn.length === 11);
  }, [bvn]);

  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure only numbers up to 11 digits are entered
    if (/^\d{0,11}$/.test(value)) {
      setBvn(value);
      if (setFormData) {
        setFormData({ ...formData, bvn: value } as StepData);
      }
    }
  };

  const handleNext = () => {
    if (onNavigateNext) {
      onNavigateNext();
    }
  };

  return (
    <>
      <div className="mb-4">
        <TextInput
          className="w-full mb-3"
          value={bvn}
          onChange={handleBvnChange}
          type="text"
          label="BVN Validation"
          name="bvn"
          placeholder="Enter your 11-digit BVN"
        />
      </div>
      <p className="text-sm font-medium text-grey">
        Your BVN is required to validate your details. To get your BVN dial
        *565*0# on your registered number.
      </p>

      <Button
        onClick={handleNext}
        disabled={!isBvnValid}
        className="w-full h-12 bg-success text-white rounded-lg mt-10"
      >
        Next
      </Button>
    </>
  );
}
