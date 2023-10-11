import React from 'react';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

import { CgClose } from 'react-icons/cg';

type ModalProps = {
	isOpen: boolean;
  isShowCloseIcon?: boolean;
  isCenter?: boolean;
  children: React.ReactNode;
	onClose?: () => void;
  maxWidth?: string;
  isFullHeight?: boolean;
}

function Modal({
  children, isOpen, onClose = () => {}, maxWidth, isShowCloseIcon, isCenter, isFullHeight
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
      <Dialog.Panel className={clsx("bg-white w-full rounded-xl relative p-5 mx-auto", maxWidth, isFullHeight ? 'h-[90%]' : '')}>
        {isShowCloseIcon && (
          <button onClick={onClose} className="absolute z-20 top-3 right-3 outline-none">
            <CgClose className="w-8 h-8 p-1 hover:bg-gray-300/50 rounded-lg" />
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

