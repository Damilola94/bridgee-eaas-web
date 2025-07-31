/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { CheckCircle } from "lucide-react";
import moment from "moment-timezone";

import ClickableLogo from "../ClickableLogo";
import notification from "../../../../utilities/notification";
import handleFetch from "../../../../services/api/handleFetch";
import { MIN_AGE } from "../../../../data/constants";

import BvnStep from "./steps/bvn-step";
import EmailStep from "./steps/email-step";
import PersonalInfoStep from "./steps/personal-info-step";
import VerificationStep from "./steps/verification-step";
import VerificationCodeStep from "./steps/verification-code-step";
import PasswordStep from "./steps/password-step";
import SuccessStep from "./steps/success-step";
import AccountTypeStep from "./steps/account-type-step";

interface SignupFormProps {
  bvn?: string;
  email?: string;
  isBusiness?: string;
  businessName?: string;
  businessType?: { value: string; label: string };
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  password?: string;
  termsAccepted?: string;
}

export default function SignupStepper() {
  const [cookie, setCookie] = useCookies(["data", "form"]);
  const [form, setForm] = useState<SignupFormProps>({ isBusiness: "false" });
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bvnData, setBvnData] = useState<any>(null);

  const steps = [
    { id: "bvn", label: "BVN" },
    { id: "email", label: "Email" },
    { id: "accountType", label: "Account Type" },
    { id: "personal", label: "Personal Info" },
    { id: "verification", label: "Verification" },
    { id: "password", label: "Password" }
  ];

  const handleChange = (val: any, type = "input", inputName = "") => {
    if (type === "input") {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const signupMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Account created successfully",
        type: "success"
      });
      setCookie("form", form);
      goToNextStep();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const validateEmailStep = () => {
    const errors = [];
    if (!form?.email) errors.push("Email address is required");
    if (
      !/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(
        form?.email || ""
      )
    ) {
      errors.push("Please enter a valid email");
    }
    if (form?.termsAccepted !== "true")
      errors.push("Please accept terms and conditions to proceed");
    return errors;
  };

  const validateAccountTypeStep = () => {
    const errors = [];
    if (form?.isBusiness === "true") {
      if (!form?.businessName) errors.push("Business name is required");
      if (!form?.businessType?.value) errors.push("Business type is required");
    }
    return errors;
  };

  const validatePersonalInfoStep = () => {
    const errors = [];
    const firstName = bvnData?.firstName || form?.firstName;
    const lastName = bvnData?.lastName || form?.lastName;
    const dateOfBirth = bvnData?.dateOfBirth || form?.dateOfBirth;

    if (!firstName) errors.push("First name is required");
    if (!lastName) errors.push("Last name is required");
    if (!dateOfBirth) errors.push("Date of birth is required");

    if (dateOfBirth) {
      const dobToCheck = bvnData?.dateOfBirth
        ? new Date(bvnData.dateOfBirth)
        : new Date(dateOfBirth);
      if (moment().diff(moment(dobToCheck), "years") < MIN_AGE) {
        errors.push("Date of birth must not be less than 18 years");
      }
    }
    return errors;
  };

  const validateVerificationStep = () => {
    const errors = [];
    if (!form?.phoneNumber) errors.push("Phone number is required");
    if (form?.phoneNumber && form?.phoneNumber?.length !== 11)
      errors.push("Phone number is not valid");
    return errors;
  };

  const validatePasswordStep = () => {
    const errors = [];
    if (!form?.password) errors.push("Password is required");
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&~`'"])[A-Za-z\d@$#!%*?&~`'"]{8,}$/.test(
        form?.password || ""
      )
    ) {
      errors.push(
        "Your password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character (@$#!%*?&~`')"
      );
    }
    return errors;
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
    case 0:
      return [];
    case 1:
      return validateEmailStep();
    case 2:
      return validateAccountTypeStep();
    case 3:
      return validatePersonalInfoStep();
    case 4:
      return validateVerificationStep();
    case 5:
      return validatePasswordStep();
    default:
      return [];
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length || currentStep === steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContinue = async (bvnValidationData?: any) => {
    if (currentStep === 0 && bvnValidationData) {
      setBvnData(bvnValidationData);
      setForm((prev) => ({
        ...prev,
        bvn: bvnValidationData.bvn,
        firstName: bvnValidationData.firstName,
        lastName: bvnValidationData.lastName,
        dateOfBirth: bvnValidationData.dateOfBirth,
        gender: bvnValidationData.gender
      }));
      goToNextStep();
      return;
    }

    const errors = validateCurrentStep();
    if (errors.length) {
      errors.forEach((item) =>
        notification({ title: "Form Error", message: item, type: "danger" })
      );
      return;
    }

    if (currentStep === 5) {
      const inputDate = bvnData?.dateOfBirth;
      const formattedDate = moment(inputDate, "DD-MMM-YYYY").format(
        "YYYY-MM-DD"
      );
      const body = {
        ...form,
        bvn: bvnData?.bvn || form?.bvn,
        firstName: bvnData?.firstName || form?.firstName,
        lastName: bvnData?.lastName || form?.lastName,
        dateOfBirth: formattedDate || form?.dateOfBirth,
        gender: bvnData?.gender || form?.gender,
        isBusiness: form?.isBusiness === "true",
        businessType: form?.businessType?.value,
        termsAccepted: form?.termsAccepted === "true"
      };
      signupMutation.mutate({
        endpoint: "auth",
        extra: "register",
        method: "POST",
        body
      });
    } else {
      goToNextStep();
    }
  };

  const handleVerificationCodeSubmit = () => {
    goToNextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
    case 0:
      return (
        <BvnStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
        />
      );
    case 1:
      return (
        <EmailStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
        />
      );
    case 2:
      return (
        <AccountTypeStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
        />
      );
    case 3:
      return (
        <PersonalInfoStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
          bvnData={bvnData}
        />
      );
    case 4:
      return (
        <VerificationStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
          setPhoneNumber={setPhoneNumber}
        />
      );
    case 5:
      return (
        <PasswordStep
          form={form}
          handleChange={handleChange}
          handleContinue={handleContinue}
          isLoading={signupMutation.isLoading}
        />
      );
    case 6:
      return (
        <VerificationCodeStep
          phoneNumber={phoneNumber}
          handleSubmit={handleVerificationCodeSubmit}
        />
      );
    case 7:
      return <SuccessStep />;
    default:
      return null;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="w-full border-b px-4 sm:px-8 py-4">
        <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center lg:gap-80 gap-10">
          <ClickableLogo />

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-1">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    index < currentStep
                      ? "border-[#D31FFF] text-[#D31FFF]"
                      : index === currentStep
                        ? "border-2 border-purple-600 text-purple-600"
                        : "border-2 border-gray-300 text-gray-300"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    index <= currentStep ? "text-[#D31FFF]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentStep > 0 && currentStep < 7 && (
        <div className="border flex items-center p-3 w-fit mx-4 sm:mx-8 my-4 rounded-xl border-blue-600">
          <button
            onClick={goToPreviousStep}
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center px-4 sm:px-0">
        <div className="w-full max-w-2xl px-4 py-10">{renderStep()}</div>
      </div>
    </div>
  );
}
