import { DetailField } from "./detail-field";

export function SellerDetailSection({
  seller,
}: {
  seller: { name: string; phone: string; email: string };
}) {
  return (
    <div className="space-y-2">
      <span className="inline-block bg-pink-50 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-md">
        Seller's Detail
      </span>
      <div className="bg-pink-50/60 rounded-xl p-4 grid grid-cols-2 gap-y-3">
        <DetailField label="Name" value={seller.name} />
        <DetailField label="Phone number" value={seller.phone} />
        <div className="col-span-2">
          <DetailField label="Email address" value={seller.email} />
        </div>
      </div>
    </div>
  );
}