import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { EscrowSearchBar } from "./escrow-common/escrow-search-bar";
import { EscrowFilterTabs } from "./escrow-common/escrow-filter-tabs";
import { EscrowTransactionsTable } from "./escrow-common/escrow-transactions-table";
import { TransactionDetailsModal } from "./modal/transaction-details-modal";
// import useGetQuery from "../../../hooks/useGetQuery";
import { EscrowStatus, EscrowTransaction } from "./types/types";
import { MOCK_ESCROW_TRANSACTIONS } from "./data";
import { Pagination } from "../../common/TablePagination";

export default function WalletTransactionsPage() {
  const [activeTab, setActiveTab] = useState<EscrowStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [selectedTransaction, setSelectedTransaction] =
    useState<EscrowTransaction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  
  // const { data: escrowData, status: escrowStatus } = useGetQuery({
  //   endpoint: "escrow/transactions",
  //   pQuery: {
  //     Status: activeTab === "all" ? undefined : activeTab,
  //     Search: search || undefined,
  //     PageNumber: pageNumber,
  //     PageSize: pageSize,
  //   },
  //   queryKey: ["escrow-transactions", activeTab, search, pageNumber, pageSize],
  //   auth: true,
  // });

  // const transactions: EscrowTransaction[] = useMemo(() => {
  //   if (escrowStatus === "success" && escrowData?.isSuccess) {
  //     return escrowData.data ?? [];
  //   }
  //   return [];
  // }, [escrowData, escrowStatus]);

  // const totalElements = escrowData?.totalCount ?? 0;
  // const isLoading = escrowStatus === "loading";

 
  const escrowStatus = "success";
  const isLoading = false;
  const transactions: EscrowTransaction[] = useMemo(() => {
    return MOCK_ESCROW_TRANSACTIONS.filter((tx) => {
      const matchesTab = activeTab === "all" || tx.status === activeTab;
      const matchesSearch =
        !search ||
        tx.id.includes(search) ||
        tx.buyer.name.toLowerCase().includes(search.toLowerCase()) ||
        tx.items.some((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);
  const totalElements = transactions.length;

  const totalPages = Math.max(Math.ceil(totalElements / pageSize), 1);
  const rangeStart = totalElements === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const rangeEnd = Math.min(pageNumber * pageSize, totalElements);

  const handleRowClick = (transaction: EscrowTransaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] font-outfit">
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <div className="bg-white rounded-2xl border-2 border-primary-500/40 shadow-sm p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
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

            <EscrowTransactionsTable
              transactions={transactions}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
             <Pagination
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalElements={totalElements}
              onPageChange={setPageNumber}
            />
          </div>
        </main>
      </div>

      <TransactionDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
}
