import TransactionStatus from "../ui/escrow-status-badge";
import { EscrowTransactionSummary } from "../types/types";

export function EscrowTransactionsTable({
  transactions,
  isLoading,
  onRowClick,
}: {
  transactions: EscrowTransactionSummary[];
  isLoading: boolean;
  onRowClick: (transaction: EscrowTransactionSummary) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[960px]">
        <div className="grid grid-cols-[1.1fr_1fr_1.3fr_1fr_1.2fr_0.9fr] gap-4 px-6 py-3 text-xs font-medium text-gray-400 tracking-wide border-b border-gray-100 bg-gray-50/60 rounded-t-lg">
          <div>Reference</div>
          <div>Buyer Name</div>
          <div>Buyer Email</div>
          <div>Amount</div>
          <div>Created</div>
          <div>Status</div>
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading transactions...
          </div>
        )}

        {!isLoading && transactions.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No transactions found.
          </div>
        )}

        {transactions.map((tx) => (
          <button
            key={tx.id}
            type="button"
            onClick={() => onRowClick(tx)}
            className="grid grid-cols-[1.1fr_1fr_1.3fr_1fr_1.2fr_0.9fr] gap-4 px-6 py-4 text-sm text-left border-b border-gray-50 hover:bg-gray-50 w-full items-center"
          >
            <div className="text-gray-900 font-medium">
              {tx.referenceNumber}
            </div>
            <div className="text-gray-600">{tx.buyerName}</div>
            <div className="truncate text-gray-600">{tx.buyerEmail}</div>
            <div className="text-gray-600">{tx.amount}</div>
            <div className="text-gray-600">{tx.createdDate}</div>
            <div>
              <TransactionStatus status={tx.status} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

