import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { FiArrowRight } from 'react-icons/fi';

import ReceiptIcon from '../../../assets/svgs/receipt.svg';
import Button from '../../inputs/Button';

function TransactionBanner() {
  const router = useRouter();

  return (
    <div className="w-full bg-primary py-10 px-12 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <div className="w-full sm:w-[calc(100%-140px)] max-w-md text-white">
          <h2 className="font-bold ff-bold text-3xl mb-5">Create payment link</h2>
          <p className="text-base leading-relaxed mb-10">
            Start a transaction by creating a payment link for your customer
          </p>
          <div className='flex'>
            <Button
              className="w-fit flex items-center justify-center"
              paddingY="py-3"
              onClick={() => router.push('/create-invoice')}
              iconPosition="right"
              icon={<FiArrowRight className="ml-2" />}
            >
              Create payment link
            </Button>
          </div>

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
