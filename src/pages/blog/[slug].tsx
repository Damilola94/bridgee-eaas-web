import type { NextPage } from 'next';
import Head from 'next/head';

import { useRouter } from 'next/router';

import Container from '../../components/pages/singlepostPage/Container';

const SinglePost: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>UseBridgee</title>
      </Head>

      <Container params={{
        slug: router?.query?.slug as string
      }} />
    </>
  );
};

export default SinglePost;
