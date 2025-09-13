/* eslint-disable no-empty-pattern */
/* eslint-disable no-console */
import React, { useMemo, useState, ChangeEventHandler } from 'react';
import { debounce } from 'lodash';
import { BulletList } from 'react-content-loader';

import { useCookies } from 'react-cookie';

import useGetQuery from '../../../hooks/useGetQuery';
import InflowArrow from '../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../assets/svg-tsx/OutflowArrow';

import { formatCurrency } from '../../../utilities/general';
import NoData from '../../common/NoData';
import TransactionStatus from '../../common/TransactionStatus';

import SearchInput from '../../inputs/Search';

import DisputeFilter from './Filter';

import TransactionDetailsModal from './TransactionDetailsModal';

type Props = {
  data?: any;
  status?: string;
  error?: unknown
};

function WalletHistory({ }: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [filter, setFilter] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const [cookie] = useCookies(['data']);
  const { data, status, error } = useGetQuery({
    service: "wallet-service",
    endpoint: 'wallet',
    extra: 'transactions',
    pQuery: { pageSize: 10, pageNumber: 1, SearchKey: search },
    queryKey: ['wallet-transactions-dashboard', search, filter?.value || 'all'],
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
              data?.data?.length > 0 ? (
                <>
                  {data?.data?.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.escrowId}>
                      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">
                        <div className="flex items-center space-x-3">
                          <span className={`w-8 h-8 ${item?.transaction == "Inflow" ? 'bg-error/10' : 'bg-success/10'} p-2 rounded-full`}>
                            {item?.transaction === "Inflow"
                              ? <InflowArrow className="w-4 h-4" color="#03543F" />
                              : <OutflowArrow className="w-4 h-4" color="#EB4336" />}
                          </span>
                          <span className="capitalize">{item?.transaction ? item?.transaction : "Not Provided"}</span>
                        </div>
                      </td>
                      <td className="px-3 py-5">{`#${item?.referenceNumber}`}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{item?.source}</td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item?.status === 'paymentcompleted' ? item?.escrowDeliveryStatus : item?.status} />
                      </td>
                      <td className="px-3 py-5">{item?.date}</td>
                      <td className="pr-5 sm:pr-10 pl-3 py-5" >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTransaction(data?.id);
                            setShowDetails(true);
                          }}
                          className="border border-black rounded-lg px-3 py-1.5 hover:bg-gray-100"
                        >
                          View
                        </button>
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
      {showDetails && <TransactionDetailsModal onClose={() => setShowDetails(false)}
        transactionId={selectedTransaction}
      />}
    </div>
  );
}

export default WalletHistory;
