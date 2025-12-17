import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../components/wrappers/Layout';
import DashboardContainer from '../../components/pages/buyer/dashboard/Container';

import type { NextPageWithLayout } from '../_app';

const BuyerDashboard: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Buyer Dashboard</title>
    </Head>

    <DashboardContainer />
  </>
);

BuyerDashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default BuyerDashboard;