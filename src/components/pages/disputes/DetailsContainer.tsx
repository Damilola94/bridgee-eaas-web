"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SellerDetailSection } from "./ui/seller-detail-section";
import { BuyerDetailSection } from "./ui/buyer-detail-section";
import { ActivityTimeline } from "./ui/activity-timeline";
import useGetQuery from "../../../hooks/useGetQuery";
import { DisputeDetailDTO } from "./types/interface";

function EvidenceLink({ fileName, url }: { fileName: string; url: string }) {
  return (
    <div className="flex items-center gap-3 pt-3">
      <div className="w-8 h-8 rounded bg-gray-100 shrink-0" />
      <a href={url} target="_blank" rel="noreferrer" className="text-sm text-gray-900 underline">
        {fileName}
      </a>
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
  const { data, status } = useGetQuery({
    endpoint: `escrow-service/api/v1/disputes/${params.disputeId}`,
    queryKey: ["dispute-detail", params.disputeId],
    auth: true,
  });

  if (status === "loading") {
    return <div className="p-8 text-gray-500">Loading...</div>;
  }

  if (status !== "success" || !data?.isSuccess) {
    return <div className="p-8 text-gray-500">Unable to load dispute.</div>;
  }

  const dto: DisputeDetailDTO = data.data;

  // Reporter is the party who filed the dispute — treated as the buyer here,
  // matching how the original mock laid the two sections out. Seller has no
  // identity fields in this response at all (see note above).
  const dispute = {
    seller: { name: "", phone: "", email: "" },
    buyer: {
      name: dto.reporterName,
      phone: dto.reporterPhone,
      email: dto.reporterEmail,
      address: "",
    },
    sellerReason: dto.disputeReason,
    buyerCounter: dto.sellerResponse,
    timeline: [] as { id: string; label: string; date: string; state: "success" | "error" | "pending" }[],
  };

  const evidenceFiles = [
    ...dto.pictureProofs.map((url, i) => ({ url, fileName: `Evidence photo ${i + 1}` })),
    ...dto.videoProofs.map((url, i) => ({ url, fileName: `Evidence video ${i + 1}` })),
  ];

  const sellerEvidenceFiles = dto.sellerEvidence.map((url, i) => ({
    url,
    fileName: `Seller evidence ${i + 1}`,
  }));

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
            {evidenceFiles.map((f) => (
              <EvidenceLink key={f.url} fileName={f.fileName} url={f.url} />
            ))}
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-md mb-3">
              Seller
            </span>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-medium text-gray-900">Buyer's Counter-evidence: </span>
              <em>"{dispute.buyerCounter}"</em>
            </p>
            {sellerEvidenceFiles.map((f) => (
              <EvidenceLink key={f.url} fileName={f.fileName} url={f.url} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ActivityTimeline events={dispute.timeline} />
        </div>
      </div>
    </div>
  );
}