"use client";

import React, { useState, useRef, useCallback } from "react";
import { useMutation } from "react-query";
import Webcam from "react-webcam";
import Button from "../../../inputs/Button";
import Loading from "../../../common/Loading";
import notification from "../../../../utilities/notification";
import handleFetch from "../../../../services/api/handleFetch";
import { StepData } from "../../../../pages/seller/create-account";
import {
  dataURLtoFile,
  removeNigerianCountryCode,
} from "../../../../utilities/general";

interface Props {
  formData?: StepData;
  setFormData?: (data: StepData) => void;
  onNavigateNext?: () => void;
  onSuccess?: (bvnData: any) => void;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function LivenessCheck({
  formData,
  setFormData,
  onNavigateNext,
  onSuccess,
}: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const captureSelfie = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setSelfie(imageSrc);
      const newSelfieFile = dataURLtoFile(imageSrc, "selfie.jpg");
      if (newSelfieFile) {
        setSelfieFile(newSelfieFile);
        if (setFormData) {
          setFormData({
            ...formData,
            livenessSelfie: newSelfieFile,
          } as StepData);
        }
      }
    }
  }, [webcamRef, setFormData, formData]);

  const bvnMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: "BVN validated successfully",
        type: "success",
      });

      const apiData = res?.data;

      const updatedFormData: StepData = {
        ...formData,
        personalInfo: {
          firstName:
            apiData?.firstName || formData?.personalInfo?.firstName || "",
          lastName: apiData?.lastName || formData?.personalInfo?.lastName || "",
          phoneNumber:
            removeNigerianCountryCode(apiData?.phoneNumber) ||
            formData?.personalInfo?.phoneNumber ||
            "",
          emailAddress: formData?.personalInfo?.emailAddress || "",
          businessName: formData?.personalInfo?.businessName || "",
          password: formData?.personalInfo?.password || "",
        },
        bvnValidationTicketId: apiData?.bvnValidationTicketId || "",
        bvn: apiData?.bvn || formData?.bvn,
        bankAccount: formData?.bankAccount || {
          bank: "",
          accountNumber: "",
        },
      };

      if (setFormData) {
        setFormData(updatedFormData);
      }

      if (onSuccess) {
        onSuccess(updatedFormData);
      }

      if (onNavigateNext) {
        onNavigateNext();
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

  const handleValidation = () => {
    if (!formData?.bvn || !selfieFile) {
      notification({
        title: "Missing Information",
        message: "Please provide your BVN and a selfie.",
        type: "danger",
      });
      return;
    }

    const formDataBody = new FormData();
    formDataBody.append("BVN", formData.bvn);
    formDataBody.append("selfie", selfieFile);

    bvnMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/users/validate-bvn",
      method: "POST",
      multipart: true,
      body: formDataBody,
    });
  };

  return (
    <>
      {/* {bvnMutation.isLoading && <Loading />} */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-textColor">
          Take a Selfie
        </h3>
        <ul className="text-sm font-normal text-grey2 list-disc list-inside text-left mb-6">
          <li>Make sure you are in a well-lit area</li>
          <li>Make sure you are in front of a plain background</li>
          <li>Make sure you remove hats, thick glasses or anything else</li>
          <li>Make sure to keep your expression neutral</li>
          <li>Make sure to keep your face within the frame</li>
        </ul>
        <div className="border-[#01FE05] border-2 w-full lg:w-80 h-[340px] lg:h-80 bg-gray-200 flex items-center overflow-hidden rounded-lg">
          {selfie ? (
            <img
              src={selfie}
              alt="Selfie Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              forceScreenshotSourceSize={true}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              className="h-full w-full object-cover"
              mirrored={true}
              videoConstraints={videoConstraints}
            />
          )}
        </div>
      </div>

      {bvnMutation.isLoading && (
        <p className="text-[#FF9500] animate-pulse pt-6">
          Your selfie has been successfully uploaded, it will take about 1min to
          verify your identity, kindly be patient. Thank you.
        </p>
      )}

      <div className="lg:flex gap-x-4 space-y-4 lg:space-y-0 mt-10">
        <Button
          onClick={selfie ? () => setSelfie(null) : captureSelfie}
          disabled={bvnMutation.isLoading}
          className="w-full h-12 bg-transparent border border-grey !text-greyDark"
        >
          {selfie ? "Try again" : "Capture Selfie"}
        </Button>

        <Button
          onClick={handleValidation}
          disabled={!selfie || bvnMutation.isLoading}
          className="w-full h-12 bg-success text-white rounded-lg"
        >
          {bvnMutation.isLoading ? "Validating..." : "Save and Continue"}
        </Button>
      </div>
    </>
  );
}
