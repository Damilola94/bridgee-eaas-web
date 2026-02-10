'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

import Modal from '../../common/Modal';

import Button from '../../inputs/Button';

interface SatisfiedModalProps {
  isOpen: boolean;
  step: 'confirm' | 'success';
  onClose: () => void;
  onSatisfied: () => void;
  setStep: React.Dispatch<React.SetStateAction<'confirm' | 'success'>>;
  isLoading?: boolean;
}

export default function SatisfiedModal({
  isOpen,
  onClose,
  step,
  setStep,
  onSatisfied,
  isLoading = false
}: SatisfiedModalProps) {

  if (!isOpen) {
    return null;
  }

  const handleSatisfiedConfirm = () => {
    onSatisfied();
  };

  const handleCloseModal = () => {
    setStep('confirm');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseModal}
      maxWidth="max-w-[400px]"
    >
      <div className="space-y-6">
        {step === 'confirm' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-center">Are you satisfied with your order?</h2>
            <p className="text-gray-600 text-center text-sm">
              Kindly note that if you click on proceed, you consent to the satisfaction of your item and release of funds to the seller.
            </p>
            <div className="space-x-3 flex justify-between">
              <Button
                onClick={handleCloseModal}
                textColor="text-primary"
                bgColor="bg-primary/0"
                className="bg-transparent border border-success py-2 w-full text-success"
                paddingY="p-2"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSatisfiedConfirm}
                className="bg-success py-2 w-full text-lg font-bold"
                paddingY="p-2"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <h2 className="text-xl font-bold">Satisfied</h2>
            <p className="text-gray-600 text-sm">
              Your request has been successfully recorded
            </p>
            <Button
              onClick={handleCloseModal}
              className="w-full text-lg font-bold ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2"
            >
              Go back to order screen
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
