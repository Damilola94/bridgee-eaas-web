import React from 'react';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

import { CgClose } from 'react-icons/cg';

type ModalProps = {
	isOpen: boolean,
  isShowCloseIcon?: boolean,
  isCenter?: boolean,
  children: React.ReactNode,
	onClose: () => void,
  maxWidth?: string
}

function Modal({
  children, isOpen, onClose, maxWidth, isShowCloseIcon, isCenter
}: ModalProps) {
  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={onClose}
      className={clsx(
        "fixed w-screen h-screen inset-0 z-40 px-5 py-10 overflow-y-auto",
        {
          "bg-gray-500/50": isOpen,
          "flex justify-center items-center": isCenter
        },
      )}
    >
      <Dialog.Panel className={clsx("bg-white w-full rounded-xl relative p-5 mx-auto", maxWidth)}>
        {isShowCloseIcon && (
          <button onClick={onClose} className="absolute top-5 right-5">
            <CgClose className="w-8 h-8 hover:bg-gray-300/50" />
          </button>
        )}

        {children}
      </Dialog.Panel>
    </Dialog>
  );
}

Modal.defaultProps = {
  maxWidth: 'max-w-3xl',
  isOpen: false,
  isCenter: false,
  isShowCloseIcon: true
};

export default Modal;

