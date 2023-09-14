import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from '../_app';

import Layout from '../../components/wrappers/Layout';
import GetStartedContainer from '../../components/pages/get-started/main/Container';

const GetStarted: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT - Get Started</title>
      </Head>

      <div className="w-full mt-10">
        <GetStartedContainer />
      </div>

    </>
  );
};

GetStarted.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default GetStarted;
