import { DetailField } from "./detail-field";

export function BuyerDetailSection({
  buyer,
}: {
  buyer: { name: string; phone: string; email: string; address: string };
}) {
  return (
    <div className="space-y-2">
      <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
        Buyer's Details
      </span>
      <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-y-3">
        <DetailField label="Name" value={buyer.name} />
        <DetailField label="Phone number" value={buyer.phone} />
        <DetailField label="Email address" value={buyer.email} />
        <DetailField label="Address" value={buyer.address} />
      </div>
    </div>
  );
}