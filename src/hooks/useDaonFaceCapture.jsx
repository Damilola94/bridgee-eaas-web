// import { isMobile } from "./logic/deviceType";
// import { calculateOvalStyle } from "./logic/oval";
import { useEffect, useRef, useState } from "react";

// import { isMobile } from "views/Onboarding/FaceCapture/logic/deviceType";
import { calculateOvalStyle } from "../components/pages/get-started/FaceCapture/logic/Oval";
import { isMobile } from "../components/pages/get-started/FaceCapture/logic/deviceType";

/* eslint-disable */
let Daon;
if (typeof window !== 'undefined') {
  Daon = global?.window.Daon;
}
/* eslint-disable */

export const useDaonFaceCapture = () => {
  // Ref
  const videoRef = useRef(null);
  // Variwble
  const errorTop = isMobile(navigator.userAgent) ? 28 : -5;
  const cameraResolution = "1280x720";
  // Local State
  const [capturedImage, setCapturedImage] = useState("");
  const [gyroscopeChecked, setGyroscopeChecked] = useState(false);
  const [loadingFaceCapture, setLoadingFaceCapture] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errorMessageFaceCapture, setErrorMessageFaceCapture] = useState("");
  const [faceState, setFaceState] = useState("");
  const [isWasmLoaded, setWasmLoaded] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const cameraWidth = Number(cameraResolution.split("x")[0]);
  const cameraHeight = Number(cameraResolution.split("x")[1]);
  const [fc] = useState(
    new Daon.FaceCapture({
      width: cameraWidth,
      height: cameraHeight,
    })
  );
  let findFaceTimeout;
  // Styles
  const ovalStyle = calculateOvalStyle(cameraWidth, cameraHeight);

  // Assit Functions
  const setFaceStatus = (code) => {
    if (code === 900) {
      setFaceState("facePassed");
    } else if (code === 901) {
      setFaceState("faceStarted");
    } else {
      setFaceState("faceFound");
    }
  };
  const loadDFQModule = () => {
    fc.loadDFQModule({
      urlFaceDetectorWasm: window.location.origin + "/DaonFaceQuality.wasm",
      onFaceModuleLoaded: ({ isLoaded, error }) => {
        setWasmLoaded(isLoaded);
        if (error) {
          setTimeout(() => {
            loadDFQModule();
          }, 5000);

          // console.log(error);
        }
      },
    });
  };
  const startFaceDetector = () => {
    fc.startFaceDetector({
      onFaceDetectorInitialized: () => {
        fc.findFace();
      },
      onFaceDetectorError: (err) => {},
      onFaceDetectorFeedback: (detectorFeedbackObject) => {
        if (detectorFeedbackObject.result === "PASS") {
          setCapturedImage(detectorFeedbackObject.faceImage);
          setCameraStarted(false);
          setWasmLoaded(false);
          setVideoLoaded(false);
          fc.stopCamera();
          fc.destroy();
          loadDFQModule();
          // console.log(detectorFeedbackObject.faceImage)
        } else {
          if (detectorFeedbackObject.feedback) {
            setFaceStatus(detectorFeedbackObject.feedback.code);
          }
          findFaceTimeout = setTimeout(() => {
            fc.findFace();
          }, 50);
          setFeedbackMessage(detectorFeedbackObject.feedback.message);
          setLoadingFaceCapture(false);
        }
      },
    });
  };
  const startCamera = async () => {
    setErrorMessageFaceCapture("");
    setLoadingFaceCapture(true);
    let gyroscopePromise = Promise.resolve(true);
    const videoEl = videoRef.current;
    await fc;
    // if (gyroscopeChecked) {
    //   gyroscopePromise = fc.isGyroscopeActive();
    // }
    // gyroscopePromise
      // .then(() => {
      //   return fc.startCamera(videoEl);
      // })
      fc?.startCamera(videoEl)
      .then(() => {
        setCameraStarted(true);
      })
      .catch((error) => {
        setErrorMessageFaceCapture(error.message);
        setLoadingFaceCapture(false);
      });
  };
  const handleMetadata = () => {
    setVideoLoaded(true);
  };

  // Use Effects
  useEffect(() => {
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
  }, [fc]);
  useEffect(() => {
    if (cameraStarted && isWasmLoaded && videoLoaded) {
      startFaceDetector();
    }
  }, [cameraStarted, isWasmLoaded, videoLoaded]);

  return {
    cameraStarted,
    capturedImage,
    fc,
    errorMessageFaceCapture,
    errorTop,
    faceState,
    feedbackMessage,
    handleMetadata,
    loadingFaceCapture,
    loadDFQModule,
    ovalStyle,
    setCapturedImage,
    startCamera,
    videoRef,
  };
};
