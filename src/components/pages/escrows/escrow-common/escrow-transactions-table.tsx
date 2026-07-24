import moment from "moment";
import TransactionStatus from "../ui/escrow-status-badge";
import { formatCurrency } from "../../../../utilities/general";
import { EscrowTransaction } from "../types/types";

export function EscrowTransactionsTable({
  transactions,
  isLoading,
  onRowClick,
}: {
  transactions: EscrowTransaction[];
  isLoading: boolean;
  onRowClick: (transaction: EscrowTransaction) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[960px]">
        <div className="grid grid-cols-[1fr_1fr_1fr_1.3fr_1fr_0.9fr_0.9fr_1fr] gap-4 px-6 py-3 text-xs font-medium text-gray-400 tracking-wide border-b border-gray-100 bg-gray-50/60 rounded-t-lg">
          <div>Transaction ID</div>
          <div>Buyer Name</div>
          <div>Seller Name</div>
          <div>Item</div>
          <div>Escrow Amount</div>
          <div>Start Date</div>
          <div>End Date</div>
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
            className="grid grid-cols-[1fr_1fr_1fr_1.3fr_1fr_0.9fr_0.9fr_1fr] gap-4 px-6 py-4 text-sm text-left border-b border-gray-50 hover:bg-gray-50 w-full items-center"
          >
            <div className="text-gray-900 font-medium">#{tx.id}</div>
            <div className="text-gray-600">{tx.buyer.name}</div>
            <div className="text-gray-600">{tx.seller.name}</div>
            <div className="text-gray-600 flex items-center gap-1.5">
              {tx.items[0]?.name}
              {tx.items.length > 1 && (
                <span className="bg-pink-50 text-pink-700 text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  + {tx.items.length - 1} More
                </span>
              )}
            </div>
            <div className="text-gray-600">
              {formatCurrency(tx.escrowAmount)}
            </div>
            <div className="text-gray-600">
              {moment(tx.startDate).format("DD MMM YYYY")}
            </div>
            <div className="text-gray-600">
              {tx.endDate ? moment(tx.endDate).format("DD MMM YYYY") : "---"}
            </div>
            <div>
              <TransactionStatus status={tx.status} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}