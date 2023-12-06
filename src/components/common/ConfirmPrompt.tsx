import React from 'react';

import Button from '../inputs/Button';

import Modal from './Modal';

type ConfirmPromptProps = {
  isOpen: boolean
  title: string
  message?: string
  handleYes: () => void
  onClose: () => void
};

function ConfirmPrompt({
  message = '', title, handleYes, isOpen, onClose
}: ConfirmPromptProps) {
  return (
    <Modal
      isOpen={isOpen}
      isCloseOnOverlayClick
      maxWidth="max-w-[400px]"
      onClose={onClose}
    >
      <div className="px-5 py-3">
        <h3 className="font-semibold mb-2">
          {title}
        </h3>
        <div className="mb-5">
          {message}
        </div>
        <div className="flex justify-end space-x-5">
          <Button onClick={onClose}>
            No
          </Button>
          <Button bgColor="bg-error" onClick={handleYes}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmPrompt;
