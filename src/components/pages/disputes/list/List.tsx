import React, { useState, useMemo, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import { PAGE_SIZE } from '../../../../data/constants';
import useGetQuery from '../../../../hooks/useGetQuery';

import { formatDateTime } from '../../../../utilities/dateTime';

import MenuOptions from '../../../common/MenuOptions';
import NoData from '../../../common/NoData';
import TransactionStatus from '../../../common/TransactionStatus';
import SearchInput from '../../../inputs/Search';

import Loading from '../../../common/Loading';
import Pagination from '../../../common/Pagination';

import DisputeFilter from './Filter';

function DisputeList() {
  const router = useRouter();
  const statusFromUrl = router?.query?.status || 'all'; // default fallback

  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: 'disputes',
    extra: 'seller',
    queryKey: ['dispute-seller-list', statusFromUrl, filter, pageNumber, search],
    pQuery: {
      pageSize: PAGE_SIZE,
      pageNumber: pageNumber + 1,
      search,
      status: statusFromUrl !== 'all' ? statusFromUrl : null
    }
  });

  const debouncedSearch = useMemo(() => debounce(setSearch, 1000), [setSearch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debouncedSearch(value);
  };

  const statusTitleMap: Record<string, string> = { 'all': 'All Disputes', 'ResolvedInSellerFavor': 'Resolved Disputes', 'Pending': 'In Progress' };
  const statusSubTitleMap: Record<string, string> = { 'all': 'List of all disputes raised', 'ResolvedInSellerFavor': 'List of all resolved dispute', 'Pending': 'List of all disputes in progress' };
  const tableTitle = statusTitleMap[router?.query?.status as string];
  const tableSubTitle = statusSubTitleMap[router?.query?.status as string];

  return (
    <>
      {status === 'loading' && <Loading />}

      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
          <div>
            <h3 className="font-bold text-lg mr-5 mb-2 capitalize">
              {tableTitle}
            </h3>
            <p>{tableSubTitle}</p>
          </div>

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
              <tr>
                <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Order Reference</th>
                <th className="px-3 py-5">Reporter</th>
                <th className="px-3 py-5">Email</th>
                <th className="px-3 py-5">Dispute Reason</th>
                <th className="px-3 py-5">Created Date</th>
                <th className="px-3 py-5">Status</th>
                <th className="px-3 py-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {status === 'success' && (
                data?.data?.length > 0 ? (
                  <>
                    {data?.data?.map((item: any, index: number) => (
                      <tr className="border-t" key={item?.id}>
                        <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>

                        <td className="px-3 py-5">{item?.orderReference}</td>

                        <td className="px-3 py-5">{item?.reporterName}</td>

                        <td className="px-3 py-5">{item?.reporterEmail}</td>

                        <td className="px-3 py-5">{item?.disputeReason}</td>

                        <td className="px-3 py-5">{formatDateTime(item?.createdAt)}</td>

                        <td className="px-3 py-5">
                          <TransactionStatus status={item?.status} />
                        </td>

                        <td className="pr-5 sm:pr-10 pl-3 py-5 flex justify-end">
                          <MenuOptions
                            options={[
                              {
                                title: 'View',
                                action: () =>
                                  router.push(`disputes/manage-dispute/${item?.id}`)
                              }
                            ]}
                          />
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td colSpan={8} className="pt-4">
                        <Pagination
                          count={Math.ceil(data?.data?.length / PAGE_SIZE)}
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

export default DisputeList;
