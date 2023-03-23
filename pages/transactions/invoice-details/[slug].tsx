
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import Button from '../../../components/inputs/Button';
import InvoiceDetails from '../../../components/pages/invoice-details/InvoiceDetails';
import ActivityLog from '../../../components/pages/invoice-details/ActivityLog';

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  // console.log(router.query);

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Create Invoice</title>
      </Head>

      <div className="w-full mb-3">
        <Button
          border
          onClick={() => router.back()}
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
        <div className="flex flex-wrap -m-4">
          <div className="w-full xl:w-7/12 p-4">
            <div className="w-full">
              <InvoiceDetails />
            </div>
          </div>

          <div className="w-full xl:w-5/12 p-4">
            <ActivityLog />
          </div>
        </div>
      </div>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
