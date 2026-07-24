"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

function RadioOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border text-sm font-medium text-left transition-colors ${
        selected ? "border-pink-700 bg-pink-50 text-gray-900" : "border-gray-200 text-gray-700"
      }`}
    >
      <span
        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
          selected ? "border-pink-700" : "border-gray-300"
        }`}
      >
        {selected && <span className="w-2 h-2 rounded-full bg-pink-700" />}
      </span>
      {label}
    </button>
  );
}

const REPORT_TYPES = ["Escrow & wallet transactions", "Customers", "Disputes"] as const;
const FORMATS = ["PDF", "Excel", "csv"] as const;

export default function ReportsAnalyticsPage() {
  const [reportType, setReportType] = useState<string>(REPORT_TYPES[0]);
  const [format, setFormat] = useState<string>(FORMATS[0]);

  const handleGenerate = () => {
    console.log("Generating report", { reportType, format });
  };

  return (
    <div className="p-8 font-outfit flex justify-center">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-xl space-y-6 ">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Generate Report</h2>
          <p className="text-sm text-gray-500">Download platform performance reports.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
          >
            Monthly <ChevronDown className="h-4 w-4" />
          </button>
          <span className="text-gray-300">—</span>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500"
          >
            Month <Calendar className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500"
          >
            Year <Calendar className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Report type</p>
            {REPORT_TYPES.map((type) => (
              <RadioOption key={type} label={type} selected={reportType === type} onSelect={() => setReportType(type)} />
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">Format</p>
            {FORMATS.map((f) => (
              <RadioOption key={f} label={f} selected={format === f} onSelect={() => setFormat(f)} />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="w-full bg-[#A3195B] hover:bg-[#8a1650] text-white font-semibold py-3.5 rounded-lg transition-colors"
        >
          Generate & Download
        </button>
      </div>
    </div>
  );
}