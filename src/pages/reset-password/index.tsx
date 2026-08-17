import React, { useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import TextInput from "../../components/inputs/Text";
import Button from "../../components/inputs/Button";
import Loading from "../../components/common/Loading";

import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";

import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import StaticLayout from "../../components/pages/auth/StaticLayout";

function ResetPassword() {
  const router = useRouter();
  const [, setCookie] = useCookies(["resetPassword"]);
  const [email, setEmail] = useState("");

  const forgotPasswordMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "OTP Sent",
        message: `A verification code has been sent to ${email}`,
        type: "success",
      });
      setCookie("resetPassword", { email }, { secure: true, sameSite: true });
      router.push("/verify-otp");
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      notification({
        title: "Form Error",
        message: "Please enter your email address",
        type: "danger",
      });
      return;
    }

    forgotPasswordMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "auth",
      extra: "forgot-password",
      method: "POST",
      body: { email },
    });
  };

  const { isLoading, isSuccess } = forgotPasswordMutation;

  return (
    <div className="min-h-screen bg-[#F4F5F9] lg:flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-4 py-10">
        <form
          className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-12"
          onSubmit={handleSubmit}
        >
          {(isLoading || isSuccess) && <Loading />}

          <ClickableLogo className="mb-10" />

          <h1 className="w-full text-textColor ff-bold text-2xl mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-textColor/70 mb-8">
            Enter your email address and we&apos;ll send you a code to reset
            your password.
          </p>

          <div className="w-full">
            <label className="block text-sm font-medium text-textColor mb-2">
              Email Address
            </label>
            <TextInput
              className="w-full mb-8"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              placeholder="Enter Email Address"
            />

            <Button
              className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
              paddingY="p-3.5"
              type="submit"
            >
              Send Code
            </Button>
          </div>

          <p className="mt-6 text-center text-sm">
            Remember your password?&nbsp;
            <Link href="/">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>

      <StaticLayout />
    </div>
  );
}

export default ResetPassword;