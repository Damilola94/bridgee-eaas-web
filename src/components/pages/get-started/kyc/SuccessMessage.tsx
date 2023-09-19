import Image from 'next/image';
import React from 'react';

import CheckMark from '../../../../assets/svgs/check-star.svg';

import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

function SuccessMessage({ onClose }: { onClose: () => void }) {
  return (
    <Modal isOpen isShowCloseIcon={false} isCenter maxWidth="max-w-[400px]">
      <div className="text-center py-5">
        <Image src={CheckMark} alt="Check mark" className="inline-block mb-10" />

        <p className="text-lg text-lightText font-bold mb-6">
          Your KYC information has been submitted successfully.
        </p>

        <Button
          onClick={onClose}
          className="w-full"
          paddingY="py-3"
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
}

export default SuccessMessage;
