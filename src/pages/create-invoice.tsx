import { ReactElement, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import Layout from '../components/wrappers/Layout';
import Button from '../components/inputs/Button';

import FormIndicator from '../components/pages/create-invoice/FormIndicator';
import OrderSummary from '../components/pages/create-invoice/OrderSummary';
import OrderDetails from '../components/pages/create-invoice/OrderDetails';
import RecipientDetails from '../components/pages/create-invoice/RecipientDetails';
import InvoiceSummary from '../components/pages/create-invoice/InvoiceSummary';
import CreateInvoiceContextProvider from '../context/CreateInvoice';

import type { NextPageWithLayout } from './_app';

const CreateInvoice: NextPageWithLayout = () => {
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
        <title>UseBridge Inc. - Create Invoice</title>
      </Head>

      <div className="w-full mb-3">
        <Button
          border
          onClick={handleBack}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
          iconPosition="left"
          icon={
            <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          }
        >
          Back
        </Button>
      </div>

      <CreateInvoiceContextProvider>
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

            <div className="w-full xl:w-5/12 p-4">
              <OrderSummary />
            </div>
          </div>
        </div>
      </CreateInvoiceContextProvider>
    </>
  );
};

CreateInvoice.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateInvoice;
