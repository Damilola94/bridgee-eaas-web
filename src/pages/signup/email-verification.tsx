// pages/signup/email-verification.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import Button from "../../components/inputs/Button";
import OtpInput from "../../components/inputs/OtpInput";
import Stepper from "./Stepper";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";

const STEPS = [
  { label: "Company Information" },
  { label: "Business Contact Information" },
  { label: "Email Verification" },
];

export default function EmailVerification() {
  const router = useRouter();
  const [cookies] = useCookies(["form"]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  // Masked email, falling back to a placeholder if the cookie isn't set yet
  const maskedEmail = cookies?.form?.email
    ? cookies.form.email.replace(/^(.{4}).+(@.+)$/, "$1*****$2")
    : "tolu*****@gmail.com";

  const verifyMutation = useMutation(handleFetch, {
    onSuccess: () => router.push("/signup/submitted"),
    onError: (err: any) => {
      notification({
        title: "Verification Failed",
        message: err?.toString() || "Invalid or expired OTP.",
        type: "danger",
      });
    },
  });

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 6) {
      notification({
        title: "Form Error",
        message: "Please enter the full 6-digit OTP",
        type: "danger",
      });
      return;
    }

    verifyMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/auth/verify-otp",
      extra: "",
      method: "POST",
      body: { otp: code },
    });
  };

  return (
    <div className="min-h-screen bg-[#F4F5F9] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm">
        <div className="flex items-center justify-between px-10 py-6 border-b border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1 text-sm border border-gray-200 rounded-lg px-3 py-1.5"
          >
            <ChevronLeft size={16} /> Back
          </button>
          <ClickableLogo className="mb-10" /> <div className="w-16" />
        </div>

        <Stepper steps={STEPS} currentStep={2} />

        <div className="px-10 py-16 flex flex-col items-center">
          <p className="text-center text-textColor mb-10 max-w-sm">
            An OTP has been sent to {maskedEmail} to verify your email address
          </p>

          <div className="mb-12">
            <OtpInput value={otp} onChange={setOtp} />
          </div>

          <Button
            className="w-full max-w-lg text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            onClick={handleVerify}
            loading={verifyMutation.isLoading}
          >
            Verify & Proceed
          </Button>

          <p className="mt-6 text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
