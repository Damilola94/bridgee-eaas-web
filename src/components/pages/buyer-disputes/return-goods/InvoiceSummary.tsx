import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

import Button from '../../../inputs/Button';
import Loading from '../../../common/Loading';

import { useReturnGoodsContext } from '../../../../context/ReturnGoods';
import { formatCurrency } from '../../../../utilities/general';
import notification from '../../../../utilities/notification';
import handleFetch from '../../../../services/api/handleFetch';

function InvoiceSummary() {
  const router = useRouter();
  const { form, invoice } = useReturnGoodsContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendGoodsMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      router.push(`/disputes/manage-dispute/${router?.query?.slug}`);
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
    const body = {
      isDeliveryOnUs: form?.isDeliveryOnUs,
      // timeExtensionDate: 2023-08-29T18:14:50.615Z,
      inspectionDuration: form?.inspectionDuration,
      recipientDetails: form?.recipientDetails,
      pickUpAddress: form?.pickUpAddress,
      escrowItem: form?.escrowItems?.map((item) => ({ itemId: item.id, quantity: item.quantity }))
    };

    sendGoodsMutation.mutate({
      endpoint: 'dispute', extra: `${invoice?.disputes?.[0]?.id}/ship-order`, method: 'PATCH', body, auth: true
    });
  };

  const { isLoading, isSuccess } = sendGoodsMutation;

  return (
    <>
      {(isLoading || isSuccess) && <Loading />}

      <div className="w-full md:flex justify-between bg-white px-10 py-8 rounded-lg shadow-md mb-5">
        <div className="w-1/2">
          <table className="text-[#888888]">
            <thead>
              <tr>
                <th colSpan={2} className="text-left">Sender Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 pr-5">Name:</td>
                <td className="py-1">{form?.senderDetails?.name}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Phone:</td>
                <td className="py-1">{form?.senderDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Email:</td>
                <td className="py-1">{form?.senderDetails?.email}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Address:</td>
                <td className="py-1">{form?.pickUpAddress || form?.senderDetails?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <table className="text-[#888888]">
            <thead>
              <tr>
                <th colSpan={2} className="text-left">Recipient Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1 pr-5">Name:</td>
                <td className="py-1">{form?.recipientDetails?.recipientName}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Phone:</td>
                <td className="py-1">{form?.recipientDetails?.phoneNumber}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Email:</td>
                <td className="py-1">{form?.recipientDetails?.email}</td>
              </tr>
              <tr>
                <td className="py-1 pr-5">Address:</td>
                <td className="py-1">{form?.recipientDetails?.address}</td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="py-1 pr-5"
                >
                  <b>Inspection Period:</b>
                  {' '}
                  {form?.inspectionDuration}
                  {' '}
                  hour(s)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-5 overflow-auto">
          <table className="w-full min-w-max table-auto text-left border-b">
            <thead className="bg-secondary uppercase">
              <tr>
                <th className="px-3 py-3">Item Name</th>
                <th className="px-3 py-3">Unit Weight</th>
                <th className="px-3 py-3">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {form?.escrowItems?.map((item) => (
                <tr key={JSON.stringify(item)}>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3">{`${item?.weight || 0}kg`}</td>
                  <td className="px-3 py-3">{item?.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full flex justify-end mb-5">
          <div className="w-full max-w-[280px]">
            <div className="w-full flex justify-between mb-3">
              <p className="">Delivery Fee</p>
              <p className="font-bold ff-bold">{formatCurrency(0)}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button onClick={handleSubmit}>Send</Button>
        </div>
      </div>
    </>
  );
}

export default InvoiceSummary;
