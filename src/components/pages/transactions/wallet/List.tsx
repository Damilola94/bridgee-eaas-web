import React, { useState, useMemo, ChangeEventHandler } from 'react';

import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { useAccountsContext } from '../../../../context/Accounts';
// import { formatApiDate } from '../../../../utilities/dateTime';

import NoData from '../../../common/NoData';
import Loading from '../../../common/Loading';
import Pagination from '../../../common/Pagination';
import SearchInput from '../../../inputs/Search';

import { PAGE_SIZE } from '../../../../data/constants';

import useGetQuery from "../../../../hooks/useGetQuery";

import Filter from './Filter';

import ListItem from './ListItem';

function WalletList() {
  const { accounts } = useAccountsContext();
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');

  const router = useRouter();

  const { data, status, error } = useGetQuery({
    service: "wallet-service",
    endpoint: 'wallet',
    extra: 'transactions/transaction',
    queryKey: ['wallet-transactions', router?.query?.status, accounts, filter, pageNumber, search],
    pQuery: {
      pageSize: PAGE_SIZE,
      pageNumber: pageNumber + 1,
      status: router?.query?.status === 'all' ? null : router?.query?.status,
      // start: formatApiDate(filter?.startDate),
      // end: formatApiDate(filter?.endDate),
      // minAmount: Number(filter?.minAmount),
      // maxAmount: Number(filter?.maxAmount),
      // transactionType: filter?.type,
      // channel: filter?.channel,
      search
    },
    enabled: true
  });

  const debouncedSearch = useMemo(() => debounce(setSearch, 1000), [setSearch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debouncedSearch(value);
  };

  return (
    <>
      {status === 'loading' && <Loading />}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
          <h3 className="font-bold text-lg mr-5 mb-2">Wallet Transactions</h3>
          <div className="w-full max-w-[380px] flex space-x-2">
            <Filter filter={filter} onChange={setFilter} />
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
              <tr>
                <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Transaction</th>
                <th className="px-3 py-5">Reference Number</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Source</th>
                <th className="px-3 py-5">Status</th>
                <th className="px-3 py-5">Date</th>
                <th className="pr-5 sm:pr-10 pl-3 py-5">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {status === 'success' && (
                data?.data?.length > 0 ? (
                  <>
                    {data?.data?.map((item: any, index: number) => (
                      <ListItem key={item?.id} data={item} index={index} />
                    ))}
                    <tr>
                      <td colSpan={8} className="pt-4">
                        <Pagination
                          count={data?.data?.pagination?.totalPages}
                          currentPage={pageNumber}
                          onChange={(e) => setPageNumber(e.selected)}
                        />
                      </td>
                    </tr>
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
      </div>
    </>
  );
}

export default WalletList;
