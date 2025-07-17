/* eslint-disable no-duplicate-imports */
"use client";
import type React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";

import AuthCode from "react-auth-code-input";

import Button from "../../../../inputs/Button";
import Loading from "../../../../common/Loading";
import notification from "../../../../../utilities/notification";
import handleFetch from "../../../../../services/api/handleFetch";

interface VerificationCodeStepProps {
  phoneNumber: string
  handleSubmit: () => void
}

export default function VerificationCodeStep({ phoneNumber, handleSubmit }: VerificationCodeStepProps) {
  const [cookie] = useCookies(["form", "data"]);
  const [otp, setOtp] = useState("");

  const activationMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.data?.message || "Successful account verification.",
        type: "success"
      });
      handleSubmit();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const resendMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.data?.message || "Verification code resent successfully",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleValidateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      notification({
        title: "Form Error",
        message: "Please, enter a valid verification code",
        type: "danger"
      });
      return;
    }

    const body = { email: cookie.form?.email, otp };
    activationMutation.mutate({
      endpoint: "auth",
      extra: "validate-otp",
      method: "POST",
      body
    });
  };

  const resendOtp = () => {
    const body = { email: cookie.form?.email, purpose: "Onboarding" };
    resendMutation.mutate({
      endpoint: "auth",
      extra: "resend-otp",
      method: "POST",
      body
    });
  };

  const { isLoading, isSuccess } = activationMutation;
  const { isLoading: resendingOtp } = resendMutation;

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-bold mb-2">Enter verification code</h1>
      <p className="text-center text-gray-500 mb-8">
        {`Proceed to your email (${cookie.form?.email || "your email"}) to get code`}
      </p>

      {(isLoading || isSuccess) && <Loading />}
      {resendingOtp && <Loading />}

      <form onSubmit={handleValidateToken}>
        <div className="mb-6">
          <AuthCode
            isPassword
            allowedCharacters="numeric"
            containerClassName="w-full flex justify-between mb-2"
            inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
            onChange={(val: string) => setOtp(val)}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-500">{"Didn't receive code?"}</span>
          <button
            type="button"
            onClick={resendOtp}
            className="text-sm text-purple-600 hover:text-purple-700"
            disabled={resendingOtp}
          >
            Resend
          </button>
        </div>

        <Button
          className="w-full text-lg font-bold rounded-md bg-purple-600 hover:bg-purple-700 py-3.5"
          type="submit"
          disabled={isLoading}
        >
          Next
        </Button>

        <p className="mt-4 text-center text-sm text-gray-500">
          We sent it to {phoneNumber ? `+234 ${phoneNumber}` : "your phone"}{" "}
          <button type="button" className="text-purple-600">
            Change
          </button>
        </p>
      </form>
    </div>
  );
}
