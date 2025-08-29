"use client";

import React, { useState } from "react";
import { useMutation } from "react-query";

import TextInput from "../../../inputs/Text";
import Loading from "../../../common/Loading";
import notification from "../../../../utilities/notification";
import handleFetch from "../../../../services/api/handleFetch";
import { StepData } from "../../../../pages/seller/create-account";
import Button from "../../../inputs/Button";

interface Props {
  formData?: StepData;
  setFormData?: (data: StepData) => void;
  onSuccess?: (bvnData: any) => void;
  onValidationSuccess?: () => void;
  onNavigateNext?: () => void;
}

export default function BvnValidation({
  formData,
  setFormData,
  onSuccess,
  onValidationSuccess,
  onNavigateNext,
}: Props) {
  const [bvn, setBvn] = useState(formData?.bvn || "");
  const [isBvnValidated, setIsBvnValidated] = useState(false);

  const bvnMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: "BVN validated successfully",
        type: "success",
      });

      const apiData = res?.data;

      const updatedFormData: StepData = {
        personalInfo: {
          firstName:
            apiData?.firstName || formData?.personalInfo?.firstName || "",
          lastName: apiData?.lastName || formData?.personalInfo?.lastName || "",
          phoneNumber:
            apiData?.phoneNumber || formData?.personalInfo?.phoneNumber || "",
          emailAddress: formData?.personalInfo?.emailAddress || "",
          businessName: formData?.personalInfo?.businessName || "",
          password: formData?.personalInfo?.password || "",
        },
        bvnValidationTicketId: apiData?.bvnValidationTicketId || "",
        bvn: apiData?.bvn || formData?.bvn || bvn,
        livenessSelfie: formData?.livenessSelfie,
        bankAccount: formData?.bankAccount || {
          bank: "",
          accountNumber: "",
        },
      };

      if (setFormData) {
        setFormData(updatedFormData);
      }

      setIsBvnValidated(true);

      if (onValidationSuccess) {
        onValidationSuccess();
      }

      if (onSuccess) {
        onSuccess(updatedFormData);
      }
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "BVN validation failed. Please try again.",
        type: "danger",
      });
    },
  });

  const handleBvnValidation = (bvnValue?: string) => {
    const targetBvn = bvnValue || bvn;

    if (!targetBvn || targetBvn.length !== 11) {
      return;
    }

    // Validate that BVN contains only digits
    if (!/^\d{11}$/.test(targetBvn)) {
      notification({
        title: "Form Error",
        message: "BVN must contain only numbers",
        type: "danger",
      });
      return;
    }

    const formDataBody = new FormData();
    formDataBody.append("BVN", targetBvn);

    bvnMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/users/validate-bvn",
      extra: "",
      method: "POST",
      multipart: true,
      body: formDataBody,
    });
  };

  const handleBvnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setBvn(value);
      if (setFormData) {
        setFormData({ ...formData, bvn: value } as StepData);
      }

      if (value.length === 11 && /^\d{11}$/.test(value)) {
        handleBvnValidation(value);
      }
    }
  };

  const handleNext = () => {
    if (onNavigateNext) {
      onNavigateNext();
    }
  };

  return (
    <>
      {bvnMutation.isLoading && <Loading />}
      <div className="mb-4">
        <TextInput
          className="w-full mb-3"
          value={bvn}
          onChange={handleBvnChange}
          type="text"
          label="BVN Validation"
          name="bvn"
          maxValue={11}
          disabled={bvnMutation.isLoading || isBvnValidated}
          placeholder="Enter your 11-digit BVN"
        />
      </div>
      <p className="text-sm font-medium text-grey">
        Your BVN is required to validate your details. To get your BVN dial
        *565*0# on your registered number.
      </p>

      <Button
        onClick={handleNext}
        disabled={bvnMutation.isLoading || !isBvnValidated}
        className="w-full h-12 bg-success text-white rounded-lg mt-10"
      >
        {bvnMutation.isLoading ? "Validating..." : "Next"}
      </Button>
    </>
  );
}
