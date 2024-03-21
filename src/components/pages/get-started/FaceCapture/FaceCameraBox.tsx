import React, {
  forwardRef, useRef, useState, useEffect
} from "react";

import { useFaceContext } from "../../../../context/faceCapture";

import useToggle from "../../../../hooks/useToggle";

import Modal from "../../../common/Modal";

import { FaceCameraBoxProps } from "../../../../types/kyc";

import Button from "../../../inputs/Button";

import FaceCapture from "./Components/FaceCapture";

import { calculateOvalStyle } from "./logic/Oval";

/* eslint-disable */
let Daon: { FaceCapture: new (arg0: { height: number; width: number }) => any };
if (typeof window !== "undefined") {
  Daon = global?.window.Daon;
}

const FaceCameraBox = forwardRef<HTMLDivElement, FaceCameraBoxProps>(
  (
    {
      // aspectRatio,
      accept = ".jpg,.png,.jpeg",
      onFile = () => {},
      holderShape = null,
      disabled = false,
      // maxSize = 500,
      label,
      hasError,
      name,
      // loading = false,
      removeImage = () => {},
      setBase64Url = () => {},
      handleCaptureModal = () => {},
    },
    ref
  ) => {
    const videoRef = useRef(null);
    const { gyroscopeChecked, cameraResolution }: any = useFaceContext();
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [capturedImage, setCapturedImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [faceState, setFaceState] = useState("");
    const [isWasmLoaded, setWasmLoaded] = useState(false);
    const [cameraStarted, setCameraStarted] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [picture, setPicture] = useState("");
    const [showCamModal, toggleShowCamModal] = useToggle();

    const cameraWidth = Number(cameraResolution?.split("x")[0]);
    const cameraHeight = Number(cameraResolution?.split("x")[1]);

    const [fc] = useState(
      new Daon.FaceCapture({
        height: cameraHeight,
        width: cameraWidth,
      })
    );

    let findFaceTimeout: string | number | NodeJS.Timeout | undefined;

    const setFaceStatus = (code: number) => {
      if (code === 900) {
        setFaceState("face-passed");
      } else if (code === 901) {
        setFaceState("");
      } else {
        setFaceState("face-found");
      }
    };

    const loadDFQModule = () => {
      fc.loadDFQModule({
        onFaceModuleLoaded: ({ isLoaded, error }: any) => {
          setWasmLoaded(isLoaded);
          if (error) {
            setTimeout(() => {
              loadDFQModule();
            }, 5000);
            console.log(error);
          }
        },
        urlFaceDetectorWasm: window?.location?.origin + "/DaonFaceQuality.wasm",
      });
    };

    const startFaceDetector = () => {
      fc.startFaceDetector({
        onFaceDetectorError: (err: any) => {
          console.log("error", err);
        },
        onFaceDetectorFeedback: (detectorFeedbackObject: {
          result: string;
          faceImage: any;
          feedback: { code: any; message: React.SetStateAction<string> };
        }) => {
          if (detectorFeedbackObject.result === "PASS") {
            setCapturedImage(detectorFeedbackObject?.faceImage);
          } else {
            if (detectorFeedbackObject.feedback) {
              setFaceStatus(detectorFeedbackObject.feedback.code);
            }
            findFaceTimeout = setTimeout(() => {
              fc.findFace();
            }, 50);
            setFeedbackMessage(detectorFeedbackObject.feedback.message);
            setLoading(false);
          }
        },
        onFaceDetectorInitialized: () => {
          fc.findFace();
        },
      });
    };

    const startCamera = () => {
      setErrorMessage("");
      setLoading(true);
      let gyroscopePromise = Promise.resolve(true);
      const videoEl = videoRef.current;
      if (gyroscopeChecked) {
        gyroscopePromise = fc.isGyroscopeActive();
      }
      gyroscopePromise
        .then(() => {
          console.log();
          return fc.startCamera(videoEl);
        })
        .then(() => {
          console.log();
          setCameraStarted(true);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
    };

    const handleMetadata = () => {
      setVideoLoaded(true);
    };

    useEffect(() => {
      console.log();
      return () => {
        if (findFaceTimeout) clearTimeout(findFaceTimeout);
        if (fc) {
          fc.stopCamera();
          fc.destroy();
        }
      };
    }, []);

    useEffect(() => {
      if (fc) {
        loadDFQModule();
        startCamera();
      }
    }, [fc, showCamModal]);

    useEffect(() => {
      if (showCamModal) {
        loadDFQModule();
        startCamera();
      } else {
        setCameraStarted(false);
        setWasmLoaded(false);
        setVideoLoaded(false);
        fc.stopCamera();
        fc.destroy();
      }
    }, [showCamModal, cameraStarted]);

    useEffect(() => {
      if (picture) {
        fc.stopCamera();
        fc.destroy();
      }
    }, [picture]);

    useEffect(() => {
      if (cameraStarted && isWasmLoaded && videoLoaded) {
        startFaceDetector();
      }
    }, [cameraStarted, isWasmLoaded, videoLoaded]);

    const ovalStyle = calculateOvalStyle(cameraWidth, cameraHeight);

    useEffect(() => {
      setBase64Url(picture);
    }, [picture]);

    const handleFileSelectionChange = async () => {
      onFile(picture);
      setBase64Url(picture);
    };

    const handleRemove = () => {
      setPicture("");
      onFile("");
      removeImage(setPicture);
      setCameraStarted(false);
      setWasmLoaded(false);
      setVideoLoaded(false);
      fc.stopCamera();
      fc.destroy();
    };

    // const [closeCaptureModal, setCloseCaptureModal] = useState(false)

    console.log("I got here", picture,showCamModal, "picture");

    const handleTakePicture = () => {
      toggleShowCamModal();
    };

    // useEffect(() => {
    //   if (showCamModal) {
    //     handleCaptureModal();
    //   }
    // }, [showCamModal]);

    const handleClick = (
      event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
      // eslint-disable-next-line no-param-reassign
      const target = event.target as HTMLButtonElement;
      if (target) {
        target.value = "";
      }
    };

    return (
      <>
        {<p className="text-red-600 -mt-4 ml-1 text-xs">{label}</p>}
        {!showCamModal && <div
          ref={ref}
        >
          <Button
            paddingY="py-3"
            className="w-full"
            onClick={picture ? handleRemove : handleTakePicture}
          >
            {picture ? "Remove" : "Take a selfie"}
          </Button>
          <input
            ref={videoRef}
            onChange={handleFileSelectionChange}
            onClick={(event) => handleClick(event)}
            type="image"
            className="hidden"
            accept={accept}
          />
        </div>}
        <Modal isOpen={showCamModal} onClose={() => toggleShowCamModal}>
          <div className="flex-row justify-center">
            <FaceCapture
              setPicture={setPicture}
              toggleCam={() => toggleShowCamModal}
            />
          </div>
        </Modal>
      </>
    );
  }
);

export default FaceCameraBox;
