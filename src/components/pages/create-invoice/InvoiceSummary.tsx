import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Skeleton from 'react-loading-skeleton';

import DefaultLogo from '../../../assets/images/business-logo.png';

import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import { useCreateInvoiceContext } from '../../../context/CreateInvoice';
import { useAccountsContext } from '../../../context/Accounts';
import { formatCurrency } from '../../../utilities/general';
import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import useGetQuery from '../../../hooks/useGetQuery';

function InvoiceSummary() {
  const router = useRouter();
  const { form } = useCreateInvoiceContext();
  const { accounts } = useAccountsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const total = form?.escrowItems?.reduce((sum, item) => sum + (item?.total || 0), 0) || 0;
  const { data, status, isFetching } = useGetQuery({
    endpoint: 'transaction',
    extra: 'calculate-fee',
    pQuery: { feeType: 'Escrow', amount: total },
    queryKey: ['calculate-fee', total],
    enabled: !!total
  });

  const escrowMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      router.push('/dashboard');
      notification({
        message: res?.message || 'You have successfully created an invoice',
        type: 'success'
      });
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleSubmit = () => {
    const body = new FormData();

    if (form?.title) body.append('title', form.title);
    if (form?.escrowItems?.length) {
      form.escrowItems.forEach((item) => body.append('escrowItems', JSON.stringify(item)));
    }
    if (form?.isDeliveryOnUs) body.append('isDeliveryOnUs', form.isDeliveryOnUs as any);
    if (form?.recipientDetails?.recipientName) {
      body.append('recipientDetails.recipientName', form.recipientDetails.recipientName);
    }
    if (form?.recipientDetails?.phoneNumber) {
      body.append('recipientDetails.phoneNumber', form.recipientDetails.phoneNumber);
    }
    if (form?.recipientDetails?.address) {
      body.append('recipientDetails.address', form.recipientDetails.address);
    }
    if (form?.recipientDetails?.email) {
      body.append('recipientDetails.email', form.recipientDetails.email);
    }
    if (form?.inspectionDuration) body.append('inspectionDuration', form.inspectionDuration);
    if (form?.disbursementType) body.append('disbursementType', form.disbursementType);
    if (form?.pickUpAddress) body.append('pickUpAddress', form.pickUpAddress);
    if (form?.writtenTerms) body.append('writtenTerms', form.writtenTerms);
    if (form?.contract) body.append('contract', form?.contract);

    escrowMutation.mutate({
      endpoint: 'escrow', extra: 'create-escrow-seller', method: 'POST', body, auth: true, multipart: true
    });
  };

  const { isLoading } = escrowMutation;

  return (
    <>
      {isLoading && <Loading />}

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-5">
          <div className="text-right">
            <div className="flex justify-end mb-2">
              <Image src={DefaultLogo} alt="" className="w-20 h-20" />
            </div>
            <h3 className="font-bold text-xl">
              {accounts?.defaultMerchant?.name || `${accounts?.user?.firstName} ${accounts?.user?.lastName}`}
            </h3>
            <p className="mb-1">{accounts?.user?.residentialAddress?.fullAddress || form?.pickUpAddress || 'N/A'}</p>
            <p className="text-lightText">{new Date().toDateString()}</p>
          </div>
          <div className="text-left">
            <h3 className="font-bold ff-bold text-lg mb-2">Recipient Details</h3>
            <p className="mb-1">{form?.recipientDetails?.recipientName}</p>
            <div className="w-full text-lightText">
              <p className="mb-1">{form?.recipientDetails?.email}</p>
              <p className="mb-1">{form?.recipientDetails?.phoneNumber}</p>
              <p className="mb-1">{form?.recipientDetails?.address}</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-5 overflow-auto">
          <table className="w-full min-w-max table-auto text-left border-b">
            <thead className="bg-secondary uppercase">
              <tr>
                <th className="px-3 py-3">Item Name</th>
                <th className="px-3 py-3">Unit Price</th>
                <th className="px-3 py-3 text-center">Quantity</th>
                <th className="px-3 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {form?.escrowItems?.map((item) => (
                <tr key={item?.id}>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3">{formatCurrency(item?.amount)}</td>
                  <td className="px-3 py-3 text-center">{item?.quantity}</td>
                  <td className="px-3 py-3 font-bold ff-bold text-right">{formatCurrency(item?.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mb-5">
          <div className="w-full max-w-[280px]">
            <div className="w-full flex justify-between mb-3">
              <p className="">SUBTOTAL</p>
              <p className="font-bold ff-bold">{formatCurrency(total)}</p>
            </div>
            <div className="w-full flex justify-between mb-3">
              <p className="">Escrow fee</p>
              <p className="font-bold ff-bold">
                {(status === 'loading' || isFetching)
                  ? <Skeleton className="w-[80px]" />
                  : formatCurrency(data?.data || 0)}
              </p>
            </div>
            <div className="w-full flex justify-between mb-3">
              <p className="">Delivery Fee</p>
              <p className="font-bold ff-bold">{formatCurrency(0)}</p>
            </div>
            <div className="w-full flex justify-between mb-3 text-lg">
              <p className="">TOTAL</p>
              <p className="font-bold ff-bold">
                {(status === 'loading' || isFetching)
                  ? <Skeleton className="w-[80px]" />
                  : formatCurrency(total + (data?.data || 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end space-x-3">
          {/* <Button
            border
            bgColor="bg-transparent"
            textColor="text-success"
          >
            Save Draft
          </Button> */}
          <Button
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
}

export default InvoiceSummary;
