
import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import Button from '../../../components/inputs/Button';
import InvoiceDetails from '../../../components/pages/invoice-details/InvoiceDetails';
import ActivityLog from '../../../components/pages/invoice-details/ActivityLog';
import useGetQuery from '../../../hooks/useGetQuery';
import Loading from '../../../components/common/Loading';

const Index: NextPageWithLayout = () => {
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Invoice Details</title>
      </Head>

      {status === 'loading' && <Loading />}

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

      {status === 'success' && (<div className="w-full">
        <div className="flex flex-wrap -m-4">
          <div className="w-full xl:w-7/12 p-4">
            <div className="w-full">
              <InvoiceDetails data={data?.data} />
            </div>
          </div>

          <div className="w-full xl:w-5/12 p-4">
            <ActivityLog data={data?.data} />
          </div>
        </div>
      </div>)}

      {status === 'error' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
