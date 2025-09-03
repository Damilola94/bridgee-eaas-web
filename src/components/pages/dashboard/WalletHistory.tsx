/* eslint-disable no-empty-pattern */
/* eslint-disable no-console */
import React, { useMemo, useState, ChangeEventHandler } from 'react';
import { debounce } from 'lodash';
import { BulletList } from 'react-content-loader';

import { useCookies } from 'react-cookie';

import useGetQuery from '../../../hooks/useGetQuery';
import InflowArrow from '../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../assets/svg-tsx/OutflowArrow';

import { formatCurrency, formatDisbursementType } from '../../../utilities/general';
import { formatDateTime } from '../../../utilities/dateTime';

import NoData from '../../common/NoData';
import TransactionStatus from '../../common/TransactionStatus';
import Button from '../../inputs/Button';

import SearchInput from '../../inputs/Search';

import DisputeFilter from './Filter';

import TransactionDetailsModal from './TransactionDetailsModal';

type Props = {
  data?: any;
  status?: string;
  error?: unknown
};

function InvoiceHistory({ }: Props) {
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [filter, setFilter] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [cookie] = useCookies(['data']);
  const { data, status, error } = useGetQuery({
    service: "wallet-service",
    endpoint: 'wallet',
    extra: 'transactions/transaction',
    pQuery: { pageSize: 10, pageNumber: 1, SearchKey: search },
    queryKey: ['escrows-orders', search, filter?.value || 'all'],
    enabled: !!cookie?.data?.accessToken
  });

  const debouncedSearch = useMemo(() => debounce(setSearch, 1000), [setSearch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
        <h3 className="font-bold text-lg mr-5 mb-2">Wallet</h3>
        <div className="w-full max-w-[380px] flex space-x-2">
          <DisputeFilter filter={filter} onChange={setFilter} />
          <SearchInput
            value={searchText}
            onChange={handleSearch}
            className="w-full max-w-xs"
            height="h-[35.6px]"
          />
        </div>
      </div>

      <div className="w-full overflow-auto pb-20">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-secondary">
            <tr className="">
              <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
              <th className="px-3 py-5">Transaction</th>
              <th className="px-3 py-5">Reference Number</th>
              <th className="px-3 py-5">Amount</th>
              <th className="px-3 py-5">Source</th>
              <th className="px-3 py-5">Status</th>
              <th className="px-3 py-5">Date</th>
              <th className="px-3 py-5">Action</th>
              <th>{null}</th>
            </tr>
          </thead>
          <tbody className="">
            {status === 'loading' && (
              <tr>
                <td colSpan={8} className="text-center pt-4">
                  <div className="px-5">
                    <BulletList className="relative w-full" />
                  </div>
                </td>
              </tr>
            )}
            {status === 'success' && (
              data?.length > 0 ? (
                <>
                  {data?.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.escrowId}>
                      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 ${item?.isIncoming ? 'bg-error/10' : 'bg-success/10'} p-2 rounded-full`}>
                            {item?.isIncoming
                              ? <InflowArrow className="w-4 h-4" color="#EB4336" />
                              : <OutflowArrow className="w-4 h-4" color="#03543F" />}
                          </span>
                          <span className="capitalize">{item?.title}</span>
                        </div>
                      </td>
                      <td className="px-3 py-5">{`#${item?.invoiceNumber}`}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{formatDisbursementType(item?.disbursementType)}</td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item?.status === 'paymentcompleted' ? item?.escrowDeliveryStatus : item?.status} />
                      </td>
                      <td className="px-3 py-5">{formatDateTime(item?.createdAt)}</td>
                      <td className="pr-5 sm:pr-10 pl-3 py-5" >
                        <Button
                          border
                          onClick={() => setShowBankTransfer(true)}
                          paddingX="px-2"
                          bgColor="bg-white"
                          borderColor="border-gray-500"
                          textColor="text-black-500"
                          className="w-full text-xs  border-2 border-gray-200 !rounded-md mdx2:!rounded-xl hover:bg-success  hover:border-success hover:text-white"
                          paddingY="py-2"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={8}>
                    <NoData py="pt-14" />
                  </td>
                </tr>
              )
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
      {showBankTransfer && <TransactionDetailsModal onClose={() => setShowBankTransfer(false)} />}
    </div>
  );
}

export default InvoiceHistory;
