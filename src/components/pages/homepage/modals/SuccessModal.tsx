import React from 'react';
import Image from 'next/image';
import CheckIncompleteCircle from '../../../../assets/svgs/check-incomplete-circle.svg';
import Modal from '../../../common/Modal';
import Button from '../../../inputs/Button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl" isCenter isShowCloseIcon={false}>
            <div className="flex flex-col items-center text-center py-8 px-2 md:mx-6">
                <div className="flex items-center justify-center mb-6">
                    <Image src={CheckIncompleteCircle} alt="Success Check" className="w-20 h-20" />
                </div>

                <h3 className="text-4xl font-bold mb-4 text-textColor">You Did It!</h3>

                <p className="text-greyDark mb-10 text-lg leading-relaxed px-4">
                    Your Submission is complete, and your delivery coupon has been sent to your email address
                </p>

                <Button
                    onClick={onClose}
                    className="w-full font-bold"
                    paddingY="py-4"
                    fontSize="text-lg"
                >
                    Done
                </Button>
            </div>
        </Modal>
    );
};

export default SuccessModal;
