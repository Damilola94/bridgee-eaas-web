import React, { useState, useMemo, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import InflowArrow from '../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../assets/svg-tsx/OutflowArrow';

import useGetQuery from '../../../hooks/useGetQuery';
import { formatDate } from '../../../utilities/dateTime';
import { formatCurrency } from '../../../utilities/general';

import Loading from '../../common/Loading';
import MenuOptions from '../../common/MenuOptions';
import TransactionStatus from '../../common/TransactionStatus';
import NoData from '../../common/NoData';
import SearchInput from '../../inputs/Search';
import Pagination from '../../common/Pagination';

import { PAGE_SIZE } from '../../../data/constants';

function InvoiceList({ showFilter = true }) {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');

  const { data, status, error } = useGetQuery({
    endpoint: 'invitation',
    queryKey: ['invitation', router?.query?.status, search],
    pQuery: {
      pageSize: PAGE_SIZE,
      pageNumber: pageNumber + 1,
      invitationStatus: router?.query?.status === 'all' ? null : router?.query?.status,
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
          <h3 className="font-bold text-lg mr-5 mb-2">Invites</h3>
          {showFilter && (
            <div className="max-w-xs w-full">
              <SearchInput
                value={searchText}
                onChange={handleSearch}
                className="w-full max-w-xs"
                height="h-[35.6px]"
              />
            </div>
          )}
        </div>

        <div className="w-full overflow-auto pb-20">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary">
              <tr className="">
                <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
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
                data?.data?.paginatedData?.length > 0 ? (
                  <>
                    {data?.data?.paginatedData?.map((item: any, index: number) => (
                      <tr className={`border-t ${item?.invitationDirection === 'incoming' ? 'bg-primary bg-opacity-[0.03]' : ''}`} key={item?.inviteNumber}>
                        <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                        <td className="px-3 py-5">
                          <div className="flex items-center space-x-3">
                            <span className={`w-8 h-8 ${item?.invitationDirection === 'incoming' ? 'bg-error/10' : 'bg-success/10'} p-2 rounded-full`}>
                              {item?.invitationDirection === 'incoming'
                                ? <InflowArrow className="w-4 h-4" color="#EB4336" />
                                : <OutflowArrow className="w-4 h-4" color="#03543F" />
                              }
                            </span>
                            <span className="capitalize">{item?.title}</span>
                          </div>
                        </td>
                        <td className="px-3 py-5">{item?.sender}</td>
                        <td className="px-3 py-5">{item?.receiver}</td>
                        <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                        <td className="px-3 py-5">{formatDate(item?.expires)}</td>
                        <td className="px-3 py-5">
                          <TransactionStatus status={item?.invitationStatus} />
                        </td>
                        <td className="pr-5 sm:pr-10 pl-3 py-5">
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
