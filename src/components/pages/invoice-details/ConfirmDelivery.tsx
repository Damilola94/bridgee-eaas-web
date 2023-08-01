import React, { useState } from 'react';
import Image from 'next/image';
import AuthCode from 'react-auth-code-input';
import { useMutation, useQueryClient } from 'react-query';

import SuccessSvg from '../../../assets/svgs/success-tick.svg';
import notification from '../../../utilities/notification';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';
import handleFetch from '../../../services/api/handleFetch';
import Loading from '../../common/Loading';

type Props = {
  onClose: () => void;
  escrowId?: string
};

function ConfirmDelivery({ onClose, escrowId }: Props) {
  const [formIndex, setFormIndex] = useState(0);
  const [otp, setOtp] = useState('');

  const queryClient = useQueryClient();
  const paymentMutation = useMutation(handleFetch, {
    onSuccess: () => {
      queryClient.invalidateQueries(['escrow', escrowId]);
      setFormIndex(1);
    },
    onError: (err) => {
      notification({
        title: 'Error',
        message: String(err) || 'An error occured while requesting for payment OTP',
        type: 'danger'
      });
    }
  });

  const authenticateTransaction = () => {
    if (otp?.length < 6) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid OTP',
        type: 'danger'
      });
      return;
    }

    const body = { escrowId, otp };

    paymentMutation.mutate({
      endpoint: 'escrow', extra: 'complete-escrow-order', method: 'POST', body, auth: true
    });
  };

  const { isLoading, isSuccess } = paymentMutation;

  return (
    <>
      {isLoading && <Loading />}

      <Modal isOpen onClose={onClose} maxWidth='max-w-[400px]'>
        {formIndex === 0 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full text-textColor ff-bold text-xl">Confirm Delivery</h1>
              <p className="text-sm text-lightText">An OTP has been sent to your email address</p>
            </div>

            <div className="w-full mb-10">
              <p className="text-sm font-bold mb-1">Enter OTP</p>
              <AuthCode
                length={6}
                allowedCharacters="numeric"
                containerClassName="w-full flex justify-between mb-2"
                inputClassName="w-[15%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                onChange={(val: string) => setOtp(val)}
              />
            </div>

            <div className="flex -mx-2">
              <div className="w-1/2 px-2">
                <Button
                  onClick={onClose}
                  border
                  paddingX="px-10"
                  bgColor="bg-white"
                  textColor="text-success"
                  className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
                  paddingY="p-2.5"
                >
                  Cancel
                </Button>
              </div>
              <div className="w-1/2 px-2">
                <Button
                  onClick={authenticateTransaction}
                  paddingX="px-10"
                  className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
                  paddingY="p-2.5"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {formIndex === 1 && isSuccess && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full pr-10 text-textColor ff-bold text-xl">Delivery confirmation is successful</h1>
            </div>

            <div className="w-full mb-10">
              <Image src={SuccessSvg} alt="" className="mx-auto" />
            </div>

            <Button
              onClick={onClose}
              paddingX="px-10"
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
              paddingY="p-2.5"
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ConfirmDelivery;
