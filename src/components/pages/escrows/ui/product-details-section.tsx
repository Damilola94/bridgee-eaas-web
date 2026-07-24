import TransactionStatus from "../ui/escrow-status-badge";
import { formatCurrency } from "../../../../utilities/general";
import { EscrowProductItem, EscrowStatus } from "../types/types";

export function ProductDetailsSection({
  items,
  status,
}: {
  items: EscrowProductItem[];
  status: EscrowStatus;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
          Product Details
        </span>
        <TransactionStatus status={status} />
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-2 px-4 py-2.5 bg-gray-50 text-xs font-medium text-gray-400">
          <div>Product Name</div>
          <div>Quantity</div>
          <div>Amount</div>
        </div>
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-2 px-4 py-3 text-sm text-gray-900 border-t border-gray-100"
          >
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>{formatCurrency(item.amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}