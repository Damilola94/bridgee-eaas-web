import React from 'react';

import { useRouter } from 'next/router';

import { statusColors, statusTitle } from '../../../../data/status';

import SelectInput from '../../../inputs/Select';
import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';
import NoData from '../../../common/NoData';
import useGetQuery from '../../../../hooks/useGetQuery';
import { useAccountsContext } from '../../../../context/Accounts';
import Loading from '../../../common/Loading';
import { formatDateTime } from '../../../../utilities/dateTime';
import { formatChannel, formatCurrency } from '../../../../utilities/general';

function TransactionList() {
  const router = useRouter();
  const { accounts } = useAccountsContext();

  const { data, status, error } = useGetQuery({
    endpoint: 'transaction',
    extra: 'get-wallet-transactions',
    queryKey: [router?.query?.status, accounts?.defaultWallets?.[0]?.id],
    pQuery: {
      walletId: accounts?.defaultWallets?.[0]?.id,
      status: router?.query?.status === 'all' ? null : router?.query?.status
    },
    enabled: !!accounts?.defaultWallets?.[0]?.id
  });

  return (
    <>
      {status === 'loading' && <Loading />}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-10 py-5">
          <h3 className="font-bold text-lg mr-5">Wallet Transactions</h3>
          <div className="max-w-xs w-full">
            <SelectInput placeholder="Filter" className="w-full" />
          </div>
        </div>

        <div className="w-full overflow-auto pb-20">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary">
              <tr>
                <th className="pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Transaction</th>
                <th className="px-3 py-5">Reference Number</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Source</th>
                <th className="px-3 py-5">Status</th>
                <th className="px-3 py-5">Date</th>
                <th className="pr-10 pl-3 py-5">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {status === 'success' && (
                <>
                  {data?.data?.transactions.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.id}>
                      <td className="pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 ${item?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'} p-2 rounded-full`}>
                            {item?.type === 'credit'
                              ? <InflowArrow className="w-4 h-4" color="#03543F" />
                              : <OutflowArrow className="w-4 h-4" color="#EB4336" />
                            }
                          </span>
                          <span className="capitalize">{item?.type}</span>
                        </div>
                      </td>
                      <td className="px-3 py-5">{item?.transactionReference}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}</td>
                      <td className="px-3 py-5">{formatChannel(item?.channel)}</td>
                      <td className="px-3 py-5">
                        <span
                          style={{
                            color: statusColors?.[item?.status as keyof typeof statusTitle],
                            backgroundColor: `${statusColors?.[item?.status as keyof typeof statusTitle]}19`
                          }}
                          className="rounded-lg px-3 py-1.5 font-bold"
                        >
                          {statusTitle?.[item?.status as keyof typeof statusTitle] || item?.status}
                        </span>
                      </td>
                      <td className="px-3 py-5">{formatDateTime(item?.date)}</td>
                      <td className="pr-10 pl-3 py-5">
                        <button
                          type="button"
                          className="border border-black rounded-lg px-3 py-1.5 hover:bg-gray-100"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}

                  {data?.data?.transactions?.length < 1 && (
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

export default TransactionList;
