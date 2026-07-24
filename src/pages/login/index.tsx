import React, { useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import TextInput from "../../components/inputs/Text";
import Button from "../../components/inputs/Button";
import Loading from "../../components/common/Loading";

import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";

import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import StaticLayout from "../../components/pages/auth/create-account/StaticLayout";
import { LoginResponse } from "../../types/auth";

function Login() {
  const router = useRouter();
  const [, setCookie] = useCookies(["data", "form"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation(handleFetch, {
    onSuccess: (res: LoginResponse) => {
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
        const userRole = res?.data?.activeRole || res?.data?.roles?.[0];

        router?.push("/dashboard");
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
    <div className="min-h-screen bg-[#F4F5F9] lg:flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-4 py-10">
        <form
          className="w-full max-w-md bg-white rounded-3xl shadow-sm px-10 py-12"
          onSubmit={handleLogin}
        >
          {(isLoading || isSuccess) && <Loading />}

          <ClickableLogo className="mb-10" />

          <h1 className="w-full text-textColor ff-bold text-2xl mb-8">
            Login
          </h1>

          <div className="w-full">
            <label className="block text-sm font-medium text-textColor mb-2">
              Email Address
            </label>
            <TextInput
              className="w-full mb-6"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              placeholder="Enter Email Address"
            />

            <label className="block text-sm font-medium text-textColor mb-2">
              Password
            </label>
            <div className="relative mb-3">
              <TextInput
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mb-7 text-sm">
              Forgot Password?&nbsp;
              <Link href="/reset-password">
                <span className="text-[#A3195B] cursor-pointer font-medium">
                  Reset here
                </span>
              </Link>
            </p>

            <Button
              className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
              paddingY="p-3.5"
              type="submit"
            >
              Login
            </Button>
          </div>

          <p className="mt-6 text-center text-sm">
            New User?&nbsp;
            <Link href="/create-account">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Signup
              </span>
            </Link>
          </p>
        </form>
      </div>

      <StaticLayout />
    </div>
  );
}

export default Login;