import React, { useState } from 'react';
import { RiFileCopyLine } from 'react-icons/ri';

import { useAccountsContext } from '../../../context/Accounts';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

type Props = {
  onClose: () => void;
};

function BankTransferModal({ onClose }: Props) {
  const { accounts } = useAccountsContext();
  const [copiedAccountNo, setCopiedAccountNo] = useState(false);

  const accountNumber =
    accounts?.defaultWallets?.[0]?.virtualAccount || '';

  const handleCopy = async () => {
    if (!accountNumber) return;

    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedAccountNo(true);

      setTimeout(() => {
        setCopiedAccountNo(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy account number:', error);
    }
  };

  return (
    <Modal isOpen onClose={onClose} maxWidth="max-w-[400px]">
      <div className="w-full py-5">
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">
            Make Transfer
          </h1>
        </div>

        <div className="w-full">
          <div className="w-full text-center bg-secondary rounded-xl px-5 py-5 mb-10">
            <h4 className="font-bold text-lg mb-1">Wema Bank</h4>

            <h2 className="flex ff-heavy text-2xl justify-center items-center mb-3">
              <span className="mr-4">{accountNumber}</span>

              {copiedAccountNo ? (
                <span className="text-[#9CA3AF] text-sm">
                  Copied
                </span>
              ) : (
                <RiFileCopyLine
                  className="text-[#9CA3AF] cursor-pointer"
                  onClick={handleCopy}
                />
              )}
            </h2>

            <p>
              To fund your wallet for any transaction, please use this account
              number.
            </p>
          </div>

          <Button
            border
            onClick={onClose}
            paddingX="px-10"
            bgColor="bg-white"
            textColor="text-success"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl hover:bg-success hover:text-white"
            paddingY="p-3.5"
          >
            I&apos;ve sent the money
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default BankTransferModal;