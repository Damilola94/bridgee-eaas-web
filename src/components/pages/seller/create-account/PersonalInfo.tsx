import React, { useEffect, useState } from "react";
import TextInput from "../../../inputs/Text";
import { StepData } from "../../../../pages/seller/create-account";
import { useMutation } from "react-query";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import Button from "../../../inputs/Button";
import PhoneNumberInput from "../../../inputs/PhoneNumberInput";
import { removeNigerianCountryCode } from "../../../../utilities/general";

interface Props {
  formData: StepData;
  setFormData: (data: StepData) => void;
  onTermsChange?: (agreed: boolean) => void;
  onRegistrationSuccess?: () => void;
}

export default function PersonalInfo({
  formData,
  setFormData,
  onTermsChange,
  onRegistrationSuccess,
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

  const registrationMutation = useMutation(handleFetch, {
    onSuccess: (response) => {
      notification({
        message: "Account created successfully!",
        type: "success",
      });

      if (onRegistrationSuccess) {
        onRegistrationSuccess();
      }
    },
    onError: (error: any) => {
      notification({
        title: "Registration Failed",
        message: error?.message || "Please try again",
        type: "danger",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (setFormData && formData) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [name]: value,
        },
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
    setPhoneWithoutCode(e.target.value);
  };

  const handleRegistration = () => {
    const registrationData = {
      bvnValidationTicketId: formData.bvnValidationTicketId || "",
      email: formData.personalInfo.emailAddress,
      countryCode: "+234",
      phoneNumber: formData.personalInfo.phoneNumber,
      businessName: formData.personalInfo.businessName,
      password: formData.personalInfo.password,
      accountDetail: {
        bankCode: formData.bankAccount.bankCode || "",
        accountNumber: formData.bankAccount.accountNumber || "",
        accountName: formData.bankAccount.accountName || "",
      },
    };

    registrationMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/users/register",
      method: "POST",
      body: registrationData,
    });
  };

  const isFormValid =
    personalInfo.emailAddress?.trim() &&
    personalInfo.phoneNumber?.trim() &&
    personalInfo.businessName?.trim() &&
    personalInfo.password?.trim() &&
    termsAgreed;

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
      />

      <PhoneNumberInput
        countryCode={countryCode}
        onCountryCodeChange={handleCountryCodeChange}
        phoneNumber={phoneWithoutCode}
        onPhoneNumberChange={handlePhoneNumberChange}
        className="w-full mb-5"
        label="Phone Number"
        placeholder="Phone Number"
      />

      <TextInput
        label="Business Name"
        name="businessName"
        placeholder="Enter Business Name"
        value={personalInfo?.businessName || ""}
        onChange={handleChange}
        className=""
      />
      <TextInput
        label="Password"
        name="password"
        type="password"
        placeholder="Enter Password"
        value={personalInfo?.password || ""}
        onChange={handleChange}
        className=""
      />
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
        onClick={handleRegistration}
        disabled={!isFormValid || registrationMutation.isLoading}
        className="w-full h-12 bg-success text-white rounded-lg mt-10"
      >
        Next
      </Button>
    </div>
  );
}
