"use client";

import { useState, useMemo, type ChangeEventHandler } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import { RxChevronRight } from "react-icons/rx";
import { debounce } from "lodash";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQueryClient } from "react-query";

import useGetQuery from "../../../../hooks/useGetQuery";
import { formatApiDate } from "../../../../utilities/dateTime";
import NoData from "../../../common/NoData";
// import Loading from "../../../common/Loading";
import SearchInput from "../../../inputs/Search";
import Pagination from "../../../common/Pagination";
import Button from "../../../inputs/Button";

import { PAGE_SIZE } from "../../../../data/constants";
import TransactionFilter from "./Filter";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";

import EditIcon from "../../../../assets/svgs/edit-gray.svg";
import TrashIcon from "../../../../assets/svgs/trash-gray.svg";
import ExportIcon from "../../../../assets/svgs/export.svg";

import InventoryStats from "../InventoryStats";
import AddItemChoiceModal from "../modals/AddItemChoiceModal";
import AddSingleItemModal from "../modals/AddSingleItemModal";
import BulkUploadModal from "../modals/BulkUploadModal";
import InventorySuccessModal from "../modals/InventorySuccessModal";
import DeleteInventoryItemModal from "../modals/DeleteInventoryItemModal";
import { useCookies } from "react-cookie";
import TransactionStatus from "../../../common/TransactionStatus";

function AllInventoryList({ isDashboard = false }) {
  const [cookie] = useCookies(["data"]);
  const [filter, setFilter] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [showChoice, setShowChoice] = useState(false);
  const [showSingle, setShowSingle] = useState(false);
  const [showBulk, setShowBulk] = useState(false);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [editTarget, setEditTarget] = useState<any>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Replace the existing prefillData + isAddItemOpen block with this:

  const { addItem, prefillName, prefillAmount, prefillItems } = router.query;

  const prefillQueue = useMemo<
    Array<{ name: string; amountPerUnit: string }>
  >(() => {
    if (!addItem) return [];
    if (prefillItems) {
      try {
        return JSON.parse(prefillItems as string);
      } catch {
        return [];
      }
    }
    if (prefillName) {
      return [
        {
          name: prefillName as string,
          amountPerUnit: String(prefillAmount || ""),
        },
      ];
    }
    return [];
  }, [addItem, prefillName, prefillAmount, prefillItems]);

  const [prefillIndex, setPrefillIndex] = useState(0);
  const [isAddItemOpen, setIsAddItemOpen] = useState(prefillQueue.length > 0);

  const currentPrefill = prefillQueue[prefillIndex] ?? null;

  const handlePrefillSuccess = () => {
    const next = prefillIndex + 1;
    if (next < prefillQueue.length) {
      // More items to add — advance the queue
      setPrefillIndex(next);
    } else {
      // Done — clean up
      setIsAddItemOpen(false);
      setPrefillIndex(0);
      // Strip prefill params from URL without full navigation
      const {
        addItem: _,
        prefillName: __,
        prefillAmount: ___,
        prefillItems: ____,
        ...rest
      } = router.query;
      router.replace({ pathname: router.pathname, query: rest }, undefined, {
        shallow: true,
      });
      setShowAddSuccess(true);
    }
  };

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "inventory",
    queryKey: ["inventory", pageNumber, search, filter],
    pQuery: {
      start: formatApiDate(filter?.startDate),
      end: formatApiDate(filter?.endDate),
      SellerId: cookie?.data?.userId,
      category: filter?.category,
      pageSize: isDashboard ? 5 : PAGE_SIZE,
      pageNumber: pageNumber + 1,
      SearchKey: search,
    },
    enabled: true,
  });

  const { data: statsResponse } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "inventory",
    extra: "stats",
    queryKey: ["inventory-stats"],
    enabled: true,
  });

  const statsData = statsResponse?.data || {};

  const debouncedSearch = useMemo(() => debounce(setSearch, 1000), [setSearch]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchText(value);
    debouncedSearch(value);
  };

  const allIds: string[] = data?.data?.map((item: any) => item.id) || [];
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.has(id));

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(allIds));
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const deleteMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Item deleted successfully",
        type: "success",
      });
      setDeleteTarget(null);
      queryClient.invalidateQueries(["inventory"]);
      queryClient.invalidateQueries(["inventory-stats"]);
      setShowDeleteSuccess(true);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to delete item.",
        type: "danger",
      });
    },
  });

  const handleEdit = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    setEditTarget(item);
  };

  return (
    <>
      {!isDashboard && (
        <div className="w-full flex justify-end mb-4">
          <Button
            onClick={() => setShowChoice(true)}
            icon={<BiPlus className="w-5 h-5" />}
            iconPosition="left"
            className="whitespace-nowrap flex-shrink-0 !rounded-full px-3"
            paddingY="py-2"
          >
            Add New Item
          </Button>
        </div>
      )}

      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <InventoryStats
          totalItems={statsData?.totalItems || 0}
          inStock={statsData?.inStock || 0}
          lowStock={statsData?.lowStock || 0}
          totalValue={statsData?.totalValue || 0}
          outOfStock={statsData?.outOfStock || 0}
        />
      </div>

      <div className="w-full bg-white shadow-sm rounded-xl overflow-hidden border border-lightText/10">
        <div className="px-6 pt-6 pb-4">
          <h3 className="font-bold text-xl text-textColor mb-0.5">
            All Inventory
          </h3>
          <p className="text-sm text-lightText">
            List of all the items you have in stock
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pb-4">
          <div className="flex items-center gap-2">
            <TransactionFilter filter={filter} onChange={setFilter} />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            {isDashboard ? (
              <Link href="/inventory">
                <span className="text-primary text-sm flex items-center hover:underline">
                  See All <RxChevronRight className="w-5 h-auto mb-1" />
                </span>
              </Link>
            ) : (
              <>
                <SearchInput
                  value={searchText}
                  onChange={handleSearch}
                  className="w-full max-w-xs"
                  height="h-[38px]"
                  placeholder="Search by name, category or status"
                />
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 h-[38px] border border-lightText/30 rounded-lg text-sm font-medium text-textColor hover:bg-secondary/50 transition-colors whitespace-nowrap"
                >
                  <Image src={ExportIcon} alt="Export" />
                  Export
                </button>
              </>
            )}
          </div>
        </div>

        <div className="w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-secondary border-y border-lightText/10">
              <tr className="text-xs uppercase text-lightText tracking-wider">
                <th className="pl-6 pr-3 py-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-primary cursor-pointer"
                  />
                </th>
                <th className="px-3 py-4">Product</th>
                <th className="px-3 py-4">Category</th>
                <th className="px-3 py-4">Amount Per Unit</th>
                <th className="px-3 py-4">Total Amount</th>
                <th className="px-3 py-4">Opening Quantity</th>
                <th className="px-3 py-4">Current Quantity</th>
                <th className="px-3 py-4">Status</th>
                <th className="px-3 py-4">Date Added</th>
                <th className="px-3 py-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && (
                <tr>
                  <td colSpan={9} className="pt-4">
                    <div className="px-6 space-y-3 pb-4">
                      {[...Array(isDashboard ? 5 : 10)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-4 py-2"
                        >
                          <Skeleton width={16} height={16} />
                          <Skeleton width={32} height={32} borderRadius={8} />
                          <Skeleton width={180} height={14} />
                          <Skeleton width={100} height={14} />
                          <Skeleton width={100} height={14} />
                          <Skeleton width={80} height={14} />
                          <Skeleton width={80} height={14} />
                          <Skeleton width={70} height={22} borderRadius={99} />
                          <Skeleton width={90} height={14} />
                          <Skeleton width={60} height={14} />
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}

              {status === "success" &&
                (data?.data?.length > 0 ? (
                  <>
                    {data?.data?.map((item: any) => (
                      <tr
                        className="border-t border-lightText/10 hover:bg-primary/5 cursor-pointer transition-colors"
                        key={item?.id}
                        onClick={() => router.push(`/inventory/${item?.id}`)}
                      >
                        <td
                          className="pl-6 pr-3 py-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.has(item.id)}
                            onChange={() => toggleSelect(item.id)}
                            className="w-4 h-4 rounded accent-primary cursor-pointer"
                          />
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">
                            {item?.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-9 h-9 rounded-lg object-cover flex-shrink-0 border border-lightText/10"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-lightText font-bold uppercase">
                                  {item?.name?.charAt(0) || "?"}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-sm text-textColor">
                              {item?.name}
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-4 text-sm text-textColor">
                          {item?.category || "—"}
                        </td>

                        <td className="px-3 py-4">
                          <span className="font-bold text-sm text-textColor">
                            {item?.amountPerUnit || "—"}
                          </span>
                        </td>

                        <td className="px-3 py-4 text-sm text-textColor">
                          {item?.totalAmount || "—"}
                        </td>

                        <td className="px-3 py-4 text-sm text-textColor">
                          {item?.openingQuantity ?? "—"}
                        </td>

                        <td className="px-3 py-4 text-sm text-textColor">
                          {item?.currentQuantity ?? "—"}
                        </td>

                        <td className="px-3 py-4">
                          {item?.status ? (
                            <TransactionStatus status={item.status} />
                          ) : (
                            <span className="text-lightText text-sm">—</span>
                          )}
                        </td>

                        <td className="px-3 py-4 text-sm text-lightText">
                          {item?.createdDate || "—"}
                        </td>

                        <td
                          className="px-3 py-4 pr-6"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={(e) => handleEdit(e, item)}
                              title="Edit"
                              className="hover:opacity-70 transition-opacity"
                            >
                              <Image
                                src={EditIcon}
                                alt="Edit"
                                className="w-5 h-5"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteTarget(item)}
                              title="Delete"
                              className="hover:opacity-70 transition-opacity"
                            >
                              <Image
                                src={TrashIcon}
                                alt="Delete"
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!isDashboard && (
                      <tr>
                        <td colSpan={9} className="pt-2 pb-4 px-6">
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
                    <td colSpan={9}>
                      <NoData py="pt-14" />
                    </td>
                  </tr>
                ))}

              {status === "error" && (
                <tr>
                  <td
                    colSpan={9}
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

      <AddItemChoiceModal
        isOpen={showChoice}
        onClose={() => setShowChoice(false)}
        onSelectSingle={() => {
          setShowChoice(false);
          setShowSingle(true);
        }}
        onSelectBulk={() => {
          setShowChoice(false);
          setShowBulk(true);
        }}
      />

      <AddSingleItemModal
        isOpen={showSingle}
        onClose={() => setShowSingle(false)}
        onSuccess={() => {
          setShowSingle(false);
          setShowAddSuccess(true);
        }}
        sellerId={cookie?.data?.userId ?? ""}
      />

      <AddSingleItemModal
        isOpen={isAddItemOpen && !!currentPrefill}
        onClose={() => {
          setIsAddItemOpen(false);
          setPrefillIndex(0);
          const {
            addItem: _,
            prefillName: __,
            prefillAmount: ___,
            prefillItems: ____,
            ...rest
          } = router.query;
          router.replace(
            { pathname: router.pathname, query: rest },
            undefined,
            { shallow: true },
          );
        }}
        onSuccess={handlePrefillSuccess}
        sellerId={cookie?.data?.userId ?? ""}
        editItem={currentPrefill}
        forceAddMode
      />

      <BulkUploadModal
        isOpen={showBulk}
        onClose={() => setShowBulk(false)}
        onSuccess={() => {
          setShowBulk(false);
          setShowAddSuccess(true);
        }}
      />

      <InventorySuccessModal
        isOpen={showAddSuccess}
        onClose={() => setShowAddSuccess(false)}
        title="Item Saved Successfully"
        message="Your item has been saved and you can now go ahead to manage it in the Inventory section"
      />

      <DeleteInventoryItemModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteMutation.mutate({
            service: "wallet-service/api/v1/",
            endpoint: `inventory/${deleteTarget.id}`,
            auth: true,
            method: "DELETE",
          });
        }}
        isLoading={deleteMutation.isLoading}
      />

      <InventorySuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        title="Item Deleted Successfully"
        message="Your item has been deleted and you can now go ahead to the Inventory section"
      />
    </>
  );
}

export default AllInventoryList;

