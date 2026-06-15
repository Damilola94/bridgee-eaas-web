/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import { useMemo, useRef, useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import Webcam from 'react-webcam';

import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import InfoCircleIcon from "../../../assets/svgs/info-circle.svg";

import { useAccountsContext } from '../../../context/Accounts';
import PhoneNumberInput from '../../inputs/PhoneNumberInput';
import {
  removeNigerianCountryCode,
  dataURLtoFile
} from '../../../utilities/general';
import handleFetch from '../../../services/api/handleFetch';
import notification from '../../../utilities/notification';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

function PersonalDetails() {
  const { accounts } = useAccountsContext();
  const personalDetail = accounts?.identity?.personalDetail;

  const [bvn, setBvn] = useState("");
  const [showLiveness, setShowLiveness] = useState(false);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const { countryCode, localNumber } = useMemo(() => {
    const fullNumber = personalDetail?.phoneNumber || "";
    const cleanedNumber = removeNigerianCountryCode(fullNumber);
    return { countryCode: "+234", localNumber: cleanedNumber };
  }, [personalDetail?.phoneNumber]);

  const captureSelfie = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setSelfie(imageSrc);
      const file = dataURLtoFile(imageSrc, "selfie.jpg");
      if (file) setSelfieFile(file);
    }
  }, []);

  const bvnMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "BVN validated successfully",
        type: "success"
      });
      setBvn("");
      setSelfie(null);
      setSelfieFile(null);
      setShowLiveness(false);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "BVN validation failed. Please try again.",
        type: "danger"
      });
    }
  });

  const handleProceedToSelfie = () => {
    if (!bvn.trim() || bvn.length < 11) {
      notification({
        title: "Invalid BVN",
        message: "Please enter a valid 11-digit BVN.",
        type: "danger"
      });
      return;
    }
    setShowLiveness(true);
  };

  const handleValidation = () => {
    if (!bvn || !selfieFile) {
      notification({
        title: "Missing Information",
        message: "Please provide your BVN and a selfie.",
        type: "danger"
      });
      return;
    }

    const formDataBody = new FormData();
    formDataBody.append("BVN", bvn);
    formDataBody.append("selfie", selfieFile);

    bvnMutation.mutate({
      service: "identity-service",
      endpoint: "/api/v1/users/verify-bvn",
      method: "POST",
      multipart: true,
      body: formDataBody
    });
  };

  const isBvnVerified = !!personalDetail?.bvnVerified;

  return (
    <div className="flex flex-col gap-6">

      {/* ── Card 1: Personal Details ── */}
      <div className="border-2 border-lightText/20 rounded-lg p-5">
        <h2 className="font-bold text-xl mb-5">Personal Details</h2>

        <div className="w-full">
          <TextInput
            name="firstName"
            readOnly
            value={personalDetail?.firstName || ""}
            className="w-full mb-4"
            label="First name"
            placeholder="First name"
          />
          <TextInput
            name="lastName"
            readOnly
            value={personalDetail?.lastName || ""}
            className="w-full mb-4"
            label="Last name"
            placeholder="Last name"
          />
          <TextInput
            type="email"
            name="email"
            readOnly
            value={personalDetail?.email || ""}
            className="w-full mb-4"
            label="Email Address"
            placeholder="Email Address"
          />
          <PhoneNumberInput
            label="Phone number"
            className="w-full mb-4"
            countryCode={countryCode}
            phoneNumber={localNumber}
            readOnly
          />
        </div>

        <div className="flex items-start space-x-2 p-3 rounded-md">
          <Image src={InfoCircleIcon} alt="Information" />
          <p className="text-sm text-textColor/50">
            Kindly note the information above is not editable, this is because
            it's the information tied to your BVN.
          </p>
        </div>
      </div>

      {/* ── Card 2: BVN Verification ── */}
      <div className="border-2 border-lightText/20 rounded-lg p-5">
        <h3 className="font-bold text-lg mb-1">BVN Verification</h3>
        <p className="text-sm text-textColor/50 mb-5">
          Verify your BVN to unlock full access to your account.
        </p>

        {isBvnVerified ? (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-600 text-sm font-medium">✓ BVN Verified</span>
          </div>
        ) : !showLiveness ? (
          <>
            <TextInput
              name="bvn"
              value={bvn}
              onChange={(e: any) =>
                /^\d{0,11}$/.test(e.target.value) && setBvn(e.target.value)
              }
              label="Bank Verification Number (BVN)"
              placeholder="Enter your 11-digit BVN"
              className="w-full mb-4"
            />
            <Button
              className="w-full"
              paddingY="py-3"
              disabled={bvn.length !== 11}
              onClick={handleProceedToSelfie}
            >
              Proceed to Selfie
            </Button>
          </>
        ) : (
          <>
            <h4 className="text-base font-semibold mb-2">Take a Selfie</h4>
            <ul className="text-sm text-grey2 list-disc list-inside mb-4 space-y-1">
              <li>Make sure you are in a well-lit area</li>
              <li>Make sure you are in front of a plain background</li>
              <li>Remove hats, thick glasses or anything else</li>
              <li>Keep your expression neutral</li>
              <li>Keep your face within the frame</li>
            </ul>

            <div className="border-[#01FE05] border-2 w-full h-72 bg-gray-200 flex items-center overflow-hidden rounded-lg mb-4">
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
                  forceScreenshotSourceSize
                  screenshotQuality={1}
                  screenshotFormat="image/jpeg"
                  className="h-full w-full object-cover"
                  mirrored
                  videoConstraints={videoConstraints}
                />
              )}
            </div>

            {bvnMutation.isLoading && (
              <p className="text-[#FF9500] animate-pulse mb-4 text-sm">
                Your selfie has been uploaded, it will take about 1 min to
                verify your identity. Kindly be patient. Thank you.
              </p>
            )}

            <div className="flex gap-3">
              <Button
                onClick={selfie ? () => setSelfie(null) : captureSelfie}
                disabled={bvnMutation.isLoading}
                className="w-full h-12 bg-transparent border border-grey !text-greyDark"
              >
                {selfie ? "Try Again" : "Capture Selfie"}
              </Button>
              <Button
                onClick={handleValidation}
                disabled={!selfie || bvnMutation.isLoading}
                className="w-full h-12 bg-success text-white rounded-lg"
              >
                {bvnMutation.isLoading ? "Validating..." : "Save and Continue"}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setShowLiveness(false)}
              className="mt-3 text-sm text-blue-600 hover:underline w-full text-center"
            >
              ← Back to BVN entry
            </button>
          </>
        )}
      </div>

    </div>
  );
}

export default PersonalDetails;