import TransactionStatus from "../ui/escrow-status-badge";
import { EscrowStatus, TransactionItem } from "../types/types";

interface ProductDetailsSectionProps {
  items: TransactionItem[];
  status: EscrowStatus;
}

export function ProductDetailsSection({
  items,
  status,
}: ProductDetailsSectionProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="inline-block rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
          Product Details
        </span>

        <TransactionStatus status={status} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100">
        {/* Header */}
        <div className="grid grid-cols-[1fr_70px_120px] gap-2 bg-gray-50 px-4 py-2.5 text-xs font-medium text-gray-400">
          <div>Product Name</div>
          <div>Qty</div>
          <div>Amount</div>
        </div>

        {/* Products */}
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="grid grid-cols-[1fr_70px_120px] gap-2 border-t border-gray-100 px-4 py-3 text-sm text-gray-900"
          >
            <div className="font-medium">{item.name}</div>

            <div>{item.quantity}</div>

            <div className="font-medium">{item.total}</div>
          </div>
        ))}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="px-4 py-6 text-center text-sm text-gray-400">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}