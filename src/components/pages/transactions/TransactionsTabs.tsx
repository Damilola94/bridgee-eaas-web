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
      <div className="flex -mx-1.5 xs:-mx-3">
        <div className="w-1/2 p-1.5 xs:p-3">
          <div
            role="presentation"
            onClick={() => router.push({ pathname: '/transactions', query: { tab: 'sales', status: 'all' } })}
            className={`h-full bg-white ${tab === 'sales' ? 'border-2 border-success' : 'border'} cursor-pointer rounded-lg px-3 xs:px-7 py-5`}
          >
            <div className="flex items-center space-x-5">
              <span className="rounded-full bg-primary/10 flex p-2 xs:p-3">
                <Image src={InvoiceIcon} alt="" width={40} height={40} />
              </span>
              <p className="font-bold text-lg">Sales</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-1.5 xs:p-3">
          <div
            role="presentation"
            onClick={() => router.push({ pathname: '/transactions', query: { tab: 'wallet', status: 'all' } })}
            className={`h-full bg-white ${tab === 'wallet' ? 'border-2 border-success' : 'border'} cursor-pointer rounded-lg px-3 xs:px-7 py-5`}
          >
            <div className="flex items-center space-x-5">
              <span className="rounded-full bg-primary/10 flex p-2 xs:p-3">
                <Image src={WalletIcon} alt="" width={40} height={40} />
              </span>
              <p className="font-bold text-lg"> Wallet </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTabs;
