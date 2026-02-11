// app/.../DisputeDetails.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

import Button from "../../../inputs/Button";
import SecurityUser from '../../../../assets/svgs/security-user.svg';

type EvidenceFile = {
  name: string;
  url: string | StaticImageData;
};

type ApiDispute = {
  id: string;
  disputeReason?: string;
  description?: string;
  pictureProofs?: string[];
  videoProofs?: string[];
  reporterName?: string;
  reporterEmail?: string;
  status?: string;
  createdAt?: string;
};

interface Props {
  dispute: ApiDispute;
  onAccept?: () => void;
  onReject?: () => void;
  onViewEvidence?: (url: string) => void;
}

export default function DisputeDetails({
  dispute,
  onAccept,
  onReject,
  onViewEvidence
}: Props) {
  const evidence: EvidenceFile[] = [
    ...(dispute?.pictureProofs ?? []).map((url, i) => ({ name: `Picture ${i + 1}`, url })),
    ...(dispute?.videoProofs ?? []).map((url, i) => ({ name: `Video ${i + 1}`, url }))
  ];

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md my-5">
      <h2 className="text-2xl font-semibold mb-6">Dispute</h2>

      <div className="bg-[#EDE8FF] border-l-[8px] border-primary rounded-xl p-6">
        <div className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mb-4">
          <Image src={SecurityUser} alt="security-user" width={20} height={20} />
          <span className="text-sm font- ml-1">{dispute?.reporterName ?? "Buyer"}</span>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Dispute reason: </span>
          <em>{dispute?.description ?? dispute?.disputeReason ?? "—"}</em>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          {evidence?.length > 0 ? (
            evidence.map((file, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md overflow-hidden border">
                  <Image src={String(file.url)} alt={file.name} width={40} height={40} className="object-cover" />
                </div>
                <button
                  onClick={() => onViewEvidence && onViewEvidence(String(file.url))}
                  className="underline text-sm text-gray-700"
                  type="button"
                >
                  {file.name}
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No evidence attached</p>
          )}
          {onViewEvidence && evidence.length > 0 && (
            <button onClick={() => onViewEvidence(evidence[0].url as string)} className="text-sm text-[#C026D3] underline">
              View evidence
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button
          border
          borderColor="border-red-600"
          fontSize="text-sm"
          bgColor="bg-transparent"
          textColor="text-red-600"
          paddingX="px-3"
          paddingY="py-1"
          onClick={onReject}
        >
          ✖ Reject
        </Button>

        <Button
          border
          borderColor="border-success"
          fontSize="text-sm"
          bgColor="bg-transparent"
          textColor="text-success"
          paddingX="px-3"
          paddingY="py-1"
          onClick={onAccept}
        >
          ✓ Accept
        </Button>
      </div>
    </div>
  );
}
