"use client";

import { useState, useMemo, type ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { RxChevronRight } from "react-icons/rx";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "react-query";

import useGetQuery from "../../../../hooks/useGetQuery";
import { formatApiDate } from "../../../../utilities/dateTime";
import NoData from "../../../common/NoData";
import TransactionStatus from "../../../common/TransactionStatus";
import Modal from "../../../common/Modal";
import Loading from "../../../common/Loading";

import SearchInput from "../../../inputs/Search";
import Pagination from "../../../common/Pagination";
import Button from "../../../inputs/Button";

import { PAGE_SIZE } from "../../../../data/constants";

import TransactionFilter from "./Filter";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

import EditIcon from '../../../../assets/svgs/edit-gray.svg';
import TrashIcon from '../../../../assets/svgs/trash-gray.svg';

function SalesList({ isDashboard = false }) {
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

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

  const deleteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Order deleted successfully",
        type: "success"
      });
      setDeleteTarget(null);
      queryClient.invalidateQueries(["escrows-orders"]);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to delete order. Please try again.",
        type: "danger"
      });
    }
  });

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate({
      service: "wallet-service/api/v1",
      endpoint: `escrows/orders/${deleteTarget.id}`,
      method: "DELETE"
    });
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
              <tr>
                <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
                <th className="px-3 py-5">Business Name</th>
                <th className="px-3 py-5">Invoice Number</th>
                <th className="px-3 py-5">Amount</th>
                <th className="px-3 py-5">Date</th>
                <th className="px-3 py-5">Payment Link</th>
                <th className="px-3 py-5">Status</th>
                <th className="px-3 py-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && (
                <tr>
                  <td colSpan={8} className="text-center pt-4">
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
                          <Skeleton width={80} height={16} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}

              {status === "success" &&
                (data?.data?.length > 0 ? (
                  <>
                    {data?.data?.map((item: any, index: number) => {
                      const isDraft = item?.status?.toLowerCase() === "draft";
                      return (
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
                          <td className="px-3 py-5">{item?.amount}</td>
                          <td className="px-3 py-5">{item?.createdDate}</td>
                          <td className="px-3 py-5">
                            {item.referenceNumber ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/buyer/in-app-order/${item.referenceNumber}`);
                                }}
                                className="text-blue-600 hover:underline"
                              >
                                View Order
                              </button>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-3 py-5">
                            <TransactionStatus status={item?.status} />
                          </td>
                          <td className="px-3 py-5">
                            {isDraft ? (
                              <div
                                className="flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    router.push(`/create-payment-link?id=${item?.id}`)
                                  }
                                  title="Edit"
                                >
                                  <Image src={EditIcon} alt="Edit" className="w-6 h-6" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteTarget(item)}
                                  title="Delete"
                                >
                                  <Image src={TrashIcon} alt="Delete" className="w-6 h-6" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-300 text-sm">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {!isDashboard && (
                      <tr>
                        <td colSpan={8} className="pt-4">
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
                    <td colSpan={8}>
                      <NoData py="pt-14" />
                    </td>
                  </tr>
                ))}

              {status === "error" && (
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

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => !deleteMutation.isLoading && setDeleteTarget(null)}
        maxWidth="max-w-[400px]"
      >
        {deleteMutation.isLoading && <Loading message="Deleting Order..." />}

        <div className="w-full py-5">
          <div className="mb-7">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Image src={TrashIcon} alt="Delete" className="w-6 h-6" />
            </div>
            <h1 className="w-full text-textColor ff-bold text-xl mb-2">Delete Order</h1>
            <p className="text-sm text-lightText">
              Are you sure you want to delete order{" "}
              <span className="font-semibold text-textColor">
                #{deleteTarget?.referenceNumber}
              </span>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setDeleteTarget(null)}
              disabled={deleteMutation.isLoading}
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-transparent border border-grey !text-greyDark"
              paddingY="p-3.5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isLoading}
              className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl bg-red-500 hover:bg-red-600 text-white"
              paddingY="p-3.5"
            >
              {deleteMutation.isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SalesList;