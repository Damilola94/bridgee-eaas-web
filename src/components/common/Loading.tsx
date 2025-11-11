import React from 'react';
import Image from 'next/image';

import Logo from '../../assets/images/loading.gif';

import Modal from './Modal';

type LoadingProps = {
  message?: string
}

function Loading({ message }: LoadingProps) {
  return (
    <Modal
      isOpen
      isCenter
      zIndex="z-50"
      isShowCloseIcon={false}
      onClose={() => {}}
      maxWidth="max-w-[200px]"
    >
      <div className="rounded bg-white text-center h-40 flex flex-col items-center justify-center">
        <Image
          priority
          src={Logo}
          className="mx-auto"
          width={200}
          height={45}
          alt="UseBridgee Inc. logo"
        />
        <p className="mt-4 text-base">{message}</p>
      </div>
    </Modal>
  );
}

export default Loading;

Loading.defaultProps = {
  message: 'Loading...'
};
