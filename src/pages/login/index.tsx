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
import StaticLayout from "../../components/pages/auth/create-account/StaticLayout";

function Login() {
  const router = useRouter();
  const [, setCookie] = useCookies(["data", "form"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      if (res?.message === "Pending Verification") {
        notification({
          title: "Email Not Verified",
          message:
            "You are yet to verify your email address. Kindly input the OTP that has been sent to your email in the form below",
          type: "warning",
        });
        setCookie("form", { email });
        router?.push("/signup?stage=validateOtp");
      } else {
        setCookie("data", res?.data, { secure: true, sameSite: true });
        const userRole = res?.data?.role || res?.data?.userType;
        if (userRole === "buyer") {
          router?.push("/buyer/dashboard");
        } else {
          router?.push("/dashboard");
        }
      }
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!(email && password)) {
      notification({
        title: "Form Error",
        message: "Please, enter your email and password",
        type: "danger",
      });
      return;
    }

    loginMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/auth/login",
      extra: "",
      method: "POST",
      body: { email, password },
    });
  };

  const { isLoading, isSuccess } = loginMutation;

  return (
    <div className="min-h-screen bg-white lg:flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-20">
        <form className="w-full max-w-md px-6 py-8" onSubmit={handleLogin}>
          {(isLoading || isSuccess) && <Loading />}

          <ClickableLogo className="mb-10" />

          <h1 className="w-full text-textColor ff-bold text-xl mb-5">Log in</h1>

          <div className="w-full">
            <TextInput
              className="w-full mb-7"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              label="Email Address"
              placeholder="Email Address"
            />

            <TextInput
              className="w-full mb-3"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
            />

            <p className="mb-7">
              Forgot Password?&nbsp;
              <Link href="/reset-password">
                <span className="text-success cursor-pointer">Reset here</span>
              </Link>
            </p>

            <Button
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-3.5"
              type="submit"
            >
              Log in
            </Button>
          </div>

          <p className="mt-5 text-center">
            Don't have an account?&nbsp;
            <Link href="/">
              <span className="text-success cursor-pointer">
                Create an account
              </span>
            </Link>
          </p>
        </form>
      </div>

      {/* Right side */}
      <StaticLayout />
    </div>
  );
}

export default Login;