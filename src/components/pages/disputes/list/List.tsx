import React, { useState, useMemo, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { PAGE_SIZE } from '../../../../data/constants';
import useGetQuery from '../../../../hooks/useGetQuery';

import { formatApiDate, formatDateTime } from '../../../../utilities/dateTime';

import MenuOptions from '../../../common/MenuOptions';
import NoData from '../../../common/NoData';
import TransactionStatus from '../../../common/TransactionStatus';
import SearchInput from '../../../inputs/Search';

import Loading from '../../../common/Loading';
import Pagination from '../../../common/Pagination';

import DisputeFilter from './Filter';

function InvoiceList() {
  const router = useRouter();
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');

  const { data, status, error } = useGetQuery({
    endpoint: 'dispute',
    queryKey: ['dispute-list', router?.query?.status, filter, pageNumber, search],
    pQuery: {
      pageSize: PAGE_SIZE,
      pageNumber: pageNumber + 1,
      status: router?.query?.status === 'all' ? null : router?.query?.status,
      start: formatApiDate(filter?.startDate),
      end: formatApiDate(filter?.endDate),
      search
    },
    enabled: !!router?.query?.status
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
          <h3 className="font-bold text-lg mr-5 mb-2">Invoice Disputes</h3>
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
                <th className="px-3 py-5">Invoice Title</th>
                <th className="px-3 py-5">Invoice Number</th>
                <th className="px-3 py-5">Dispute Reason</th>
                <th className="px-3 py-5">Date Opened</th>
                <th className="px-3 py-5">Status</th>
                <th>{null}</th>
              </tr>
            </thead>
            <tbody className="">
              {status === 'success' && (
                data?.data?.disputes?.length > 0 ? (
                  <>
                    {data?.data?.disputes.map((item: any, index: number) => (
                      <tr className="border-t" key={item?.id}>
                        <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                        <td className="px-3 py-5">{item?.invoiceTitle}</td>
                        <td className="px-3 py-5">{item?.invoiceNumber}</td>
                        <td className="px-3 py-5">{item?.reasons}</td>
                        <td className="px-3 py-5">{formatDateTime(item?.date)}</td>
                        <td className="px-3 py-5">
                          <TransactionStatus status={`dispute-${item?.status}`} />
                        </td>
                        <td className="pr-5 sm:pr-10 pl-3 py-5 flex justify-end">
                          <MenuOptions
                            options={[
                              {
                                title: 'View',
                                action: () => router.push({
                                  pathname: `disputes/manage-dispute/${item?.invoiceId}`
                                })
                              }
                            ]}
                          />
                        </td>
                      </tr>
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

export default InvoiceList;
