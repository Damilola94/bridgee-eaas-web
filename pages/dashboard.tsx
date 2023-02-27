import type { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';
import { useAccountsContext } from '../context/Accounts';
import { logger } from '../utilities/general';
import WalletCard from '../components/pages/dashboard/WalletCard';

const Home: NextPageWithLayout = () => {
  const { accounts } = useAccountsContext();

  logger(accounts);

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Dashboard</title>
      </Head>

      <div className="flex w-[calc(100%+36px)] -m-5">
        <div className='w-[calc(100%-400px)] px-3 pt-3 pb-20'>
          <WalletCard />
        </div>
        <div className="fixed right-0 top-0 bg-white h-screen w-[400px]">
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
