import { useRouter } from 'next/router';
import React from 'react';
import useGetQuery from '../../../hooks/useGetQuery';
import { formatDate } from '../../../utilities/dateTime';
import { formatCurrency } from '../../../utilities/general';
import Loading from '../../common/Loading';

import MenuOptions from '../../common/MenuOptions';
import NoData from '../../common/NoData';
import TransactionStatus from '../../common/TransactionStatus';
import SelectInput from '../../inputs/Select';

function InvoiceList({ showFilter = true }) {
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    endpoint: 'invitation',
    queryKey: ['invitation', router?.query?.status],
    pQuery: {
      invitationStatus: router?.query?.status === 'all' ? null : router?.query?.status
    },
    enabled: !!router?.query?.status
  });

  return (
    <>
      {status === 'loading' && <Loading />}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-10 py-5">
          <h3 className="font-bold text-lg mr-5">Invites</h3>
          {showFilter && (
            <div className="max-w-xs w-full">
              <SelectInput placeholder="Filter" className="w-full" />
            </div>
          )}
        </div>

        <div className="w-full overflow-auto pb-20">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary">
              <tr className="">
                <th className="pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Invoice Title</th>
                <th className="px-3 py-5">Sender Name</th>
                <th className="px-3 py-5">Reciever Email</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Expiry Date</th>
                <th className="px-3 py-5">Status</th>
                <th>{null}</th>
              </tr>
            </thead>
            <tbody className="">
              {status === 'success' && (
                <>
                  {data?.data?.paginatedData?.map((item: any, index: number) => (
                    <tr className={`border-t ${item?.invitationDirection === 'incoming' ? 'bg-primary bg-opacity-[0.03]' : ''}`} key={item?.inviteNumber}>
                      <td className="pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">{item?.title}</td>
                      <td className="px-3 py-5">{`${item?.sender}${item?.invitationDirection === 'incoming' ? '' : ' (Me)'}`}</td>
                      <td className="px-3 py-5">{`${item?.receiver}${item?.invitationDirection === 'incoming' ? ' (Me)' : ''}`}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{formatDate(item?.expires)}</td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item?.invitationStatus} />
                      </td>
                      <td className="pr-10 pl-3 py-5">
                        <MenuOptions
                          options={[
                            {
                              title: 'View Invoice',
                              action: () => router.push({
                                pathname: `transactions/invoice-details/${item?.escrowId}`,
                                query: { reference: item?.inviteNumber }
                              })
                            },
                            { title: 'Delete', action: () => {} }
                          ]}
                        />
                      </td>
                    </tr>
                  ))}

                  {data?.data?.paginatedData?.length < 1 && (
                    <tr>
                      <td colSpan={8}>
                        <NoData py="pt-14" />
                      </td>
                    </tr>
                  )}
                </>
              )}

              {status === 'error' && (
                <tr>
                  <td colSpan={8} className="text-center pt-10">
                    {String(error)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default InvoiceList;
