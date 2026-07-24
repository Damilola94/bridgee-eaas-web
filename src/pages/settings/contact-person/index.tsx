import type { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '../../../components/wrappers/Layout';
import ContactContainer from '../../../components/pages/settings/ContactContainer';

import type { NextPageWithLayout } from '../../_app';

const Home: NextPageWithLayout = () => (
  <>
    <Head>
      <title>UseBridgee Inc. - Contact</title>
    </Head>

    <ContactContainer />
  </>
);

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout pageName="Contact">{page}</Layout>;
};

export default Home;
