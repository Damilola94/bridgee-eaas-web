import React from 'react';
import Image from 'next/image';

import Logo from '../../assets/svgs/logos/full-pink.svg';
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
        <div className="my-8">
          <Image
            priority
            src={Logo}
            className="mx-auto"
            width={120} height={45}
            alt="Bridge by ALAT logo"
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
