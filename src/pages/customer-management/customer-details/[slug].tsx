
import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import Container from '../../../components/pages/customer-details/Container';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>UseBridgee Inc. - Invoice Details</title>
      </Head>

      <Container />
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
