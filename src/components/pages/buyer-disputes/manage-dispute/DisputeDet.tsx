// app/.../DisputeDetails.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

import SecurityUser from '../../../../assets/svgs/security-user.svg';

import { EvidenceList } from "./EvidenceList";
import { ApiDispute } from "./type";

type EvidenceFile = {
  name: string;
  url: string | StaticImageData;
};

interface Props {
  dispute: ApiDispute;
  onViewEvidence?: (url: string) => void;
}
export default function DisputeDetails({
  dispute,
  onViewEvidence
}: Props) {
  const buyerEvidence: EvidenceFile[] = [
    ...(dispute?.pictureProofs ?? []).map((url, i) => ({
      name: `Picture ${i + 1}`,
      url
    })),
    ...(dispute?.videoProofs ?? []).map((url, i) => ({
      name: `Video ${i + 1}`,
      url
    }))
  ];

  const sellerEvidence: EvidenceFile[] =
    dispute?.sellerEvidence?.map((url: any, i: number) => ({
      name: `Evidence ${i + 1}`,
      url
    })) ?? [];

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md mt-3">
      <h2 className="text-lg font-semibold mb-6">Dispute</h2>

      <div className="bg-[#FDF2F8] border-l-[6px] border-[#C026D3] rounded-xl p-6 mb-6">
        <div className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mb-4">
          <Image src={SecurityUser} alt="buyer" width={20} height={20} />
          <span className="text-sm ml-1 font-medium">
            {dispute?.reporterName ?? "Buyer"}
          </span>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Dispute reason: </span>
          <em>{dispute?.description ?? dispute?.disputeReason ?? "—"}</em>
        </p>

        <EvidenceList
          evidence={buyerEvidence}
          onViewEvidence={onViewEvidence}
        />
      </div>

      {dispute?.sellerResponse && <div className="bg-gray-50 border-l-[6px] border-gray-400 rounded-xl p-6 mb-6">
        <div className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mb-4">
          <Image src={SecurityUser} alt="seller" width={20} height={20} />
          <span className="text-sm ml-1 font-medium">Seller</span>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Counter-evidence: </span>
          <em>{dispute?.sellerResponse}</em>
        </p>

        <EvidenceList
          evidence={sellerEvidence}
          onViewEvidence={onViewEvidence}
        />
      </div>}
    </div>
  );
}

