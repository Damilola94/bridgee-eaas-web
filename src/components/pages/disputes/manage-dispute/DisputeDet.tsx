"use client";

import Image, { StaticImageData } from "next/image";

import Button from "../../../inputs/Button";

interface EvidenceFile {
  name: string;
    url: string | StaticImageData;
}

interface DisputeProps {
  userType: "Buyer" | "Seller";
  reason: string;
  evidence: EvidenceFile[];
  onAccept: () => void;
  onReject: () => void;
  onViewEvidence?: () => void;
}

export default function Dispute({
  userType,
  reason,
  evidence,
  onAccept,
  onReject,
  onViewEvidence
}: DisputeProps) {
  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md my-5">
      <h2 className="text-2xl font-semibold mb-6">Dispute</h2>

      <div className="bg-[#EDE8FF] border-l-[8px] border-[#3B2ACC] rounded-xl p-6">
        <div className="inline-flex items-center bg-white px-3 py-1 rounded-full shadow-sm mb-4">
          <span className="w-2 h-2 bg-primary rounded-full mr-2" />
          <span className="text-sm font-medium">{userType}</span>
        </div>

        <p className="text-sm text-gray-700">
          <span className="font-semibold">Dispute reason: </span>
          <em>{reason}</em>
        </p>

        <div className="mt-4 flex items-center gap-4">
          {evidence.map((file, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={file.url}
                alt={file.name}
                width={40}
                height={40}
                className="rounded-md object-cover border"
              />
              <a
                // href={file.url}
                target="_blank"
                className="underline text-sm text-gray-700"
              >
                {file.name}
              </a>
            </div>
          ))}

          <button
            onClick={onViewEvidence}
            className="text-sm text-[#C026D3] underline"
          >
            View evidence
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <Button
          border
          borderColor="border-red-600"
          fontSize="text-sm"
          bgColor="bg-transparent"
          textColor="text-success"
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
