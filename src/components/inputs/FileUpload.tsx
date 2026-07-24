// components/inputs/FileUpload.tsx
import React, { useRef } from "react";
import { FileText } from "lucide-react";

interface FileUploadProps {
  label: string;
  required?: boolean;
  fileName?: string;
  onChange: (file: File | null) => void;
}

export default function FileUpload({
  label,
  required,
  fileName,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full mb-6">
      <label className="block text-sm font-medium text-textColor mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 border border-dashed border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400">
          {fileName ? (
            <>
              <FileText size={16} className="text-red-500 shrink-0" />
              <span className="text-textColor truncate">{fileName}</span>
            </>
          ) : (
            "---"
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border border-[#A3195B] text-[#A3195B] text-sm font-medium rounded-lg px-4 py-3 whitespace-nowrap"
        >
          Select File
        </button>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}