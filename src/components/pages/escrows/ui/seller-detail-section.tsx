import { DetailField } from "./detail-field";

interface SellerDetailSectionProps {
  seller: {
    name: string;
    address: string;
  };
}

export function SellerDetailSection({
  seller,
}: SellerDetailSectionProps) {
  return (
    <div className="space-y-2">
      <span className="inline-block rounded-md bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700">
        Seller's Detail
      </span>

      <div className="grid grid-cols-2 gap-y-3 rounded-xl bg-pink-50/60 p-4">
        <DetailField label="Name" value={seller.name} />

        <div className="col-span-2">
          <DetailField
            label="Address"
            value={seller.address || "Not provided"}
          />
        </div>
      </div>
    </div>
  );
}