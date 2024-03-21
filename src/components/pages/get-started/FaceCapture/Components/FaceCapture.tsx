import React, { useEffect } from "react";
import Image from "next/image";

import { useDaonFaceCapture } from "../../../../../hooks/useDaonFaceCapture";
import Loading from "../../../../common/Loading";
import Button from "../../../../inputs/Button";
import { FaceCaptureProps } from "../../../../../types/kyc";

const FaceCapture = ({ setPicture = () => {}, toggleCam = () => {} }:FaceCaptureProps) => {
  const {
    cameraStarted,
    capturedImage,
    // fc,
    errorMessageFaceCapture,
    // errorTop,
    faceState,
    feedbackMessage,
    handleMetadata,
    loadingFaceCapture,
    // loadDFQModule,
    ovalStyle,
    setCapturedImage,
    startCamera,
    videoRef
  } = useDaonFaceCapture();

  let faceStyle;

  if (faceState === "facePassed"){
    faceStyle = "absolute rounded-full border-4 border-[#66cb9f]";
  } else if (faceState === "faceFound"){
    faceStyle = "absolute rounded-full border-4 border-[#fac109]";
  } else if (faceState === "faceStarted"){
    faceStyle = "absolute rounded-full border-4 border-[#f16063]";
  }

  useEffect(() => {
    setPicture(capturedImage);
  }, [capturedImage, setPicture]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <div className="relative w-full">
        {capturedImage !== "" ? (
          <>
            <Image
              priority
              className="mx-auto"
              width={120}
              height={45}
              src={capturedImage}
              alt="Selfie Preview"
            />
          </>
        ) : (
          <video
            className="w-full"
            autoPlay
            playsInline
            ref={videoRef}
            onLoadedMetadata={handleMetadata}
          >
            <track default srcLang="en" kind="captions" />
          </video>
        )}
        {cameraStarted && !errorMessageFaceCapture && (
          <div className={`${faceStyle}`} style={ovalStyle} />
        )}
      </div>
      {feedbackMessage && !errorMessageFaceCapture && (
        <div className="text-center mt-3 flex justify-center">
          {/* <SimpleAlert
            show={feedbackMessage}
            message={feedbackMessage}
            type="warning"
          /> */}
          {capturedImage ? null : (
            <div className="text-white mb-3">
              <h3 className="font-bold text-xl ff-bold mb-2">
                {feedbackMessage}
              </h3>
            </div>
          )}
        </div>
      )}

      {capturedImage && (
        <div className="flex gap-5 justify-center mt-5">
          <Button
            paddingY="py-3"
            className="w-full"
            onClick={() => {
              setCapturedImage("");
              setPicture("");
              startCamera();
            }}
          >
            Retake
          </Button>

          <Button
            paddingY="py-3"
            className="w-full"
            onClick={() => {
              setPicture(capturedImage);
              toggleCam();
            }}
          >
            Continue
          </Button>
        </div>
      )}

      {loadingFaceCapture && <Loading message="Loading Face Capturing" />}

      {errorMessageFaceCapture && (
        <div className="text-center">
          {/* <SimpleAlert
            show={errorMessageFaceCapture}
            message={errorMessageFaceCapture}
            type="error"
          /> */}
          <Button onClick={startCamera} type="button" />
        </div>
      )}
    </>
  );
};

export default FaceCapture;
