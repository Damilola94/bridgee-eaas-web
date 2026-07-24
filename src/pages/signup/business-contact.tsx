// pages/signup/business-contact.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

import TextInput from "../../components/inputs/Text";
import Button from "../../components/inputs/Button";
import PhoneInput from "../../components/inputs/PhoneInput";
import Stepper from "./Stepper";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";

const STEPS = [
  { label: "Company Information" },
  { label: "Business Contact Information" },
  { label: "Email Verification" },
];

export default function BusinessContact() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [bvn, setBvn] = useState("");
  const [bvnValidated, setBvnValidated] = useState(false);

  const validateBvnMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setBvnValidated(true);
      notification({
        title: "Identity Validated",
        message: "Your BVN was validated successfully.",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Validation Failed",
        message: err?.toString() || "Unable to validate this BVN.",
        type: "danger",
      });
    },
  });

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => router.push("/signup/email-verification"),
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleValidateIdentity = () => {
    if (!bvn) {
      notification({
        title: "Form Error",
        message: "Please enter your BVN",
        type: "danger",
      });
      return;
    }
    validateBvnMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/business/validate-bvn",
      extra: "",
      method: "POST",
      body: { bvn },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !(
        fullName &&
        phone &&
        email &&
        designation &&
        password &&
        confirmPassword
      )
    ) {
      notification({
        title: "Form Error",
        message: "Please fill in all required fields",
        type: "danger",
      });
      return;
    }
    if (password !== confirmPassword) {
      notification({
        title: "Form Error",
        message: "Passwords do not match",
        type: "danger",
      });
      return;
    }

    saveMutation.mutate({
      service: "identity-service/",
      endpoint: "api/v1/business/contact-information",
      extra: "",
      method: "POST",
      body: { fullName, phone, email, designation, password, bvn },
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
          <ClickableLogo className="mb-10" />
          <div className="w-16" />
        </div>

        <Stepper steps={STEPS} currentStep={1} />

        <form className="px-10 py-8" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-textColor mb-2">
            Full name <span className="text-red-500">*</span>
          </label>
          <TextInput
            className="w-full mb-6"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="fullName"
            placeholder="Enter Full Name"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="mb-6">
            <PhoneInput
              value={phone}
              onChange={setPhone}
              placeholder="Enter Phone Number"
            />
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <TextInput
            className="w-full mb-6"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter Email Address"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Designation <span className="text-red-500">*</span>
          </label>
          <TextInput
            className="w-full mb-6"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            name="designation"
            placeholder="Enter Designation"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Create Password <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-6">
            <TextInput
              className="w-full"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative mb-6">
            <TextInput
              className="w-full"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            BVN
          </label>
          <div className="flex gap-3 mb-3">
            <TextInput
              className="flex-1"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              name="bvn"
              placeholder="e.g 7363525155"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleValidateIdentity}
              loading={validateBvnMutation.isLoading}
              className="!border-[#A3195B] !text-[#A3195B] whitespace-nowrap"
            >
              Validate Identity
            </Button>
          </div>

          <div className="mb-8">
            <p className="text-sm font-medium text-textColor mb-1">
              Verification requirements:
            </p>
            <ul className="text-sm text-gray-500 space-y-0.5">
              <li>
                <span className="text-red-500">*</span> Lorem Ispum
              </li>
              <li>
                <span className="text-red-500">*</span> Lorem Ispum
              </li>
              <li>
                <span className="text-red-500">*</span> Lorem Ispum
              </li>
            </ul>
          </div>

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            type="submit"
            loading={saveMutation.isLoading}
          >
            Save & Proceed
          </Button>

          <p className="mt-6 text-center text-sm">
            Already have an account?&nbsp;
            <Link href="/login">
              <span className="text-[#A3195B] cursor-pointer font-medium">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
