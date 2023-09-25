import React, { useState } from 'react';
import { useRouter } from 'next/router';

import useGetQuery from '../../../hooks/useGetQuery';
import { formatDate } from '../../../utilities/dateTime';
import { formatCurrency } from '../../../utilities/general';

import Modal from '../../common/Modal';
import Button from '../../inputs/Button';

function EscrowInviteReminder() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const { data } = useGetQuery({
    endpoint: 'invitation',
    queryKey: ['invitation'],
    pQuery: { pageSize: 100, invitationStatus: 'awaiting', invitationType: 'incoming' }
  });

  return (
    <>
      {data?.data?.paginatedData?.length > 0 ? (
        <Modal isOpen={open} isShowCloseIcon={false} maxWidth="max-w-[700px]">
          <div className="pt-5">
            <div className="mb-7">
              <h2 className="font-bold text-xl">Pending Invite(s)</h2>
              <p className="text-lightText text-sm">
                You have pending transaction invite(s) that you need to either accept or reject.
              </p>
            </div>

            <div className="w-full overflow-auto mb-7">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="bg-secondary">
                  <tr className="">
                    <th className="px-3 py-5">Invoice Title</th>
                    <th className="px-3 py-5">Sender Name</th>
                    <th className="px-3 py-5">Amount</th>
                    <th className="px-3 py-5">Expiry Date</th>
                    <th>{null}</th>
                  </tr>
                </thead>
                <tbody className="">
                  {data?.data?.paginatedData?.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.inviteNumber}>
                      <td className="px-3 py-5">{item?.title}</td>
                      <td className="px-3 py-5">{item?.sender}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{formatDate(item?.expires)}</td>
                      <td className="px-3 py-5 flex justify-end">
                        <Button
                          border
                          borderColor="border-primary"
                          bgColor="bg-white"
                          textColor="text-primary"
                          onClick={() => router.push({
                            pathname: `transactions/invoice-details/${item?.escrowId}`,
                            query: { reference: item?.inviteNumber }
                          })}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button
              onClick={() => setOpen(false)}
              paddingY="py-2"
            >
              Close
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default EscrowInviteReminder;
