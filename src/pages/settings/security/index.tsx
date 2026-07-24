import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../../components/wrappers/Layout';
import SecurityContainer from '../../../components/pages/settings/SecurityContainer';

import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Settings</title>
    </Head>

    <SecurityContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Settings">{page}</Layout>;
};

export default Home;
