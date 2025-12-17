import React from 'react';
import { HiChevronRight } from 'react-icons/hi';
import Modal from '../../../common/Modal';

interface RegisterSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectSeller: () => void;
    onSelectBuyer: () => void;
    isShowCloseIcon?: boolean;
}

const RegisterSelectionModal: React.FC<RegisterSelectionModalProps> = ({
    isOpen,
    onClose,
    onSelectSeller,
    onSelectBuyer,
    isShowCloseIcon = true,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl" isCenter isShowCloseIcon={isShowCloseIcon}>
            <div className="flex flex-col space-y-10 py-4 my-6 mx-2 md:m-10">
                <button
                    onClick={onSelectSeller}
                    className="w-full bg-success text-white rounded-2xl p-8 text-left relative overflow-hidden group transition-transform hover:scale-[1.01]"
                >
                    <div className="relative z-10 pr-10">
                        <h3 className="text-3xl font-bold mb-3">Register as a Seller</h3>
                        <p className="text-white/90 text-sm leading-relaxed max-w-md">
                            In today's fast-paced world, you need control over your financial transactions without compromising on security.
                        </p>
                    </div>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <HiChevronRight className="w-8 h-8 text-white" />
                    </div>
                </button>

                <button
                    onClick={onSelectBuyer}
                    className="w-full bg-primary text-white rounded-2xl p-8 text-left relative overflow-hidden group transition-transform hover:scale-[1.01]"
                >
                    <div className="relative z-10 pr-10">
                        <h3 className="text-3xl font-bold mb-3">Register as a Buyer</h3>
                        <p className="text-white/90 text-sm leading-relaxed max-w-md">
                            Save more on every delivery, join the waitlist to unlock delivery discount coupons. Exclusive for new Buyers, enjoy cheaper, faster deliveries
                        </p>
                    </div>
                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                        <HiChevronRight className="w-8 h-8 text-white" />
                    </div>
                </button>
            </div>
        </Modal>
    );
};

export default RegisterSelectionModal;
