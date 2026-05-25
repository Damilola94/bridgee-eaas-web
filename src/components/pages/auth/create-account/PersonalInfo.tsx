import React, { useEffect, useState } from "react";

import { useMutation } from "react-query";

import TextInput from "../../../inputs/Text";
import { OnboardingStepData } from "../../../../types/auth";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import Button from "../../../inputs/Button";
import PhoneNumberInput from "../../../inputs/PhoneNumberInput";
import { removeNigerianCountryCode, sanitizeAlphaNumeric } from "../../../../utilities/general";

interface Props {
  formData: OnboardingStepData;
  setFormData: (data: OnboardingStepData) => void;
  onTermsChange?: (agreed: boolean) => void;
  onOtpSentSuccess?: () => void;
  isSeller?: boolean;
}

export default function PersonalInfo({
  formData,
  setFormData,
  onTermsChange,
  onOtpSentSuccess,
  isSeller = true
}: Props) {
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [countryCode, setCountryCode] = useState("NG");
  const [phoneWithoutCode, setPhoneWithoutCode] = useState("");

  const personalInfo = formData?.personalInfo || {};
  const firstName = personalInfo?.firstName || "";
  const lastName = personalInfo?.lastName || "";

  useEffect(() => {
    const phoneNumber = personalInfo?.phoneNumber || "";
    const initialPhoneWithoutCode = removeNigerianCountryCode(phoneNumber);

    setPhoneWithoutCode(initialPhoneWithoutCode);
  }, [personalInfo?.phoneNumber]);

  const sendOtpMutation = useMutation(handleFetch, {
    onSuccess: (response) => {
      notification({
        message: "Verification code sent to your email!",
        type: "success"
      });

      if (onOtpSentSuccess) {
        onOtpSentSuccess();
      }
    },
    onError: (error: any) => {
      notification({
        title: "Failed to send code",
        message: error?.message || "Please try again",
        type: "danger"
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (setFormData && formData) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [name]: value
        }
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const agreed = e.target.checked;
    setTermsAgreed(agreed);

    if (onTermsChange) {
      onTermsChange(agreed);
    }
  };

  const handleCountryCodeChange = (newCountryCode: string) => {
    setCountryCode(newCountryCode);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneWithoutCode(numericValue);

    if (setFormData && formData) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          phoneNumber: numericValue
        }
      });
    }
  };

  const handleSendOtp = () => {
    const email = formData.personalInfo.emailAddress;
    const recipientName = `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`;

    sendOtpMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/otp/send",
      method: "POST",
      body: {
        identifier: email,
        purpose: "EmailConfirmation",
        recipientName
      }
    });
  };

  const isFormValid =
    personalInfo.emailAddress?.trim() &&
    personalInfo.phoneNumber?.trim() &&
    (isSeller ? personalInfo.businessName?.trim() : true) &&
    personalInfo.password?.trim() &&
    termsAgreed;

  const checkPasswordRequirements = (password: string) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^a-zA-Z0-9]/.test(password)
    };
  };

  const password = personalInfo?.password || "";
  const requirements = checkPasswordRequirements(password);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-4">
        <TextInput
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleChange}
          disabled
          className=""
        />
        <TextInput
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleChange}
          disabled
          className=""
        />
      </div>

      <TextInput
        label="Email Address"
        name="emailAddress"
        type="email"
        placeholder="Email Address"
        value={personalInfo?.emailAddress || ""}
        onChange={handleChange}
        className=""
        autoComplete="off"
      />

      <PhoneNumberInput
        countryCode={countryCode}
        onCountryCodeChange={handleCountryCodeChange}
        phoneNumber={phoneWithoutCode}
        onPhoneNumberChange={handlePhoneNumberChange}
        className="w-full mb-5"
        label="Phone Number"
        placeholder="Phone Number (10 Digits)"
        autoComplete="off"
      />

      {isSeller && (
      <TextInput
      label="Business Name"
      name="businessName"
      placeholder="Enter Business Name"
      value={personalInfo?.businessName || ""}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = sanitizeAlphaNumeric(e.target.value);
    
        setFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            businessName: sanitizedValue,
          },
        });
      }}
      className=""
      autoComplete="off"
    />
      )}
      
      <TextInput
        className="w-full mb-3"
        onChange={handleChange}
        value={personalInfo?.partnerCode || ''}
        type="text"
        label="Referral Code"
        name="partnerCode"
        placeholder="Enter Referral Code"
        autoComplete="new-password"
      />

      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password"
        value={personalInfo?.password || ""}
        onChange={handleChange}
        className=""
        autoComplete="new-password"
      />

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Password must contain:</p>
        <ul className="text-sm space-y-1">
          <li
            className={`flex items-center ${requirements.minLength ? "text-[#059669]" : "text-red-600"
            }`}
          >
            {requirements.minLength ? "✓" : "✗"} At least 8 characters
          </li>
          <li
            className={`flex items-center ${requirements.hasUppercase ? "text-[#059669]" : "text-red-600"
            }`}
          >
            {requirements.hasUppercase ? "✓" : "✗"} At least one uppercase
            letter
          </li>
          <li
            className={`flex items-center ${requirements.hasLowercase ? "text-[#059669]" : "text-red-600"
            }`}
          >
            {requirements.hasLowercase ? "✓" : "✗"} At least one lowercase
            letter
          </li>
          <li
            className={`flex items-center ${requirements.hasNumber ? "text-[#059669]" : "text-red-600"
            }`}
          >
            {requirements.hasNumber ? "✓" : "✗"} At least one number
          </li>
          <li
            className={`flex items-center ${requirements.hasSpecial ? "text-[#059669]" : "text-red-600"
            }`}
          >
            {requirements.hasSpecial ? "✓" : "✗"} At least one special character
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="terms"
          checked={termsAgreed}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="terms" className="text-sm font-bold text-textColor">
          I agree to the&nbsp;
          <a
            href="https://staging.usebridgee.com/terms-and-condition"
            className="text-success"
            target="_blank"
          >
            User Agreement and Privacy Policy
          </a>
        </label>
      </div>

      <Button
        onClick={handleSendOtp}
        disabled={!isFormValid || sendOtpMutation.isLoading}
        className="w-full h-12 bg-success text-white rounded-lg mt-10"
      >
        Next
      </Button>
    </div>
  );
}