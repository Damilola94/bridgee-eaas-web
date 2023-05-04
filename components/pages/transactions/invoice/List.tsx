import { useRouter } from 'next/router';
import React from 'react';
import useGetQuery from '../../../../hooks/useGetQuery';
import { formatCurrency, formatDisbursementType } from '../../../../utilities/general';

import Loading from '../../../common/Loading';

import MenuOptions from '../../../common/MenuOptions';
import NoData from '../../../common/NoData';
import TransactionStatus from '../../../common/TransactionStatus';
import SelectInput from '../../../inputs/Select';

function InvoiceList({ showFilter = true, isDashboard = false }) {
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow', router?.query?.status],
    pQuery: {
      escrowSatus: router?.query?.status === 'all' ? null : router?.query?.status
    },
    enabled: !!router?.query?.status || isDashboard
  });

  return (
    <>
      {status === 'loading' && <Loading />}
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-10 py-5">
          <h3 className="font-bold text-lg mr-5">Invoice Transactions</h3>
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
                <th className="px-3 py-5">Invoice Number</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Date</th>
                <th className="px-3 py-5">Disbursement Type</th>
                <th className="px-3 py-5">Status</th>
                <th>{null}</th>
              </tr>
            </thead>
            <tbody className="">
              {status === 'success' && (
                <>
                  {data?.data?.paginatedData?.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.escrowId}>
                      <td className="pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">{item?.title}</td>
                      <td className="px-3 py-5">{`#${item?.invoiceNumber}`}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{item?.dueDate}</td>
                      <td className="px-3 py-5">{formatDisbursementType(item?.disbursementType)}</td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item?.status === 'paymentcompleted' ? item?.deliveryStatus : item?.status} />
                      </td>
                      <td className="pr-10 pl-3 py-5">
                        <MenuOptions
                          options={[
                            { title: 'View', action: () => router.push({ pathname: `transactions/invoice-details/${item?.escrowId}` }) },
                            { title: 'Open Dispute', action: () => router.push({ pathname: `disputes/manage-dispute/${item?.escrowId}` }) },
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
