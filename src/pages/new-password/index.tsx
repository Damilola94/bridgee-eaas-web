import React, { useEffect, useState } from "react";
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

function NewPassword() {
  const router = useRouter();
  const [cookies, , removeCookie] = useCookies(["resetPassword"]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = cookies?.resetPassword?.email || "";
  const otp = cookies?.resetPassword?.otp || "";

  useEffect(() => {
    if (!email || !otp) router.replace("/reset-password");
  }, [email, otp, router]);

  const resetPasswordMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Password Reset",
        message: "Your password has been reset successfully. Please log in.",
        type: "success",
      });
      removeCookie("resetPassword");
      router.push("/");
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

    if (!newPassword || !confirmPassword) {
      notification({
        title: "Form Error",
        message: "Please fill in both password fields",
        type: "danger",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notification({
        title: "Form Error",
        message: "Passwords do not match",
        type: "danger",
      });
      return;
    }

    if (newPassword.length < 8) {
      notification({
        title: "Form Error",
        message: "Password must be at least 8 characters",
        type: "danger",
      });
      return;
    }

    resetPasswordMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "auth",
      extra: "reset-password",
      method: "POST",
      body: { email, otp, newPassword, confirmPassword },
    });
  };

  const { isLoading, isSuccess } = resetPasswordMutation;

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
            Set New Password
          </h1>
          <p className="text-sm text-textColor/70 mb-8">
            Your new password must be different from previously used
            passwords.
          </p>

          <div className="w-full">
            <label className="block text-sm font-medium text-textColor mb-2">
              New Password
            </label>
            <TextInput
              className="w-full mb-6"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              name="newPassword"
              type="password"
              placeholder="Enter New Password"
            />

            <label className="block text-sm font-medium text-textColor mb-2">
              Confirm Password
            </label>
            <TextInput
              className="w-full mb-8"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
            />

            <Button
              className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
              paddingY="p-3.5"
              type="submit"
            >
              Reset Password
            </Button>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link href="/">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Back to Login
              </span>
            </Link>
          </p>
        </form>
      </div>

      <StaticLayout />
    </div>
  );
}

export default NewPassword;