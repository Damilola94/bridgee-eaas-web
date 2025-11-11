import { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../components/wrappers/Layout';
import InvitesContainer from '../components/pages/invites/Container';

import type { NextPageWithLayout } from './_app';

const Invites: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Invites</title>
    </Head>

    <div className="w-full">
      <h2 className="font-bold ff-bold text-2xl mb-3">Invites</h2>

      <div className="w-full max-w-7xl mt-10">
        <InvitesContainer />
      </div>
    </div>

  </>
);

Invites.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Invites;
