import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

import useGetQuery from '../../../../../hooks/useGetQuery';
import { formatCurrency } from '../../../../../utilities/general';
import Loading from '../../../../common/Loading';
import Modal from '../../../../common/Modal';
import Button from '../../../../inputs/Button';

const formatActionType = (type: string | undefined) => {
  if (type === 'AdditionalShipment') return 'Additional Shipment';
  return type;
};

type Props = {
  disputeId: string | undefined,
  actionType: string | undefined
};

function DisputeShipmentDetails({
  disputeId, actionType
}: Props) {
  const [showModal, setShowModal] = useState(false);

  const { data, status, error } = useGetQuery({
    endpoint: 'dispute',
    extra: 'shipped-order-detail',
    param: disputeId,
    pQuery: { actionType },
    queryKey: ['dispute/shipped-order-detail', disputeId, actionType],
    enabled: showModal
  });

  return (
    <div className="w-full">
      <Button
        border
        borderColor="border-gray-400"
        textColor="text-black"
        bgColor="bg-white"
        paddingX="px-3"
        onClick={() => setShowModal(true)}
      >
        View Invoice Summary
        <HiArrowRight className="ml-3" />
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {status === 'loading' && <Loading />}

        <h3 className="text-2xl font-bold mb-5">
          {`${formatActionType(actionType)} Invoice Summary`}
        </h3>

        {status === 'success' && (
          <>
            <div className="w-full md:flex justify-between bg-white px-5 sm:px-10 py-8 rounded-lg shadow-md mb-5">
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
                      <td className="py-1">{data?.data?.recipientDetails?.name}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-5">Phone:</td>
                      <td className="py-1">{data?.data?.recipientDetails?.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-5">Email:</td>
                      <td className="py-1">{data?.data?.recipientDetails?.email}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-5">Address:</td>
                      <td className="py-1">{data?.data?.recipientDetails?.address}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan={2}
                        className="py-1 pr-5"
                      >
                        <b>Inspection Period:</b> {data?.data?.inspectionDuration} hour(s)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full bg-white px-5 sm:px-10 py-8 rounded-lg shadow-md">
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
                    {data?.data?.items?.map((item: any) => (
                      <tr key={JSON.stringify(item)}>
                        <td className="px-3 py-3">{item?.name}</td>
                        <td className="px-3 py-3">{`${item?.weight || 0}kg`}</td>
                        <td className="px-3 py-3">{item?.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="w-full flex justify-end">
                <div className="w-full max-w-[280px]">
                  <div className="w-full flex justify-between">
                    <p className="">Delivery Fee</p>
                    <p className="font-bold ff-bold">{formatCurrency(data?.data?.deliveryFee)}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="w-full text-center bg-white px-5 sm:px-10 py-8 rounded-lg shadow-md">
            {String(error)}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default DisputeShipmentDetails;
