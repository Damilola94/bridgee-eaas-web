import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from './_app';

import Layout from '../components/wrappers/Layout';

const Disputes: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT - Disputes</title>
      </Head>

      <div className="w-full">
        <h2 className="font-bold ff-bold text-2xl mb-3">Disputes</h2>
      </div>
    </>
  );
};

Disputes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Disputes;
