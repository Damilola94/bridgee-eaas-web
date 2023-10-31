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
      <div className="px-3 pb-5 rounded bg-white text-center">
        <div className="mb-1">
          <Image
            src={Logo}
            priority
            alt="Bridge by ALAT logo"
            className="w-[100px] h-[100px] mx-auto"
            height={100}
            width={100}
          />
        </div>
        <p className="text-base">{message}</p>
      </div>
    </Modal>
  );
}

export default Loading;

Loading.defaultProps = {
  message: 'Loading...'
};
