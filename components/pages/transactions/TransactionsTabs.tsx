import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import InvoiceIcon from '../../../assets/svgs/invoice.svg';
import WalletIcon from '../../../assets/svgs/empty-wallet.svg';

function TransactionsTabs() {
  const router = useRouter();
  const { tab } = router.query || {};

  return (
    <div className="w-full max-w-lg">
      <div className="flex -mx-3">
        <div className="w-1/2 p-3">
          <div
            role="presentation"
            onClick={() => router.push({ pathname: '/transactions', query: { tab: 'invoice', status: 'all' } })}
            className={`bg-white ${tab === 'invoice' ? 'border-2 border-success' : 'border'} cursor-pointer rounded-lg px-7 py-5`}
          >
            <div className="flex items-center space-x-5">
              <span className="rounded-full bg-primary/10 flex p-3">
                <Image src={InvoiceIcon} alt="" width={40} height={40} className="w-[40px] h-[40px]" />
              </span>
              <p className="font-bold text-lg">Invoice</p>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-3">
          <div
            role="presentation"
            onClick={() => router.push({ pathname: '/transactions', query: { tab: 'wallet', status: 'all' } })}
            className={`bg-white ${tab === 'wallet' ? 'border-2 border-success' : 'border'} cursor-pointer rounded-lg px-7 py-5`}
          >
            <div className="flex items-center space-x-5">
              <span className="rounded-full bg-primary/10 flex p-3">
                <Image src={WalletIcon} alt="" width={40} height={40} className="w-[40px] h-[40px]" />
              </span>
              <p className="font-bold text-lg">Wallet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTabs;
