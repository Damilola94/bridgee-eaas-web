import React from "react";
import useToggle from "utils/hooks/useToggle";

import Button from "../../../../../components/inputs/Button";

import Modal from "../../../../common/Modal";

import FaceCapture from "./FaceCapture";

const FaceCaptureConfiguration = () => {
  const [showPendingModal, toggleShowPendingModal] = useToggle();

  const navigateToCapture = () => {
    // navigate("/capture");
    toggleShowPendingModal();
  };

  return (
    <>
      <Button
        className="w-full whitespace-nowrap"
        paddingY="py-3"
        onClick={navigateToCapture}
      >
        Take a selfie
      </Button>

      <Modal
        open={showPendingModal}
        title="Capture"
        align="center"
        onClose={toggleShowPendingModal}
        showCloseIcon
        boldTitle
        maxWidth="lg"
      >
        <div className="text-center space-y-5">
          <div className="justify-center">
            <FaceCapture />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FaceCaptureConfiguration;
