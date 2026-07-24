import React from "react";

interface RadioCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function RadioCard({ label, selected, onClick }: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 border rounded-xl px-4 py-3 text-left transition-colors ${
        selected
          ? "border-[#A3195B] bg-[#FDF0F6]"
          : "border-gray-200 bg-white"
      }`}
    >
      <span
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? "border-[#A3195B]" : "border-gray-300"
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-[#A3195B]" />}
      </span>
      <span className="text-sm text-textColor">{label}</span>
    </button>
  );
}