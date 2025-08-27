import React from 'react';

import useGetQuery from '../../../hooks/useGetQuery';

import { useAccountsContext } from '../../../context/Accounts';

import WalletCard from './WalletCard';
import TransactionBanner from './TransactionBanner';
import DisputeHistory from './DisputeHistory';
import SalesHistory from './SalesHistory';
import WalletHistory from './WalletHistory';
import EscrowInviteReminder from './EscrowInviteReminder';
import EscrowCard from './EscrowCard';
import WithdrawalPinBanner from './CreateWithdrawalPin';

function DashboardContainer() {
  const { data, status, error } = useGetQuery({
    endpoint: 'dashboard',
    extra: 'recent-invoices-and-summary',
    queryKey: ['recent-invoices-and-summary']
  });

  const { accounts } = useAccountsContext();

  return (
    <>
      <EscrowInviteReminder />
      <h3 className="text-lg mb-5">
          Hello&nbsp;
        <span className="font-bold">{accounts?.defaultMerchant?.name || accounts?.user?.firstName || 'Toluwalase'}</span>
      </h3>

      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className="w-full xl:w-[calc(100%-400px)] px-3 pt-3 pb-5">
          <div className="w-full mb-3">
            <WithdrawalPinBanner />
          </div>
          <div className="w-full mb-3 sm:flex sm:space-x-3 space-y-3 sm:space-y-0">
            <WalletCard />
            <EscrowCard />
          </div>
          <div className="w-full mb-3">
            <TransactionBanner />
          </div>
          <div className="w-full mb-3">
            <WalletHistory data={data?.data?.recentInvoice} status={status} error={error} />
          </div>
          <div className="w-full">
            <SalesHistory data={data?.data?.recentInvoice} status={status} error={error} />
          </div>
        </div>

        <div className="hidden xl:block fixed right-0 top-0 h-screen w-[400px] border-l pt-20">
          <div className="h-full flex flex-col">
            <div className="">
              <DisputeHistory />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardContainer;
