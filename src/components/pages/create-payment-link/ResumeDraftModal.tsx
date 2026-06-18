import React from "react";
import Modal from "../../common/Modal"; // adjust path to your Modal
import Button from "../../inputs/Button";

interface ResumeDraftModalProps {
  onResume: () => void;
  onDiscard: () => void;
}

function ResumeDraftModal({ onResume, onDiscard }: ResumeDraftModalProps) {
  return (
    <Modal isOpen onClose={onDiscard} maxWidth="max-w-[400px]">
        <h3 className="font-bold text-lg ff-bold mb-2">Resume your draft?</h3>
        <p className=" text-sm mb-6">
          You have an unfinished invoice from a previous session. Would you like
          to pick up where you left off, or start fresh?
        </p>

        <div className="flex flex-col gap-3">
          <Button paddingY="py-3" className="w-full" onClick={onResume}>
            Continue where I left off
          </Button>
          <Button
            paddingY="py-3"
            className="w-full bg-white border border-primary text-primary hover:bg-primary/5"
            bgColor="bg-white"
            textColor="text-primary"
            onClick={onDiscard}
          >
            Start a new invoice
          </Button>
        </div>
    </Modal>
  );
}

export default ResumeDraftModal;