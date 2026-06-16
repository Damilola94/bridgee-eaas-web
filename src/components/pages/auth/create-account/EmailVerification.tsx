import React, { useState } from "react";
import { useMutation } from "react-query";
import AuthCode from "react-auth-code-input";
import Button from "../../../inputs/Button";
import {
  OnboardingStepData,
  OtpSendResponse,
  OtpVerifyResponse,
} from "../../../../types/auth";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

interface Props {
  formData: OnboardingStepData;
  setFormData: (data: OnboardingStepData) => void;
  onNavigateNext?: () => void;
  isSeller?: boolean;
}

export default function EmailVerification({
  formData,
  setFormData,
  onNavigateNext,
  isSeller = true,
}: Props) {
  const [otp, setOtp] = useState("");

  const verifyMutation = useMutation(handleFetch, {
    onSuccess: (response: OtpVerifyResponse) => {
      notification({
        message: "Email verified successfully!",
        type: "success",
      });

      setFormData({
        ...formData,
        otpValidationTicket: response.data,
      });

      if (onNavigateNext) {
        onNavigateNext();
      }
    },
    onError: (error: any) => {
      notification({
        title: "Verification Failed",
        message: error?.message || "Invalid code, please try again",
        type: "danger",
      });
    },
  });

  const resendMutation = useMutation(handleFetch, {
    onSuccess: (response: OtpSendResponse) => {
      notification({
        message: "Verification code resent successfully",
        type: "success",
      });
    },
    onError: (error: any) => {
      notification({
        title: "Error",
        message: error?.message || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleVerify = () => {
    const email = formData.personalInfo.emailAddress;
    if (!otp.trim()) {
      notification({
        message: "Please enter the verification code",
        type: "danger",
      });
      return;
    }
    verifyMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/otp/verify",
      method: "POST",
      body: {
        identifier: email,
        otp: otp,
        purpose: "EmailConfirmation",
      },
    });
  };

  const resendOtp = () => {
    const email = formData.personalInfo.emailAddress;
    resendMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/otp/send",
      method: "POST",
      body: {
        identifier: email,
        purpose: "EmailConfirmation",
        recipientName: "",
      },
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-[#808080]">
        A code has been sent to your email, proceed to your email to get the code.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
        <div className="mb-6">
          <AuthCode
            isPassword
            allowedCharacters="numeric"
            containerClassName="w-full flex justify-between mb-2"
            inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
            onChange={(val: string) => setOtp(val)}
          />
        </div>

        <div className="flex gap-x-2 items-center mb-4">
          <span className="text-sm text-black">{"Didn't receive OTP?"}</span>
          <button
            type="button"
            onClick={resendOtp}
            className="text-sm text-success cursor-pointer hover:text-purple-700"
            disabled={resendMutation.isLoading}
          >
            Resend
          </button>
        </div>

        <Button
          onClick={handleVerify}
          disabled={!/^\d{6}$/.test(otp) || verifyMutation.isLoading}
          className="w-full h-12 bg-success text-white rounded-lg mt-10"
        >
          {verifyMutation.isLoading ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
    </div>
  );
}