import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SellerDetailSection } from "./ui/seller-detail-section";
import { BuyerDetailSection } from "./ui/buyer-detail-section";
import { ActivityTimeline } from "./ui/activity-timeline";

function EvidenceLink({ fileName }: { fileName: string }) {
  return (
    <div className="flex items-center gap-3 pt-3">
      <div className="w-8 h-8 rounded bg-gray-100 shrink-0" />
      <a href="#" className="text-sm text-gray-900 underline">{fileName}</a>
      <button type="button" className="text-sm text-pink-700 font-medium ml-auto">
        View evidence
      </button>
    </div>
  );
}

export default function DisputeDetailsPage({
  params,
}: {
  params: { disputeId: string };
}) {
  // Replace with useGetQuery(`disputes/${params.disputeId}`)
  const dispute = {
    seller: { name: "Guy Hawkins", phone: "Guy Hawkins", email: "guyhawkins@gmail.com" },
    buyer: {
      name: "Guy Hawkins",
      phone: "Guy Hawkins",
      email: "guyhawkins@gmail.com",
      address: "25, Williams Street, Lekki Phase 1 Lagos State",
    },
    sellerReason:
      "The product is not what i asked for, i asked for a bag and i got a shoe. i will provide evidences of our chat and a picture of the product that was delivered.",
    buyerCounter:
      "Dear Friend Very very sorry about the mixup. Because it is the shipping peak in the year, all the packages get mixed up. After Bridge deals with the dispute, you will get refund,",
    timeline: [
      { id: "1", label: "Lorem", date: "2026-04-01T12:00:00", state: "success" as const },
      { id: "2", label: "Lorem", date: "2026-04-01T12:00:00", state: "success" as const },
      { id: "3", label: "Lorem", date: "2026-04-01T12:00:00", state: "success" as const },
      { id: "4", label: "Lorem", date: "2026-04-01T12:00:00", state: "success" as const },
      { id: "5", label: "Lorem", date: "2026-04-01T12:00:00", state: "success" as const },
      { id: "6", label: "Lorem", date: "2026-04-01T12:00:00", state: "pending" as const },
    ],
  };

  return (
    <div className="p-8 space-y-6 font-outfit">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/dispute-management" className="hover:text-gray-700">
          Dispute Management
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-900 font-medium">Dispute Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <SellerDetailSection seller={dispute.seller} />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <BuyerDetailSection buyer={dispute.buyer} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <span className="inline-block bg-gray-100 text-sm font-medium text-gray-800 px-3 py-1.5 rounded-lg">
            Dispute
          </span>

          <div>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium text-gray-900">Seller's Dispute reason: </span>
              <em>"{dispute.sellerReason}"</em>
            </p>
            <EvidenceLink fileName="National Identification.jpeg" />
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-md mb-3">
              Seller
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium text-gray-900">Buyer's Counter-evidence: </span>
              <em>"{dispute.buyerCounter}"</em>
            </p>
            <EvidenceLink fileName="National Identification.jpeg" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ActivityTimeline events={dispute.timeline} />
        </div>
      </div>
    </div>
  );
}