import { useMemo, useState } from "react";
import { Info } from "lucide-react";

import { columns } from "./data";
import { EscrowSearchBar } from "./escrow-common/escrow-search-bar";
import { EscrowFilterTabs } from "./escrow-common/escrow-filter-tabs";
import { DataTable } from "../../common/DataTable";
import { TransactionDetailsModal } from "./modal/transaction-details-modal";
import useGetQuery from "../../../hooks/useGetQuery";
import { EscrowStatus, EscrowTransactionSummary } from "./types/types";

import { Pagination } from "../../common/TablePagination";

export default function WalletTransactionsPage() {
  const [activeTab, setActiveTab] = useState<EscrowStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { data: escrowData, status: escrowStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/escrowtransactions",
    pQuery: {
      Status: activeTab === "all" ? undefined : activeTab,
      Search: search || undefined,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["escrow-transactions", activeTab, search, pageNumber, pageSize],
    auth: true,
  });

  const transactions: EscrowTransactionSummary[] = useMemo(() => {
    if (escrowStatus === "success" && escrowData?.isSuccess) {
      return escrowData.data ?? [];
    }
    return [];
  }, [escrowData, escrowStatus]);

  const totalElements = escrowData?.totalCount ?? 0;
  const isLoading = escrowStatus === "loading";

  const totalPages = Math.max(Math.ceil(totalElements / pageSize), 1);
  const rangeStart = totalElements === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const rangeEnd = Math.min(pageNumber * pageSize, totalElements);

  const handleRowClick = (transaction: EscrowTransactionSummary) => {
    setSelectedTransactionId(transaction.id);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex h-full font-outfit">
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <div className="bg-white rounded-[20px] border border-primary-500/40 shadow-sm space-y-5">
            <div className="p-6 flex flex-1 flex-col gap-3 ">
              <div className="flex flex-wrap items-center gap-3 ">
                <EscrowSearchBar
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPageNumber(1);
                  }}
                />
                <EscrowFilterTabs
                  activeTab={activeTab}
                  onChange={(tab) => {
                    setActiveTab(tab);
                    setPageNumber(1);
                  }}
                />
              </div>

              <div className="bg-pink-50 text-pink-700 text-sm px-4 py-3 rounded-lg flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#A3195B] text-white flex items-center justify-center shrink-0">
                  <Info className="h-3 w-3" />
                </span>
                Click on any transaction to view transaction details
              </div>
            </div>
            <DataTable
              columns={columns}
              data={transactions}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
            <div className="p-5">
              <Pagination
                pageNumber={pageNumber}
                pageSize={pageSize}
                totalElements={totalElements}
                onPageChange={setPageNumber}
              />
            </div>
          </div>
        </main>
      </div>

      <TransactionDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        transactionId={selectedTransactionId}
      />
    </div>
  );
}
