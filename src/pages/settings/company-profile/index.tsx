import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../../components/wrappers/Layout';
import CompanyContainer from '../../../components/pages/settings/CompanyContainer';

import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Company Profile</title>
    </Head>

    <CompanyContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Company Profile">{page}</Layout>;
};

export default Home;
