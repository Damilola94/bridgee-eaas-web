import type { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';
import { useAccountsContext } from '../context/Accounts';
import { logger } from '../utilities/general';
import WalletCard from '../components/pages/dashboard/WalletCard';
import TransactionStats from '../components/pages/dashboard/TransactionStats';
import TransactionBanner from '../components/pages/dashboard/TransactionBanner';
import InvoiceList from '../components/pages/transactions/invoice/List';

const Home: NextPageWithLayout = () => {
  const { accounts } = useAccountsContext();

  logger(accounts);

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Dashboard</title>
      </Head>

      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className="w-full xl:w-[calc(100%-350px)] px-3 pt-3 pb-5">
          <div className="w-full mb-3">
            <WalletCard />
          </div>
          <div className="w-full mb-3">
            <TransactionStats />
          </div>
          <div className="w-full mb-3">
            <TransactionBanner />
          </div>
          <div className="w-full">
            <InvoiceList showFilter={false} />
          </div>
        </div>

        <div className="hidden xl:block fixed right-0 top-0 bg-white h-screen w-[350px] border-l pt-20">
          Disputes
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
