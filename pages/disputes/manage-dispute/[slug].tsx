
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import type { NextPageWithLayout } from '../../_app';

import Layout from '../../../components/wrappers/Layout';
import Button from '../../../components/inputs/Button';
import FormIndicator from '../../../components/pages/disputes/manage-dispute/FormIndicator';
import OpenDispute from '../../../components/pages/disputes/manage-dispute/OpenDispute';
import DisputeGuide from '../../../components/pages/disputes/manage-dispute/DisputeGuide';
import TransactionStatus from '../../../components/common/TransactionStatus';
import DisputeProgress from '../../../components/pages/disputes/manage-dispute/DisputeProgress';

const ManageDispute: NextPageWithLayout = () => {
  const router = useRouter();
  const [formIndex, setFormIndex] = useState(0);

  // console.log(router.query);

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Manage Dispute</title>
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
            <FormIndicator formIndex={formIndex} />

            <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md mb-5">
              <table className="text-[#888888]">
                <tbody>
                  <tr className="">
                    <td className="py-1 pr-5 text-right">Invoice Number</td>
                    <td className="py-1">#83JHW4</td>
                  </tr>
                  <tr className="">
                    <td className="py-1 pr-5 text-right">Invoice Title</td>
                    <td className="py-1">Cloths purchase from James Bond</td>
                  </tr>
                  <tr className="">
                    <td className="py-1 pr-5 text-right">Date Created</td>
                    <td className="py-1">March 20, 2023</td>
                  </tr>
                  <tr className="">
                    <td className="py-1 pr-5 text-right">Order Status</td>
                    <td className="py-1">
                      <TransactionStatus status='dispute' />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="w-full">
              {formIndex === 0 && <OpenDispute onNext={() => setFormIndex(1)} />}
              {formIndex === 1 && <DisputeProgress onNext={() => setFormIndex(2)} />}
              {formIndex === 2 && <DisputeProgress onNext={() => setFormIndex(2)} />}
            </div>
          </div>

          <div className="w-full xl:w-5/12 p-4">
            <DisputeGuide />
          </div>
        </div>
      </div>
    </>
  );
};

ManageDispute.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ManageDispute;
