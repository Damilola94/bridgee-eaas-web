import type { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT - Transactions</title>
      </Head>

      <div className="w-full">
        Transactions...
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
