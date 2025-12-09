import type { NextPage } from 'next';
import Head from 'next/head';

import Container from '../components/pages/singlepostPage/Container';

const SinglePost: NextPage = () => (
  <>
    <Head>
      <title>UseBridgee</title>
    </Head>

    <Container params={{
      slug: ''
    }} />
  </>
);

export default SinglePost;
