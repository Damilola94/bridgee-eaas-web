import React from 'react';
import Image from 'next/image';

import { FiArrowRight } from 'react-icons/fi';

import ReceiptIcon from '../../../assets/svgs/receipt.svg';
import Button from '../../inputs/Button';

function TransactionBanner() {
  return (
    <div className="w-full bg-[url('../assets/svgs/transaction-banner.svg')] bg-center bg-cover bg-no-repeat py-10 px-12 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <div className="w-full sm:w-[calc(100%-140px)] max-w-md text-white">
          <h2 className="font-bold ff-bold text-3xl mb-5">Start a transaction</h2>
          <p className="text-base leading-relaxed mb-10">
            Start a transaction by creating an invoice and inviting to other parties to fulfil it. Anyone can start a transaction.
          </p>
          <Button paddingY="py-3" className="rounded-none">
            Start a transaction
            <FiArrowRight className="ml-2" />
          </Button>
        </div>
        <div className="hidden sm:block">
          <span className="rounded-full bg-white/20 flex p-7">
            <Image src={ReceiptIcon} alt="" width={80} height={80} className="w-auto h-auto" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionBanner;
