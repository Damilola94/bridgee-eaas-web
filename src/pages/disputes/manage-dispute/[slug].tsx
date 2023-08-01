
import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import ManageDisputeContainer from '../../../components/pages/disputes/manage-dispute/Container';

const ManageDispute: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT - Manage Dispute</title>
      </Head>

      <ManageDisputeContainer />
    </>
  );
};

ManageDispute.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManageDispute;
