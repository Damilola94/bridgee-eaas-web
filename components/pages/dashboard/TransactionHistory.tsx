import React from 'react';
import Link from 'next/link';
import { RxChevronRight } from 'react-icons/rx';

import transactions from '../../../sample-data/transactions';

import InflowArrow from '../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../assets/svg-tsx/OutflowArrow';
import { statusTitle } from '../../../data/status';
import { formatChannel, formatCurrency } from '../../../utilities/general';
import { formatDateTime } from '../../../utilities/dateTime';
import { useAccountsContext } from '../../../context/Accounts';

function TransactionHistory() {
  const { accounts } = useAccountsContext();

  return (
    <div className="w-full h-full">
      <div className="flex bg-white justify-between items-center p-5 border-b">
        <h3 className="text-lg font-bold ff-bold">Wallet Transactions</h3>
        <Link href="/transactions?tab=wallet">
          <span className="text-primary text-sm flex items-center hover:underline">
            See All
            <RxChevronRight className="w-5 h-auto mb-1" />
          </span>
        </Link>
      </div>

      <div className="w-full px-5 h-[calc(100%-62px)] overflow-auto hide-scroll">
        {transactions?.map((item) => (
          <div key={item?.id} className="w-full flex justify-between py-3 border-b">
            <div className="flex items-center space-x-3">
              <span className={`w-8 h-8 ${item?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'} p-2 rounded-full`}>
                {item?.type === 'credit'
                  ? <InflowArrow className="w-4 h-4" color="#03543F" />
                  : <OutflowArrow className="w-4 h-4" color="#EB4336" />
                }
              </span>
              <div>
                <p className="text-base font-bold">{formatChannel(item?.channel)}</p>
                <p className="text-xs text-lightText">{statusTitle?.[item?.status as keyof typeof statusTitle] || item?.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-base font-bold">{formatCurrency(item?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}</p>
              <p className="text-xs text-lightText">{formatDateTime(item?.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
