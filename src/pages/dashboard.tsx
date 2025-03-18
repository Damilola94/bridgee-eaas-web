import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import DashboardContainer from '../components/pages/dashboard/Container';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridge Escrow - Dashboard</title>
    </Head>

    <DashboardContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
