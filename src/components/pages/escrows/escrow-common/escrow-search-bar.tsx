import { Search } from "lucide-react";

export function EscrowSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative w-full max-w-[280px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by ID, Buyer, Product"
        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-900"
      />
    </div>
  );
}