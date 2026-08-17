import React from "react";
import { ChevronDown } from "lucide-react";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function PhoneInput({ value, onChange, placeholder }: PhoneInputProps) {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 px-3 py-3.5 border-r border-gray-200 bg-white text-sm text-gray-500">
        🇳🇬 <ChevronDown size={14} />
      </div>
      <input
        type="tel"
        value={value}
        maxLength={11}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3.5 text-sm focus:outline-none placeholder:text-gray-300"
      />
    </div>
  );
}