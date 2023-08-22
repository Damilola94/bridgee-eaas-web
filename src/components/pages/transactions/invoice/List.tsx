import React, { useState, useMemo, ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RxChevronRight } from 'react-icons/rx';
import { debounce } from 'lodash';

import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';

import useGetQuery from '../../../../hooks/useGetQuery';
import { formatCurrency, formatDisbursementType } from '../../../../utilities/general';
import { formatApiDate, formatDateTime } from '../../../../utilities/dateTime';

import Loading from '../../../common/Loading';
import MenuOptions from '../../../common/MenuOptions';
import NoData from '../../../common/NoData';
import TransactionStatus from '../../../common/TransactionStatus';
import TransactionFilter from './Filter';
import SearchInput from '../../../inputs/Search';
import Pagination from '../../../common/Pagination';

import { PAGE_SIZE } from '../../../../data/constants';

function InvoiceList({ isDashboard = false }) {
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    endpoint: 'escrow',
    queryKey: ['escrow-list', router?.query?.status, pageNumber, search, filter],
    pQuery: {
      escrowSatus: router?.query?.status === 'all' ? null : router?.query?.status,
      start: formatApiDate(filter?.startDate),
      end: formatApiDate(filter?.endDate),
      pageSize: isDashboard ? 5 : PAGE_SIZE,
      pageNumber: pageNumber + 1,
      search
    },
    enabled: !!router?.query?.status || isDashboard
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
          <h3 className="font-bold text-lg mr-5 mb-2">Invoice Transactions</h3>
          {isDashboard ? (
            <Link href="/transactions">
              <span className="text-primary text-sm flex items-center hover:underline">
              See All
                <RxChevronRight className="w-5 h-auto mb-1" />
              </span>
            </Link>
          ) : (
            <div className="w-full max-w-[380px] flex space-x-2">
              <TransactionFilter filter={filter} onChange={setFilter} />
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
                data?.data?.paginatedData?.length > 0 ? (
                  <>
                    {data?.data?.paginatedData?.map((item: any, index: number) => (
                      <tr className="border-t" key={item?.escrowId}>
                        <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                        <td className="px-3 py-5">
                          <div className="flex items-center space-x-3">
                            <span className={`w-8 h-8 ${item?.isIncoming ? 'bg-error/10' : 'bg-success/10'} p-2 rounded-full`}>
                              {item?.isIncoming
                                ? <InflowArrow className="w-4 h-4" color="#EB4336" />
                                : <OutflowArrow className="w-4 h-4" color="#03543F" />
                              }
                            </span>
                            <span className="capitalize">{item?.title}</span>
                          </div>
                        </td>
                        <td className="px-3 py-5">{`#${item?.invoiceNumber}`}</td>
                        <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                        <td className="px-3 py-5">{formatDateTime(item?.createdAt)}</td>
                        <td className="px-3 py-5">{formatDisbursementType(item?.disbursementType)}</td>
                        <td className="px-3 py-5">
                          <TransactionStatus status={item?.status === 'paymentcompleted' ? item?.escrowDeliveryStatus : item?.status} />
                        </td>
                        <td className="pr-5 sm:pr-10 pl-3 py-5">
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
                    {!isDashboard && (
                      <tr>
                        <td colSpan={8} className="pt-4">
                          <Pagination
                            count={data?.data?.pagination?.totalPages}
                            currentPage={pageNumber}
                            onChange={(e) => setPageNumber(e.selected)}
                          />
                        </td>
                      </tr>
                    )}
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
