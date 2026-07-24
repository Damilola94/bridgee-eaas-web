import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import DashboardContainer from '../components/pages/dashboard/Container';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Dashboard</title>
    </Head>

    <DashboardContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Dashboard">{page}</Layout>;
};

export default Home;
