// pages/signup/business-contact.tsx
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { ChevronLeft, BadgeCheck } from "lucide-react";

import TextInput from "../../components/inputs/Text";
import Button from "../../components/inputs/Button";
import Loading from "../../components/common/Loading";
import PhoneInput from "../../components/inputs/PhoneInput";
import Stepper from "./Stepper";
import notification from "../../utilities/notification";
import handleFetch from "../../services/api/handleFetch";
import ClickableLogo from "../../components/pages/auth/ClickableLogo";
import { useSignupContext } from "../../context/Signupcontext";
import LiveSelfieCapture from "./live-selfie-capture";

const STEPS = [
  { label: "Company Information" },
  { label: "Business Contact Information" },
  { label: "Email Verification" },
];

export default function BusinessContact() {
  const router = useRouter();
  const [, setCookie] = useCookies(["form"]);
  const { data, updateSignupData } = useSignupContext();

  React.useEffect(() => {
    if (!data.companyName && !data.cacFile) {
      router.replace("/signup/company-information");
    }
  }, []);

  const [bvn, setBvn] = useState(data.bvn || "");
  const [selfie, setSelfie] = useState<File | null>(data.selfie || null);
  const [bvnVerifiedName, setBvnVerifiedName] = useState(
    data.bvnVerifiedName || "",
  );

  const [fullName, setFullName] = useState(data.fullName || "");
  const [contactPhoneNumber, setContactPhoneNumber] = useState(
    data.contactPhoneNumber || "",
  );
  const [contactEmail, setContactEmail] = useState(data.contactEmail || "");
  const [designation, setDesignation] = useState(data.designation || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateBvnMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      const verifiedName = res?.data?.verifiedName || "";
      setBvnVerifiedName(verifiedName);
      notification({
        title: "BVN Verified",
        message: "Your BVN has been validated successfully.",
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

  const registerMutation = useMutation(handleFetch, {
    onSuccess: () => {
      setCookie("form", { email: contactEmail });
      router.push("/signup/email-verification");
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleValidateBvn = () => {
    if (!bvn || !selfie) {
      notification({
        title: "Form Error",
        message: "Please enter your BVN and upload a selfie",
        type: "danger",
      });
      return;
    }

    const formData = new FormData();
    formData.append("Bvn", bvn);
    formData.append("Selfie", selfie);

    validateBvnMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "onboarding",
      extra: "validate-bvn",
      method: "POST",
      body: formData,
      multipart: true,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bvnVerifiedName) {
      notification({
        title: "Form Error",
        message: "Please validate your BVN first",
        type: "danger",
      });
      return;
    }

    if (
      !fullName ||
      !contactPhoneNumber ||
      !contactEmail ||
      !designation ||
      !password
    ) {
      notification({
        title: "Form Error",
        message: "Please fill in all business contact fields",
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

    updateSignupData({
      bvn,
      selfie,
      bvnVerifiedName,
      fullName,
      contactPhoneNumber,
      contactEmail,
      designation,
      password,
    });

    const formData = new FormData();
    formData.append("isRegistered", String(Boolean(data.isRegistered)));
    formData.append("cacNumber", data.cacNumber || "");
    formData.append("bvn", bvn);
    formData.append("bvnVerifiedName", bvnVerifiedName);
    formData.append("companyName", data.companyName || "");
    formData.append("businessType", data.businessType || "");
    formData.append("companyAddress", data.companyAddress || "");
    formData.append("companyPhone", data.companyPhone || "");
    formData.append("companyEmail", data.companyEmail || "");
    formData.append("tin", data.tin || "");
    if (data.cacFile) formData.append("cacCertificate", data.cacFile);
    if (data.utilityBill) formData.append("utilityBill", data.utilityBill);
    formData.append("fullName", fullName);
    formData.append("contactPhoneNumber", contactPhoneNumber);
    formData.append("contactEmail", contactEmail);
    formData.append("designation", designation);
    formData.append("password", password);

    registerMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "onboarding",
      extra: "register",
      method: "POST",
      body: formData,
      multipart: true,
    });
  };

  const { isLoading: isValidatingBvn } = validateBvnMutation;
  const { isLoading: isRegistering } = registerMutation;

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

        <form className="px-10 py-8" onSubmit={handleRegister}>
          {(isValidatingBvn || isRegistering) && <Loading />}

          <label className="block text-sm font-medium text-textColor mb-2">
            BVN
          </label>
          <div className="flex gap-3 mb-2">
            <TextInput
              className="flex-1"
              value={bvn}
              onChange={(e) => setBvn(e.target.value)}
              name="bvn"
              maxValue={11}
              placeholder="Enter your BVN"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleValidateBvn}
              loading={validateBvnMutation.isLoading}
              className="!border-[#A3195B] !text-[#A3195B] whitespace-nowrap"
            >
              Validate
            </Button>
          </div>
          {bvnVerifiedName && (
            <div className="flex items-center gap-1.5 mb-6 text-sm text-gray-600">
              {bvnVerifiedName}
              <BadgeCheck size={16} className="text-green-600" />
            </div>
          )}

          <div className="mb-6">
            <LiveSelfieCapture
              label="Take a live selfie"
              required
              capturedFile={selfie}
              onChange={setSelfie}
            />
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            Full Name
          </label>
          <TextInput
            className="w-full mb-6"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            name="fullName"
            placeholder="Enter your full name"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Contact Phone Number
          </label>
          <div className="mb-6">
            <PhoneInput
              value={contactPhoneNumber}
              onChange={setContactPhoneNumber}
              placeholder="08152536637"
            />
          </div>

          <label className="block text-sm font-medium text-textColor mb-2">
            Contact Email Address
          </label>
          <TextInput
            className="w-full mb-6"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            name="contactEmail"
            placeholder="you@company.com"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Designation
          </label>
          <TextInput
            className="w-full mb-6"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            name="designation"
            placeholder="e.g Managing Director"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Password
          </label>
          <TextInput
            className="w-full mb-6"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            placeholder="Enter a password"
          />

          <label className="block text-sm font-medium text-textColor mb-2">
            Confirm Password
          </label>
          <TextInput
            className="w-full mb-8"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            placeholder="Re-enter your password"
          />

          <Button
            className="w-full text-lg ff-bold !rounded-xl !bg-[#A3195B] hover:!bg-[#8a1550]"
            paddingY="p-3.5"
            type="submit"
            loading={registerMutation.isLoading}
          >
            Submit & Continue
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

