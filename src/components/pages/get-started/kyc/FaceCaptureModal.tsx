import Image from 'next/image';
import React from 'react';

import CheckMark from '../../../../assets/svgs/check-star.svg';

import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

function FaceCaptureModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal isOpen isShowCloseIcon={false} isCenter maxWidth="max-w-[400px]">
      <div className="text-center py-5">
        <Image src={CheckMark} alt="Check mark" className="inline-block mb-10 text-[#CE18DF]" />

        <p className="text-lg text-lightText font-bold">
        BVN validated successfully.
        </p>
        <p className="text-lg text-lightText font-bold mb-6">
        Start Liveliness Check.
        </p>

        <Button
          onClick={onClose}
          className="w-full"
          paddingY="py-3"
        >
          Start Liveliness Check
        </Button>
      </div>
    </Modal>
  );
}

export default FaceCaptureModal;
