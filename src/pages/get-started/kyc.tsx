import { ReactElement } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import type { NextPageWithLayout } from '../_app';

import Layout from '../../components/wrappers/Layout';
import Button from '../../components/inputs/Button';
import KycContainer from '../../components/pages/get-started/kyc/Container';

const KYC: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Bridge by ALAT - KYC</title>
      </Head>

      <div className="w-full mb-3">
        <Button
          border
          onClick={() => router.push('/get-started')}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
        >
          <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          Back
        </Button>
      </div>

      <div className="w-full">
        <KycContainer />
      </div>

    </>
  );
};

KYC.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default KYC;
