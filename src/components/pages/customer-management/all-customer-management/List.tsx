"use client";

import { useMemo, useState, type ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "react-query";

import useGetQuery from "../../../../hooks/useGetQuery";
import NoData from "../../../common/NoData";
import SearchInput from "../../../inputs/Search";
import Pagination from "../../../common/Pagination";

import { PAGE_SIZE } from "../../../../data/constants";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

import ExportIcon from "../../../../assets/svgs/export.svg";

import CustomerMgtStats from "../component/CustomerMgtStats";
import DeleteCustomerModal from "../modals/DeleteCustomerModal";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lastTransactionDate: string;
  status?: string;
};

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}

function AllCustomers() {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: statsRes, status: statsStatus } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: "customers/stats",
    queryKey: ["customer-stats"],
    enabled: true,
  });

  const stats = statsRes?.data || {};

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "customers",
    queryKey: ["customers", pageNumber, search],
    pQuery: {
      pageSize: PAGE_SIZE,
      pageNumber: pageNumber + 1,
      SearchKey: search,
    },
    enabled: true,
  });

  const customers: Customer[] = data?.data || [];
  const totalPages = data?.metaData?.totalPages ?? 0;

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
      setDeleteTarget(null);
      queryClient.invalidateQueries(["customers"]);
      queryClient.invalidateQueries(["customer-stats"]);
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
        endpoint: "customers/export",
        method: "GET",
        pQuery: { SearchKey: search },
        auth: true,
        raw: true, // expects raw response (e.g. CSV blob)
      });

      const blob = new Blob([res], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `customers-${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      notification({
        title: "Export Error",
        message: err?.toString() || "Failed to export customers.",
        type: "danger",
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <CustomerMgtStats
          totalCustomers={stats?.totalCustomers}
          totalCustomersWithCompletedTransactions={
            stats?.totalCustomersWithCompletedTransactions
          }
          totalCustomersWithPendingTransactions={
            stats?.totalCustomersWithPendingTransactions
          }
          isLoading={statsStatus === "loading"}
        />
      </div>

      <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden border border-lightText/10">
        <div className="px-6 pt-6 pb-4">
          <h3 className="font-bold text-xl text-textColor mb-0.5">
            All Customers
          </h3>
          <p className="text-sm text-lightText">
            List of all the customers that have purchased from you
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-4">
          <div className="flex items-center gap-2" />
          <div className="flex items-center gap-3 ml-auto">
            <SearchInput
              value={searchText}
              onChange={handleSearch}
              className="w-full max-w-xs"
              height="h-[38px]"
              placeholder="Search by name, phone number, email or status"
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
                <th className="px-6 py-4">Customer</th>
                <th className="px-3 py-4">Phone Number</th>
                <th className="px-3 py-4">Email Address</th>
                <th className="px-3 py-4">Number of Transactions</th>
                <th className="px-3 py-4">Date of Last Transaction</th>
                <th className="px-3 py-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && (
                <tr>
                  <td colSpan={6} className="pt-4">
                    <div className="px-6 space-y-3 pb-4">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-4 py-2">
                          <Skeleton width={32} height={32} circle />
                          <Skeleton width={160} height={14} />
                          <Skeleton width={100} height={14} />
                          <Skeleton width={180} height={14} />
                          <Skeleton width={60} height={14} />
                          <Skeleton width={90} height={14} />
                          <Skeleton width={70} height={28} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}

              {status === "success" &&
                (customers.length > 0 ? (
                  <>
                    {customers.map((item) => (
                      <tr
                        className="border-t border-lightText/10 hover:bg-primary/5 cursor-pointer transition-colors"
                        key={item.id}
                        onClick={() =>
                          router.push(`/customer-management/customer-details/${item.id}`)
                        }
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-white font-bold uppercase">
                                {getInitials(item.name)}
                              </span>
                            </div>
                            <span className="font-medium text-sm text-textColor">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor">
                          {item.phone || "—"}
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor">
                          {item.email || "—"}
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor">
                          {item.totalOrders ?? 0}
                        </td>
                        <td className="px-3 py-4 text-sm text-textColor">
                          {item.lastTransactionDate || "—"}
                        </td>
                        <td
                          className="px-3 py-4 pr-6 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-md transition-colors"
                          >
                            Delete
                          </button>
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

              {status === "error" && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center pt-10 pb-6 text-sm text-lightText"
                  >
                    {String(error)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Delete Modal ── */}
      <DeleteCustomerModal
        isOpen={!!deleteTarget}
        customerName={deleteTarget?.name}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteMutation.mutate({
            service: "wallet-service/api/v1",
            endpoint: `customers/${deleteTarget.id}`,
            method: "DELETE",
            auth: true,
          });
        }}
        isLoading={deleteMutation.isLoading}
      />
    </>
  );
}

export default AllCustomers;