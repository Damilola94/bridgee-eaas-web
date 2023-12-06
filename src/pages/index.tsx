import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '../components/pages/homepage/Container';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Bridge by ALAT</title>
    </Head>

    <Container />
  </>
);

export default Home;
