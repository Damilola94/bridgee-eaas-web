import Image from 'next/image';
import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';
import { BsBank } from 'react-icons/bs';

import SuccessSvg from '../../../assets/svgs/success-tick.svg';
import notification from '../../../utilities/notification';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

type Props = {
  onClose: () => void
};

function WithdrawalModal({ onClose }: Props) {
  const [formIndex, setFormIndex] = useState(0);
  const [otp, setOtp] = useState('');

  const authenticateTransaction = () => {
    if (otp?.length < 4) {
      notification({
        title: 'Form Error',
        message: 'Please, enter a valid PIN',
        type: 'danger'
      });
      return;
    }

    setFormIndex(3);
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth='max-w-[400px]'>
      {formIndex === 0 && (
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full text-textColor ff-bold text-xl">Choose bank account</h1>
          </div>

          <div className="w-full mb-10">
            <div className="w-full bg-secondary rounded-lg border px-5 py-2 mb-4">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <BsBank className="text-primary w-9 h-auto" />
                  <div className="">
                    <h4 className="font-bold text-base mb-1">Wema Bank</h4>
                    <h4 className="text-xs">Musa Emeka Tunde</h4>
                  </div>
                </div>
                <h4 className="text-base">0938838334</h4>
              </div>
            </div>

            <div className="w-full bg-secondary rounded-lg border px-5 py-2">
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <BsBank className="text-primary w-9 h-auto" />
                  <div className="">
                    <h4 className="font-bold text-base mb-1">Wema Bank</h4>
                    <h4 className="text-xs">Musa Emeka Tunde</h4>
                  </div>
                </div>
                <h4 className="text-base">0938838334</h4>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setFormIndex(1)}
            paddingX="px-10"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
          >
            Continue
          </Button>
        </div>
      )}

      {formIndex === 1 && (
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full text-textColor ff-bold text-xl">Enter Amount</h1>
          </div>

          <div className="w-full mb-10">
            <p className="text-sm font-bold mb-1">Enter amount</p>
            <div className="w-full flex items-center bg-secondary rounded-lg border overflow-hidden">
              <div className="font-lg px-3 py-3 font-semibold border-r">NGN</div>
              <div className="w-full">
                <input type="number" className="w-full block bg-transparent px-3 py-3 outline-none text-lg font-bold ff-heavy" />
              </div>
            </div>
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
                onClick={() => setFormIndex(2)}
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
            <h1 className="w-full text-textColor ff-bold text-xl">Authenticate Withdrawal</h1>
          </div>

          <div className="w-full mb-10">
            <p className="text-sm font-bold mb-1">Enter PIN</p>
            <AuthCode
              length={4}
              allowedCharacters="numeric"
              containerClassName="w-full flex justify-between mb-2"
              inputClassName="w-[22%] rounded-lg h-[60px] border border-[#777] outline-none text-center text-xl"
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

      {formIndex === 3 && (
        <div className="w-full py-5">
          <div className="mb-7">
            <h1 className="w-full pr-10 text-textColor ff-bold text-xl">Transaction has been initiated successfully</h1>
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
  );
}

export default WithdrawalModal;
