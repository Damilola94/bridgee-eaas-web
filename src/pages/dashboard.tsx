import type { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';
import useGetQuery from '../hooks/useGetQuery';

import WalletCard from '../components/pages/dashboard/WalletCard';
import TransactionStats from '../components/pages/dashboard/TransactionStats';
import TransactionBanner from '../components/pages/dashboard/TransactionBanner';
import TransactionHistory from '../components/pages/dashboard/TransactionHistory';
import DisputeHistory from '../components/pages/dashboard/DisputeHistory';
import InvoiceHistory from '../components/pages/dashboard/InvoiceHistory';

const Home: NextPageWithLayout = () => {
  const { data, status, error } = useGetQuery({
    endpoint: 'dashboard',
    extra: 'recent-invoices-and-summary',
    queryKey: ['recent-invoices-and-summary']
  });

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Dashboard</title>
      </Head>

      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className="w-full xl:w-[calc(100%-400px)] px-3 pt-3 pb-5">
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
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
