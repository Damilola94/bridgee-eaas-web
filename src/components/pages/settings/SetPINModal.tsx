import React, { useState } from 'react';
import Image from 'next/image';
import AuthCode from 'react-auth-code-input';
import { useMutation } from 'react-query';

import SuccessSvg from '../../../assets/svgs/success-tick.svg';
import notification from '../../../utilities/notification';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';
import handleFetch from '../../../services/api/handleFetch';
import Loading from '../../common/Loading';
import { useAccountsContext } from '../../../context/Accounts';

type Props = {
  onClose: () => void;
};

function SetPINModal({ onClose }: Props) {
  const { setAccounts, accounts } = useAccountsContext();

  const [formIndex, setFormIndex] = useState(0);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [otp, setOtp] = useState('');

  const requestOtpMutation = useMutation(handleFetch, {
    onError: (err) => {
      notification({
        title: 'Error',
        message: String(err) || 'An error occurred while requesting for PIN setup OTP',
        type: 'danger'
      });
    }
  });

  const pinMutation = useMutation(handleFetch, {
    onSuccess: () => {
      const accts = { ...accounts };

      accts.defaultWallets[0].isTransactionPinSet = true;
      setAccounts(accts);
      setFormIndex(3);
    },
    onError: (err) => {
      notification({
        title: 'Error',
        message: String(err) || 'An error occurred while setting up your transaction PIN',
        type: 'danger'
      });
    }
  });

  const handleSetPIN = () => {
    if (pin?.length < 4) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid PIN',
        type: 'danger'
      });
      return;
    }
    setFormIndex(1);
  };

  const handleSetPINConfirmation = () => {
    if (confirmPin?.length < 4) {
      notification({
        title: 'Form Error', message: 'Please, enter a valid PIN', type: 'danger'
      });
      return;
    }
    if (confirmPin !== pin) {
      notification({
        title: 'Form Error', message: 'PIN mismatch', type: 'danger'
      });
      return;
    }

    requestOtpMutation.mutate({
      endpoint: 'auth',
      extra: 'generate-otp',
      pQuery: { otpPurpose: 'TransactionPin' },
      method: 'POST',
      auth: true
    });
    setFormIndex(2);
  };

  const handleSubmit = () => {
    if (otp?.length < 6) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid OTP',
        type: 'danger'
      });
      return;
    }

    const body = { otp, pin, confirmPin };

    pinMutation.mutate({
      endpoint: 'transaction', extra: 'setup-transaction-pin', method: 'POST', body, auth: true
    });
  };

  const { isLoading, isSuccess } = pinMutation;

  return (
    <>
      {isLoading && <Loading />}

      <Modal isOpen onClose={onClose} maxWidth='max-w-[400px]'>
        {formIndex === 0 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full text-textColor ff-bold text-xl">Set a new PIN code</h1>
              <p className="text-sm text-lightText">Use your pin code to confirm transactions</p>
            </div>

            <div className="w-full mb-10">
              <p className="text-sm font-bold mb-1">Enter new PIN</p>
              <AuthCode
                length={4}
                allowedCharacters="numeric"
                containerClassName="w-full flex justify-between mb-2"
                inputClassName="w-[22%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                onChange={(val: string) => setPin(val)}
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
                  onClick={handleSetPIN}
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

        {formIndex === 1 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full text-textColor ff-bold text-xl">Set a new PIN code</h1>
              <p className="text-sm text-lightText">Use your pin code to confirm transactions</p>
            </div>

            <div className="w-full mb-10">
              <p className="text-sm font-bold mb-1">Confirm new PIN</p>
              <AuthCode
                length={4}
                allowedCharacters="numeric"
                containerClassName="w-full flex justify-between mb-2"
                inputClassName="w-[22%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
                onChange={(val: string) => setConfirmPin(val)}
              />
            </div>

            <div className="flex -mx-2">
              <div className="w-1/2 px-2">
                <Button
                  onClick={() => setFormIndex(0)}
                  border
                  paddingX="px-10"
                  bgColor="bg-white"
                  textColor="text-success"
                  className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
                  paddingY="p-2.5"
                >
                  Back
                </Button>
              </div>
              <div className="w-1/2 px-2">
                <Button
                  onClick={handleSetPINConfirmation}
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

        {formIndex === 2 && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full text-textColor ff-bold text-xl">Set a new PIN code</h1>
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
                  onClick={() => setFormIndex(1)}
                  border
                  paddingX="px-10"
                  bgColor="bg-white"
                  textColor="text-success"
                  className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
                  paddingY="p-2.5"
                >
                  Back
                </Button>
              </div>
              <div className="w-1/2 px-2">
                <Button
                  onClick={handleSubmit}
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

        {formIndex === 3 && isSuccess && (
          <div className="w-full py-5">
            <div className="mb-7">
              <h1 className="w-full pr-10 text-textColor ff-bold text-xl">You have successfully setup your transaction PIN</h1>
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

export default SetPINModal;
