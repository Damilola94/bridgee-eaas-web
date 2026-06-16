"use client";

import { useMemo, useState, type ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "react-query";
import { BsThreeDotsVertical } from "react-icons/bs";

import useGetQuery from "../../../hooks/useGetQuery";
import NoData from "../../common/NoData";
import SearchInput from "../../inputs/Search";
import Pagination from "../../common/Pagination";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";

import ExportIcon from "../../../assets/svgs/export.svg";
import Image from "next/image";

import StatusBadge from "./StatusBadge";
import InvoiceModal from "./InvoiceModal";
import DeleteCustomerModal from "./DeleteCustomerModal";

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

type Order = {
  id: string;
  recipientName: string;
  recipientEmail: string;
  referenceNumber: string;
  amount: string;
  createdDate: string;
  paymentLink: string;
  status: string;
};

function CustomerDetail() {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };
  const queryClient = useQueryClient();

  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: customerRes, status: customerStatus } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: `customers/${slug}`,
    queryKey: ["customer", slug],
    enabled: !!slug,
  });

  const customer = customerRes?.data;
  const { data: ordersRes, status: ordersStatus, error: ordersError } =
    useGetQuery({
      service: "wallet-service/api/v1/",
      endpoint: `customers/${slug}/orders`,
      queryKey: ["customer-orders", slug, pageNumber, search],
      pQuery: {
        pageSize: 10,
        pageNumber: pageNumber + 1,
        SearchKey: search,
      },
      enabled: !!slug,
    });

  const orders: Order[] = ordersRes?.data || [];
  const totalPages = ordersRes?.metaData?.totalPages ?? 0;
  const lastTransactionDate = orders?.[0]?.createdDate;

  const debouncedSearch = useMemo(() => debounce(setSearch, 1000), []);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchText(value);
    setPageNumber(0);
    debouncedSearch(value);
  };

  const deleteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Customer removed successfully",
        type: "success",
      });
      queryClient.invalidateQueries(["customers"]);
      queryClient.invalidateQueries(["customer-stats"]);
      router.push("/customer-management");
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to remove customer.",
        type: "danger",
      });
    },
  });

  const handleExport = async () => {
    try {
      const res: any = await handleFetch({
        service: "wallet-service/api/v1",
        endpoint: `customers/${slug}/orders/export`,
        method: "GET",
        pQuery: { SearchKey: search },
        auth: true,
        raw: true,
      });

      const blob = new Blob([res], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${customer?.name || "customer"}-transactions-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      notification({
        title: "Export Error",
        message: err?.toString() || "Failed to export transactions.",
        type: "danger",
      });
    }
  };

  return (
    <>
      <div className="text-sm text-lightText mb-4">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => router.push("/customer-management")}
        >
          Customer Management
        </span>
        <span className="mx-2">{">"}</span>
        <span className="text-primary font-medium">
          {customer?.name || "—"}
        </span>
      </div>

      <div className="w-full bg-white shadow-sm rounded-xl border border-lightText/10 px-6 py-5 mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {customerStatus === "loading" ? (
            <Skeleton circle width={44} height={44} />
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-white font-bold uppercase">
                {getInitials(customer?.name)}
              </span>
            </div>
          )}
          <h3 className="font-bold text-lg text-textColor">
            {customerStatus === "loading" ? (
              <Skeleton width={140} />
            ) : (
              customer?.name || "—"
            )}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-8">
          <div>
            <p className="text-xs text-lightText mb-1">Phone Number</p>
            <p className="text-sm font-medium text-textColor">
              {customerStatus === "loading" ? (
                <Skeleton width={100} />
              ) : (
                customer?.phone || "—"
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-lightText mb-1">Email Address</p>
            <p className="text-sm font-medium text-textColor">
              {customerStatus === "loading" ? (
                <Skeleton width={160} />
              ) : (
                customer?.email || "—"
              )}
            </p>
          </div>
          <div>
            <p className="text-xs text-lightText mb-1">Address</p>
            <p className="text-sm font-medium text-textColor">
              {customerStatus === "loading" ? (
                <Skeleton width={140} />
              ) : (
                customer?.address || "—"
              )}
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-2 rounded-md hover:bg-secondary/60 transition-colors"
            >
              <BsThreeDotsVertical className="w-5 h-5 text-lightText" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-10 z-20 w-44 bg-white border border-lightText/10 rounded-lg shadow-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setShowMenu(false);
                    setShowDelete(true);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Remove Customer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm rounded-xl border border-lightText/10 px-6 py-5 mb-4">
        <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold text-primary bg-primary/10 mb-4">
          Wallet Summary
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-primary rounded-lg px-4 py-3">
            <p className="text-sm text-lightText mb-1">No of Transactions</p>
            <p className="text-lg font-bold text-textColor">
              {customerStatus === "loading" ? (
                <Skeleton width={60} />
              ) : (
                (customer?.totalOrders ?? 0).toLocaleString()
              )}
            </p>
          </div>
          <div className="border border-primary rounded-lg px-4 py-3">
            <p className="text-sm text-lightText mb-1">Total Amount Transacted</p>
            <p className="text-lg font-bold text-textColor">
              {customerStatus === "loading" ? (
                <Skeleton width={100} />
              ) : (
                customer?.totalTransactionValue || "—"
              )}
            </p>
          </div>
          <div className="border border-primary rounded-lg px-4 py-3">
            <p className="text-sm text-lightText mb-1">Last Transaction</p>
            <p className="text-lg font-bold text-textColor">
              {ordersStatus === "loading" ? (
                <Skeleton width={100} />
              ) : (
                lastTransactionDate || "—"
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden border border-lightText/10">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 pb-4">
          <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold text-primary bg-primary/10">
            Transactions
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <SearchInput
              value={searchText}
              onChange={handleSearch}
              className="w-full max-w-xs"
              height="h-[38px]"
              placeholder="Search by reference, recipient or status"
            />
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-2 px-4 h-[38px] border border-lightText/30 rounded-lg text-sm font-medium text-textColor hover:bg-secondary/50 transition-colors whitespace-nowrap"
            >
              <Image src={ExportIcon} alt="Export" />
              Export
            </button>
          </div>
        </div>

        <div className="w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary border-y border-lightText/10">
              <tr className="text-xs uppercase text-lightText tracking-wider">
                <th className="px-6 py-4">Date | Time</th>
                <th className="px-3 py-4">Reference</th>
                <th className="px-3 py-4">Recipient</th>
                <th className="px-3 py-4">Amount</th>
                <th className="px-3 py-4">Payment Link</th>
                <th className="px-3 py-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersStatus === "loading" && (
                <tr>
                  <td colSpan={6} className="pt-4">
                    <div className="px-6 space-y-3 pb-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 py-2">
                          <Skeleton width={140} height={14} />
                          <Skeleton width={90} height={14} />
                          <Skeleton width={160} height={14} />
                          <Skeleton width={100} height={14} />
                          <Skeleton width={120} height={14} />
                          <Skeleton width={80} height={22} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}

              {ordersStatus === "success" &&
                (orders.length > 0 ? (
                  <>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t border-lightText/10 hover:bg-primary/5 cursor-pointer transition-colors"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <td className="px-6 py-4 text-sm text-textColor whitespace-nowrap">
                          {order.createdDate}
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor whitespace-nowrap">
                          #{order.referenceNumber}
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor">
                          {order.recipientName}
                        </td>
                        <td className="px-3 py-4 text-sm font-bold text-textColor whitespace-nowrap">
                          {order.amount}
                        </td>
                        <td
                          className="px-3 py-4 text-sm text-primary truncate max-w-[180px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={order.paymentLink}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:underline"
                          >
                            {order.paymentLink?.replace(/^https?:\/\//, "")}
                          </a>
                        </td>
                        <td className="px-3 py-4 pr-6">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={6} className="pt-2 pb-4 px-6">
                        <Pagination
                          count={totalPages}
                          currentPage={pageNumber}
                          onChange={(e: any) => setPageNumber(e.selected)}
                        />
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <NoData py="pt-14" />
                    </td>
                  </tr>
                ))}

              {ordersStatus === "error" && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center pt-10 pb-6 text-sm text-lightText"
                  >
                    {String(ordersError)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        customer={customer}
        onClose={() => setSelectedOrder(null)}
      />

      <DeleteCustomerModal
        isOpen={showDelete}
        customerName={customer?.name}
        onClose={() => setShowDelete(false)}
        isLoading={deleteMutation.isLoading}
        onConfirm={() => {
          if (!slug) return;
          deleteMutation.mutate({
            service: "wallet-service/api/v1",
            endpoint: `customers/${slug}`,
            method: "DELETE",
            auth: true,
          });
        }}
      />
    </>
  );
}

export default CustomerDetail;