/* eslint-disable no-duplicate-imports */
"use client";

import type React from "react";
import { useState } from "react";
import { useMutation } from "react-query";

import Button from "../../../../inputs/Button";
import Loading from "../../../../common/Loading";
import notification from "../../../../../utilities/notification";
import handleFetch from "../../../../../services/api/handleFetch";
import TextInput from "../../../../inputs/Text";

interface BvnStepProps {
  form: any
  handleChange: (val: any, type?: string, inputName?: string) => void
  handleContinue: (bvnData?: any) => void
}

const BvnStep: React.FC<BvnStepProps> = ({ handleContinue }) => {
  const [bvn, setBvn] = useState("");

  const bvnMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: "BVN validated successfully",
        type: "success"
      });

      const bvnData = {
        firstName: res?.firstName,
        lastName: res?.lastName,
        dateOfBirth: res?.dateOfBirth,
        gender: res?.gender,
        bvn: bvn
      };
      handleContinue(bvnData);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "BVN validation failed.",
        type: "danger"
      });
    }
  });

  const handleBvnValidation = () => {
    if (!bvn || bvn.length !== 11) {
      notification({
        title: "Form Error",
        message: "Please enter a valid 11-digit BVN",
        type: "danger"
      });
      return;
    }

    const body = { bvn };
    bvnMutation.mutate({
      endpoint: "user",
      extra: "add-and-validate-bvn",
      method: "POST",
      body
    });
  };

  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,11}$/.test(value)) {
      setBvn(value);
    }
  };

  return (
    <div className="w-full">
      {bvnMutation.isLoading && <Loading />}
      <h1 className="text-center text-textColor ff-bold text-3xl mb-2">Verify Your Identity</h1>
      <p className="text-center text-gray-500 mb-20">
        Please enter your Bank Verification Number (BVN) to verify your identity
      </p>

      <div className="mb-6">

        <TextInput
          className="w-full mb-3"
          value={bvn}
          onChange={handleBvnChange}
          type="text"
          label="Enter your BVN"
          name="password"
          maxValue={11}
          disabled={bvnMutation.isLoading}
          placeholder="Enter your 11-digit BVN"
        />
      </div>

      <Button
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-[#D31FFF] hover:bg-[#B818DE]"
        paddingY="p-3.5"
        onClick={handleBvnValidation}
        disabled={bvnMutation.isLoading}
      >
        {bvnMutation.isLoading ? "Validating..." : "Validate BVN"}
      </Button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Your BVN is used to verify your identity and will be kept secure
      </p>
    </div>
  );
};

export default BvnStep;
