import type { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';
import { useAccounts } from '../context/Accounts';
import { logger } from '../utilities/general';

const Home: NextPageWithLayout = () => {
  const { accounts } = useAccounts();

  logger(accounts?.defaultWallets?.[0]);

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Dashboard</title>
      </Head>

      <div className="w-full">
        Main Dashboard...
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
