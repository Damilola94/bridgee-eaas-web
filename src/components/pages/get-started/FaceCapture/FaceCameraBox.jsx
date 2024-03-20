import React, {
  forwardRef, useRef, useState, useEffect
} from "react";

import PropTypes from "prop-types";

import { useFaceContext } from "../../../../context/faceCapture";

import useToggle from "../../../../hooks/useToggle";

import FaceCapture from "../FaceCapture/Components/FaceCapture";

import Modal from "../../../../components/common/Modal";

import Button from "../../../inputs/Button";

import { calculateOvalStyle } from "./logic/Oval";

/* eslint-disable */
let Daon;
if (typeof window !== "undefined") {
  Daon = global?.window.Daon;
}
/* eslint-disable */

const FaceCameraBox = forwardRef(
  (
    {
      // aspectRatio,
      accept = ".jpg,.png,.jpeg",
      onFile = () => {},
      holderShape = null,
      disabled = false,
      //   maxSize = 500,
      label,
      hasError,
      name,
      //   loading = false,
      removeImage = () => {},
      setBase64Url,
      handleCaptureModal,
      getCaptureImage,
      ref
    },
  ) => {
    const videoRef = useRef();
    const { gyroscopeChecked, cameraResolution } = useFaceContext();
    const [feedbackMessage, setFeedbackMessage] = useState("");
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

    let findFaceTimeout;

    const setFaceStatus = (code) => {
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
        onFaceModuleLoaded: ({ isLoaded, error }) => {
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
        onFaceDetectorError: (err) => {
          console.log("error", err);
        },
        onFaceDetectorFeedback: (detectorFeedbackObject) => {
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
      if(picture){
        fc.stopCamera();
        fc.destroy();
      }
    }, [picture])
    
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

    const handleTakePicture = () => {
      toggleShowCamModal();
      // setCloseCaptureModal(true)
      // handleCaptureModal();
    };

    const handleClick = (event) => {
      // eslint-disable-next-line no-param-reassign
      event.target.value = "";
    };

    return (
      <>
        {<p className="text-red-600 -mt-4 ml-1 text-xs">{label}</p>}
        <div
          ref={ref}
          className={`uploadBox border-solid border-transparent mx-auto ${
            hasError ? "border-alat-red" : ""
          } ${holderShape} ${disabled ? "pointer-events-none" : ""}`}
          style={{
            backgroundImage: `url(${loading ? "" : picture})`,
            borderWidth: 1,
          }}
        >
        <Button
          paddingY="py-3"
          className="w-full"
          onClick={picture ? () => handleRemove() : () => handleTakePicture()}
        >
          {picture ? "Remove" : "Take a selfie"}
        </Button>
          <input
            ref={videoRef}
            onChange={handleFileSelectionChange}
            onClick={handleClick}
            type="image"
            className="hidden"
            accept={accept}
          />
        </div>
        <Modal
          isOpen={showCamModal}
          onClose={toggleShowCamModal}
        >
          <div className="flex-row justify-center">
            <FaceCapture
              setPicture={setPicture}
              toggleCam={toggleShowCamModal}
              getCaptureImage={getCaptureImage}
            />
          </div>
        </Modal>
      </>
    );
  }
);

FaceCameraBox.propTypes = {
  ref: PropTypes.any,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  holderShape: PropTypes.string,
  shape: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onFile: PropTypes.func.isRequired,
  removeImage: PropTypes.func,
};

export default FaceCameraBox;
