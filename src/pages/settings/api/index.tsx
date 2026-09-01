import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../../components/wrappers/Layout';
import APIKey from '../../../components/pages/settings/APIKeyContainer';

import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - API Key</title>
    </Head>

    <APIKey />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Settings">{page}</Layout>;
};

export default Home;
