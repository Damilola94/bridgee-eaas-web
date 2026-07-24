import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../components/wrappers/Layout';
import DisputeDetailsContainer from '../../components/pages/disputes/DetailsContainer';

import type { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Dispute Details Management</title>
    </Head>

    <DisputeDetailsContainer params={{ disputeId: "123" }} />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Dispute Details Management">{page}</Layout>;
};

export default Home;
