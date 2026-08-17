"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { useCookies } from "react-cookie";

import { RadioOption } from "./report-common/RadioOption";
import {
  REPORT_TYPES,
  FORMATS,
  REPORT_TYPE_PARAM,
  FORMAT_PARAM,
  MONTH_NAMES,
  type ReportType,
  type ReportFormat,
} from "./types/type";

export default function ReportsAnalyticsPage() {
  const [cookies] = useCookies(["data"]);

  const [reportType, setReportType] = useState<ReportType>(REPORT_TYPES[0]);
  const [format, setFormat] = useState<ReportFormat>(FORMATS[0]);

  const now = new Date();
  const [month, setMonth] = useState<number>(now.getMonth() + 1);
  const [year, setYear] = useState<number>(now.getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const yearOptions = Array.from({ length: 6 }, (_, i) => now.getFullYear() - i);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    const params = new URLSearchParams({
      ReportType: REPORT_TYPE_PARAM[reportType],
      Format: FORMAT_PARAM[format],
      Month: String(month),
      Year: String(year),
    });

    try {
      const token = cookies?.data?.accessToken;

      if (!token) {
        throw new Error("You must be logged in to generate a report.");
      }

      const res = await fetch(
        `https://staging-api.usebridgee.com/escrow-service/api/v1/reports/generate?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        throw new Error(`Report generation failed (${res.status})`);
      }

      const blob = await res.blob();

      const extension =
        format === "Excel" ? "xlsx" : format === "PDF" ? "pdf" : "csv";
      const fileName = `${REPORT_TYPE_PARAM[reportType]}_${year}-${String(month).padStart(2, "0")}.${extension}`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 font-outfit flex justify-center">
      <div className="bg-white rounded-[20px] border border-primary-500/40 shadow-sm p-8 max-w-xl space-y-6 ">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Generate Report
          </h2>
          <p className="text-sm text-gray-500">
            Download platform performance reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
          >
            Monthly <ChevronDown className="h-4 w-4" />
          </button>
          <span className="text-gray-300">—</span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMonthPicker((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700"
            >
              {MONTH_NAMES[month - 1]} <Calendar className="h-4 w-4" />
            </button>
            {showMonthPicker && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto w-40">
                {MONTH_NAMES.map((name, i) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setMonth(i + 1);
                      setShowMonthPicker(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowYearPicker((v) => !v)}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700"
            >
              {year} <Calendar className="h-4 w-4" />
            </button>
            {showYearPicker && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-28">
                {yearOptions.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      setYear(y);
                      setShowYearPicker(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Report type</p>
            {REPORT_TYPES.map((type) => (
              <RadioOption
                key={type}
                label={type}
                selected={reportType === type}
                onSelect={() => setReportType(type)}
              />
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">Format</p>
            {FORMATS.map((f) => (
              <RadioOption
                key={f}
                label={f}
                selected={format === f}
                onSelect={() => setFormat(f)}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-[#A3195B] hover:bg-[#8a1650] disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors"
        >
          {isGenerating ? "Generating..." : "Generate & Download"}
        </button>
      </div>
    </div>
  );
}