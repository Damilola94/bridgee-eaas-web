"use client";

import { useState, useMemo, type ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RxChevronRight } from "react-icons/rx";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";

import useGetQuery from "../../../../hooks/useGetQuery";
import { formatCurrency } from "../../../../utilities/general";
import { formatApiDate, formatDateTime } from "../../../../utilities/dateTime";
import NoData from "../../../common/NoData";
import TransactionStatus from "../../../common/TransactionStatus";

import SearchInput from "../../../inputs/Search";
import Pagination from "../../../common/Pagination";

import { PAGE_SIZE } from "../../../../data/constants";

import TransactionFilter from "./Filter";

function SalesList({ isDashboard = false }) {
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "escrows",
    extra: "orders",
    queryKey: ["escrows-orders", router?.query?.status, pageNumber, search, filter],
    pQuery: {
      Status: router?.query?.status === "all" ? null : router?.query?.status,
      start: formatApiDate(filter?.startDate),
      end: formatApiDate(filter?.endDate),
      pageSize: isDashboard ? 5 : PAGE_SIZE,
      pageNumber: pageNumber + 1,
      SearchKey: search
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
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
          <h3 className="font-bold text-lg mr-5 mb-2">Sales Transactions</h3>
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
              <SearchInput value={searchText} onChange={handleSearch} className="w-full max-w-xs" height="h-[35.6px]" />
            </div>
          )}
        </div>

        <div className="w-full overflow-auto pb-20">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary">
              <tr className="">
                <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Business Name</th>
                <th className="px-3 py-5">Invoice Number</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Date</th>
                <th className="px-3 py-5">Payment Link</th>
                <th className="px-3 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="">
              {status === "loading" && (
                <tr>
                  <td colSpan={7} className="text-center pt-4">
                    <div className="px-5 space-y-2">
                      {[...Array(isDashboard ? 5 : 10)].map((_, i) => (
                        <div key={i} className="flex space-x-4 py-2">
                          <Skeleton width={32} height={16} />
                          <Skeleton width={188} height={16} />
                          <Skeleton width={206} height={16} />
                          <Skeleton width={200} height={16} />
                          <Skeleton width={112} height={16} />
                          <Skeleton width={96} height={16} />
                          <Skeleton width={80} height={16} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}

              {status === "success" &&
                (data?.data?.items?.length > 0 ? (
                  <>
                    {data?.data?.items?.map((item: any, index: number) => (
                      <tr
                        className="border-t cursor-pointer hover:bg-primary/5"
                        key={item?.id}
                        onClick={() => router.push({ pathname: `/transactions/sales-details/${item?.id}` })}
                      >
                        <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                        <td className="px-3 py-5">
                          <div className="flex items-center space-x-3">
                            <span className="capitalize">{item?.recipientName}</span>
                          </div>
                        </td>
                        <td className="px-3 py-5">{`#${item?.referenceNumber}`}</td>
                        <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                        <td className="px-3 py-5">{formatDateTime(item?.createdDate)}</td>
                        <td className="px-3 py-5">
                          {item.paymentLink ? (
                            <Link href={item.paymentLink} className="text-blue-600 hover:underline">
                              View Link
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-3 py-5">
                          <TransactionStatus status={item?.status} />
                        </td>
                      </tr>
                    ))}
                    {!isDashboard && (
                      <tr>
                        <td colSpan={7} className="pt-4">
                          <Pagination
                            count={data?.data?.totalPages}
                            currentPage={pageNumber}
                            onChange={(e) => setPageNumber(e.selected)}
                          />
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <NoData py="pt-14" />
                    </td>
                  </tr>
                ))}

              {status === "error" && (
                <tr>
                  <td colSpan={7} className="text-center pt-10">
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

export default SalesList;
