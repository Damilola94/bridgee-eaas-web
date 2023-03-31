import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import DefaultLogo from '../../../assets/images/business-logo.png';

import Button from '../../inputs/Button';
import { formatCurrency, formatDisbursementType } from '../../../utilities/general';

import { formatDate } from '../../../utilities/dateTime';
import handleFetch from '../../../services/api/handleFetch';
import notification from '../../../utilities/notification';
import Loading from '../../common/Loading';
import TransactionStatus from '../../common/TransactionStatus';
import AcceptInvite from '../invites/AcceptInvite';
import Modal from '../../common/Modal';

function InvoiceDetails({ data = {} }: { data: any }) {
  const router = useRouter();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const total = data?.items?.reduce((sum: number, item: any) => sum + (item?.totalAmount || 0), 0) || 0;

  const queryClient = useQueryClient();
  const acceptanceMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['escrow', data?.escrowId]);
      notification({
        message: res?.message || 'You have successfully rejected an invoice',
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

  const handleDecline = () => {
    acceptanceMutation.mutate({
      endpoint: 'invitation',
      extra: `reject-invitation?referenceNumber=${router?.query?.reference}`,
      method: 'PUT',
      auth: true
    });
  };

  const { isLoading } = acceptanceMutation;

  if (data?.escrowId) return (
    <>
      {isLoading && <Loading message="Processing..." />}

      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-5">
          <div className="flex w-full justify-between mb-5">
            <div className="text-left">
              <div className="flex mb-2">
                <Image
                  src={data?.sellerDetails?.pictPath || DefaultLogo}
                  alt="Seller Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              <h3 className="font-bold text-xl">
                {data?.sellerDetails?.name}
              </h3>
              <p className="mb-1">{data?.sellerDetails?.address}</p>
              <p className="text-lightText">{formatDate(data?.createAt)}</p>
            </div>
            <div className="text-right">
              <h2 className="ff-bold font-bold text-2xl">{`Invoice #${data?.invoiceNumber}`}</h2>
              <TransactionStatus status={data?.status} />
            </div>
          </div>

          <div className="flex w-full justify-between">
            <div className="text-left">
              <h3 className="font-bold ff-bold text-lg mb-2">Recipient Details</h3>
              <p className="mb-1">{data?.recipientDetails?.name}</p>
              <div className="w-full text-lightText">
                <p className="mb-1">{data?.recipientDetails?.email}</p>
                <p className="mb-1">{data?.recipientDetails?.phoneNumber}</p>
                <p className="mb-1">{data?.recipientDetails?.address}</p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="font-bold ff-bold text-lg mb-2">Order Details</h3>
              <div className="w-full">
                <p className="mb-1">
                  <span className="text-lightText">Disbursement Type:&nbsp;</span>
                  {formatDisbursementType(data?.disbursementType)}
                </p>
                <p className="mb-1">
                  <span className="text-lightText">Dispute Manager:&nbsp;</span>
                  Bridge by ALAT
                </p>
                <p className="mb-1">
                  <span className="text-lightText">Inspection:&nbsp;</span>
                  {`${data?.inspectionDay} Hours(s)`}
                </p>
                {data?.disbursementType === 'installment' && (
                  <p className="mb-1">
                    <span className="text-lightText">Due Date:&nbsp;</span>
                    {formatDate(data?.dueDate)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-5 overflow-auto">
          <table className="w-full min-w-max table-auto text-left border-b">
            <thead className="bg-secondary uppercase">
              <tr>
                <th className="px-3 py-3">Item Name</th>
                <th className="px-3 py-3 text-center">Quantity</th>
                <th className="px-3 py-3 text-center">Weight</th>
                <th className="px-3 py-3">Unit Price</th>
                <th className="px-3 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((item: any) => (
                <tr key={JSON.stringify(item)}>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3 text-center">{item?.quantity}</td>
                  <td className="px-3 py-3 text-center">{`${item?.weight}kg`}</td>
                  <td className="px-3 py-3">{formatCurrency(item?.unitPrice)}</td>
                  <td className="px-3 py-3 font-bold ff-bold text-right">{formatCurrency(item?.totalAmount)}</td>
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
              <p className="">Escrow fee (5%)</p>
              <p className="font-bold ff-bold">{formatCurrency(data?.fee)}</p>
            </div>
            <div className="w-full flex justify-between mb-3">
              <p className="">Delivery Fee</p>
              <p className="font-bold ff-bold">{formatCurrency(data?.deliveryFee)}</p>
            </div>
            <div className="w-full flex justify-between mb-3 text-lg">
              <p className="">TOTAL</p>
              <p className="font-bold ff-bold">{formatCurrency(data?.totalAmount)}</p>
            </div>
          </div>
        </div>

        {!data?.isSeller && (
          <>
            {data?.status === 'pending' && (
              <div className="w-full flex justify-end space-x-3">
                <Button bgColor="bg-error" onClick={() => setShowDeclineModal(true)}>Decline</Button>
                <Button onClick={() => setShowAcceptModal(true)}>Accept</Button>
              </div>
            )}

            {data?.status === 'awaitingpayment' && (
              <div className="w-full flex justify-end">
                <Button>Make Payment</Button>
              </div>
            )}
          </>
        )}
      </div>

      {showAcceptModal && (
        <AcceptInvite onClose={() => setShowAcceptModal(false)} />
      )}

      <Modal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        maxWidth='max-w-[400px]'
      >
        <div className="">
          <div className="mb-5">
            <h1 className="w-full text-textColor ff-bold text-xl pr-16 mb-4">Confirm action</h1>
            <p className="text-base">Are you sure you want to reject/decline this invite?</p>
          </div>
          <div className="w-full flex justify-end space-x-3">
            <Button onClick={() => setShowDeclineModal(false)}>No</Button>
            <Button bgColor="bg-error" onClick={handleDecline}>Yes</Button>
          </div>
        </div>
      </Modal>
    </>
  );

  return null;
}

export default InvoiceDetails;
