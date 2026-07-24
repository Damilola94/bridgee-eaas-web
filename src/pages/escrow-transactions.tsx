import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import EscrowContainer from '../components/pages/escrows/Container';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Escrow</title>
    </Head>

    <EscrowContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Escrow Transactions">{page}</Layout>;
};

export default Home;
