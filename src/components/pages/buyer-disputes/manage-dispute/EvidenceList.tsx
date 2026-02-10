/* eslint-disable react/jsx-no-undef */
import Image, { StaticImageData } from "next/image";

type EvidenceFile = {
  name: string;
  url: string | StaticImageData;
};

export function EvidenceList({
  evidence,
  onViewEvidence
}: {
  evidence: EvidenceFile[];
  onViewEvidence?: (url: string) => void;
}) {

  if (evidence.length === 0) {
    return <p className="text-sm text-gray-500">No evidence attached</p>;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4">
      {evidence.map((file, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md overflow-hidden border">
            <Image
              src={String(file.url)}
              alt={file.name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>

          <button
            onClick={() => onViewEvidence?.(String(file.url))}
            className="underline text-sm text-gray-700"
            type="button"
          >
            {file.name}
          </button>
        </div>
      ))}

      {onViewEvidence && (
        <button
          onClick={() => onViewEvidence(evidence[0].url as string)}
          className="text-sm text-[#C026D3] underline"
        >
          View evidence
        </button>
      )}
    </div>
  );
}
