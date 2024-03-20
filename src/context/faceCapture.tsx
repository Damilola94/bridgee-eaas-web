import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

export const FaceCaptureContext = createContext({});

const FaceCaptureProvider = ({ props: { children } }: any) => {
  const [gyroscopeChecked, setGyroscopeChecked] = useState(false);
  const cameraResolution = "1280x720";
  const [capturedImage, setCapturedImage] = useState("");

  return (
    <FaceCaptureContext.Provider
      value={{
        cameraResolution,
        capturedImage,
        gyroscopeChecked,
        setCapturedImage,
        setGyroscopeChecked
      }}
    >
      {children}
    </FaceCaptureContext.Provider>
  );
};

FaceCaptureProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export const useFaceContext = () => useContext(FaceCaptureContext);

export default FaceCaptureProvider;
