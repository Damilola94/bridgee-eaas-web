import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../components/wrappers/Layout';
import DisputeContainer from '../../components/pages/disputes/Container';

import type { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Dispute Management</title>
    </Head>

    <DisputeContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Dispute Management">{page}</Layout>;
};

export default Home;
