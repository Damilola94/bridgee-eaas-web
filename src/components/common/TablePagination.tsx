"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  pageNumber,
  pageSize,
  totalElements,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(Math.ceil(totalElements / pageSize), 1);
  const rangeStart = totalElements === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const rangeEnd = Math.min(pageNumber * pageSize, totalElements);

  const pageNumbers = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) pages.push(i);
    if (totalPages > 4) pages.push("ellipsis");
    if (totalPages > 3) pages.push(totalPages);
    return pages;
  }, [totalPages]);

  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-900">{rangeStart}</span> to{" "}
        <span className="font-semibold text-gray-900">{rangeEnd}</span> of{" "}
        <span className="font-semibold text-gray-900">{totalElements}</span> Entries
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(pageNumber - 1, 1))}
          disabled={pageNumber === 1}
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-1 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                pageNumber === p
                  ? "bg-pink-50 text-pink-700 border border-pink-200"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(pageNumber + 1, totalPages))}
          disabled={pageNumber === totalPages}
          className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}