import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthCode from "react-auth-code-input";

import Button from "../../components/inputs/Button";
import Loading from "../../components/common/Loading";

import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";

import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import StaticLayout from "../../components/pages/auth/StaticLayout";

const RESEND_COOLDOWN_SECONDS = 60;

function VerifyResetOtp() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["resetPassword"]);
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const email = cookies?.resetPassword?.email || "";
  const maskedEmail = email
    ? email.replace(/^(.{4}).+(@.+)$/, "$1*****$2")
    : "";

  useEffect(() => {
    if (!email) router.replace("/reset-password");
  }, [email, router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const verifyMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setCookie(
        "resetPassword",
        { email, otp },
        { secure: true, sameSite: true },
      );
      router.push("/new-password");
    },
    onError: (err: any) => {
      notification({
        title: "Verification Failed",
        message: err?.toString() || "Invalid or expired code.",
        type: "danger",
      });
    },
  });

  const resendMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Code Sent",
        message: `A new code has been sent to ${maskedEmail}`,
        type: "success",
      });
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    },
    onError: (err: any) => {
      notification({
        title: "Resend Failed",
        message: err?.toString() || "Could not resend code. Please try again.",
        type: "danger",
      });
    },
  });

  const handleVerify = () => {
    if (otp.length < 6) {
      notification({
        title: "Form Error",
        message: "Please enter the full 6-digit code",
        type: "danger",
      });
      return;
    }

    verifyMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "auth",
      extra: "verify-reset-code",
      method: "POST",
      body: { email, otp },
    });
  };

  const handleResend = () => {
    if (resendCooldown > 0 || resendMutation.isLoading) return;

    resendMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "auth",
      extra: "forgot-password",
      method: "POST",
      body: { email },
    });
  };

  const { isLoading, isSuccess } = verifyMutation;

  return (
    <div className="min-h-screen bg-[#F4F5F9] lg:flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-12">
          {(isLoading || isSuccess || resendMutation.isLoading) && <Loading />}

          <ClickableLogo className="mb-10" />

          <h1 className="w-full text-textColor ff-bold text-2xl mb-2">
            Enter Verification Code
          </h1>
          <p className="text-sm text-textColor/70 mb-10">
            A code has been sent to {maskedEmail} to verify it&apos;s you
          </p>

          <div className="mb-10 w-full">
            <AuthCode
              isPassword
              allowedCharacters="numeric"
              containerClassName="w-full flex justify-between mb-2"
              inputClassName="w-[15%] rounded h-16 border border-[#777] text-center"
              onChange={(val: string) => setOtp(val)}
            />
          </div>

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            onClick={handleVerify}
          >
            Verify Code
          </Button>

          <p className="mt-6 text-center text-sm text-textColor">
            Didn&apos;t get the code?&nbsp;
            {resendCooldown > 0 ? (
              <span className="text-gray-400 font-medium">
                Resend in {resendCooldown}s
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendMutation.isLoading}
                className="text-[#A3195B] font-medium disabled:opacity-50"
              >
                Resend Code
              </button>
            )}
          </p>

          <p className="mt-4 text-center text-sm">
            <Link href="/">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Back to Login
              </span>
            </Link>
          </p>
        </div>
      </div>

      <StaticLayout />
    </div>
  );
}

export default VerifyResetOtp;