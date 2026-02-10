
import { ReactElement } from 'react';
import Head from 'next/head';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import ManageDisputeContainer from '../../../components/pages/buyer-disputes/manage-dispute/Container';
import DisputeContextProvider from '../../../context/Dispute';

const ManageDispute: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Manage Dispute</title>
    </Head>

    <DisputeContextProvider>
      <ManageDisputeContainer />
    </DisputeContextProvider>
  </>
);

ManageDispute.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManageDispute;
