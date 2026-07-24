import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../../components/wrappers/Layout';
import PersonalizatonContainer from '../../../components/pages/settings/PersonalizatonContainer';

import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Personalization</title>
    </Head>

    <PersonalizatonContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Personalization">{page}</Layout>;
};

export default Home;
