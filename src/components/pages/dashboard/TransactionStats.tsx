import React from 'react';
import Image from 'next/image';

import OngoingIcon from '../../../assets/svgs/send-arrow.svg';
import CompletedIcon from '../../../assets/svgs/received-arrow.svg';
import TransactionsIcon from '../../../assets/svgs/transactions-arrow.svg';

type Props = {
  data: {
    ongoingTransactions: number;
    completedTransactions: number;
    totalTransaction: number;
  }
}

function TransactionStats({ data }: Props) {
  return (
    <div className="flex flex-wrap -m-1.5">
      <div className="w-full sm:w-1/2 md:w-1/3 p-1.5">
        <div className="bg-white w-full h-full px-7 pt-7 pb-5 rounded-lg shadow">
          <div className="w-full flex space-x-3">
            <span className="bg-primary w-12 h-12 p-3 rounded-full">
              <Image src={OngoingIcon} alt="" width={50} height={50} className="w-auto h-auto" />
            </span>
            <div className="w-[calc(100%-60px)]">
              <p className="flex items-center text-base mb-1">Ongoing Transactions</p>
              <h1 className="text-2xl font-bold ff-heavy">{data?.ongoingTransactions || 0}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 p-1.5">
        <div className="bg-white w-full h-full px-7 pt-7 pb-5 rounded-lg shadow">
          <div className="w-full flex space-x-3">
            <span className="bg-primary w-12 h-12 p-3 rounded-full">
              <Image src={CompletedIcon} alt="" width={50} height={50} className="w-auto h-auto" />
            </span>
            <div className="w-[calc(100%-60px)]">
              <p className="flex items-center text-base mb-1">Completed Transactions</p>
              <h1 className="text-2xl font-bold ff-heavy">{data?.completedTransactions || 0}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 p-1.5">
        <div className="bg-white w-full h-full px-7 pt-7 pb-5 rounded-lg shadow">
          <div className="w-full flex space-x-3">
            <span className="bg-primary w-12 h-12 p-3 rounded-full">
              <Image src={TransactionsIcon} alt="" width={50} height={50} className="w-auto h-auto" />
            </span>
            <div className="w-[calc(100%-60px)]">
              <p className="flex items-center text-base mb-1">Total Transactions</p>
              <h1 className="text-2xl font-bold ff-heavy">{data?.totalTransaction || 0}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionStats;
