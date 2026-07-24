"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative w-full max-w-[280px] ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-900"
      />
    </div>
  );
}