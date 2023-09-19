import React from 'react';

import useGetQuery from '../../../hooks/useGetQuery';

import WalletCard from './WalletCard';
import TransactionStats from './TransactionStats';
import TransactionBanner from './TransactionBanner';
import TransactionHistory from './TransactionHistory';
import DisputeHistory from './DisputeHistory';
import InvoiceHistory from './InvoiceHistory';
import IncompleteKycNotifier from './IncompleteKycNotifier';

function DashboardContainer() {
  const { data, status, error } = useGetQuery({
    endpoint: 'dashboard',
    extra: 'recent-invoices-and-summary',
    queryKey: ['recent-invoices-and-summary']
  });

  return (
    <div className="flex w-[calc(100%+36px)] -m-5">
      <div className="w-full xl:w-[calc(100%-400px)] px-3 pt-3 pb-5">
        <IncompleteKycNotifier />
        <div className="w-full mb-3">
          <WalletCard />
        </div>
        <div className="w-full mb-3">
          <TransactionStats data={data?.data?.invoiceTransactionSummary} />
        </div>
        <div className="w-full mb-3">
          <TransactionBanner />
        </div>
        <div className="w-full">
          <InvoiceHistory data={data?.data?.recentInvoice} status={status} error={error} />
        </div>
      </div>

      <div className="hidden xl:block fixed right-0 top-0 h-screen w-[400px] border-l pt-20">
        <div className="h-full flex flex-col">
          <div className="h-1/2">
            <TransactionHistory />
          </div>
          <div className="h-1/2">
            <DisputeHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
