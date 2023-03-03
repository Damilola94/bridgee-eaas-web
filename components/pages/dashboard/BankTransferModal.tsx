import React from 'react';
import { useAccountsContext } from '../../../context/Accounts';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

type Props = {
  onClose: () => void
};

function BankTransferModal({ onClose }: Props) {
  const { accounts } = useAccountsContext();

  return (
    <Modal isOpen onClose={onClose} maxWidth='max-w-[400px]'>
      <div className="w-full py-5">
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">Make Transfer</h1>
        </div>

        <div className="w-full">
          <div className="w-full text-center bg-secondary rounded-xl px-5 py-5 mb-10">
            <h4 className="font-bold text-lg mb-1">Wema Bank</h4>
            <h2 className="ff-heavy text-2xl mb-3">{accounts?.defaultWallets?.[0]?.virtualAccount}</h2>
            <p className="">Use this account for this transaction only Account expires in 15 minutes</p>
          </div>
          <Button
            border
            onClick={onClose}
            paddingX="px-10"
            bgColor="bg-white"
            textColor="text-success"
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
          >
            Okay
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default BankTransferModal;
