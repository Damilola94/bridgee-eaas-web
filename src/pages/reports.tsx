import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import ReportContainer from '../components/pages/reports/Container';

import type { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Report & Analytics</title>
    </Head>

    <ReportContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Report & Analytics">{page}</Layout>;
};

export default Home;
