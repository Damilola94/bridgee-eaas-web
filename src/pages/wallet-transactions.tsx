import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import WalletContainer from '../components/pages/wallets/Container';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Wallet</title>
    </Head>

    <WalletContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Wallet Transactions">{page}</Layout>;
};

export default Home;
