
import { ReactElement, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import type { NextPageWithLayout } from '../_app';

import Layout from '../../components/wrappers/Layout';
import Button from '../../components/inputs/Button';

import ReturnGoodsContextProvider from '../../context/ReturnGoods';

import FormIndicator from '../../components/pages/create-invoice/FormIndicator';
import InvoiceSummary from '../../components/pages/disputes/return-goods/InvoiceSummary';
import OrderDetails from '../../components/pages/disputes/return-goods/OrderDetails';
import RecipientDetails from '../../components/pages/disputes/return-goods/RecipientDetails';

const ReturnGoods: NextPageWithLayout = () => {
  const router = useRouter();
  const [formIndex, setFormIndex] = useState(0);

  const handleBack = () => {
    if (formIndex === 0) {
      router.push('/dashboard');
    } else {
      setFormIndex((state) => state -= 1);
    }
  };

  return (
    <>
      <Head>
        <title>Bridge by ALAT - Create Invoice</title>
      </Head>

      <div className="w-full mb-3">
        <Button
          border
          onClick={handleBack}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
        >
          <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          Back
        </Button>
      </div>

      <ReturnGoodsContextProvider>
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <FormIndicator formIndex={formIndex} />
              <div className="w-full">
                {formIndex === 0 && <OrderDetails onNext={() => setFormIndex(1)} />}
                {formIndex === 1 && <RecipientDetails onNext={() => setFormIndex(2)} />}
                {formIndex === 2 && <InvoiceSummary />}
              </div>
            </div>
          </div>
        </div>
      </ReturnGoodsContextProvider>
    </>
  );
};

ReturnGoods.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ReturnGoods;
