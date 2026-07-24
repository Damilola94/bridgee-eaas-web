import React, { useRef } from "react";

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpInput({ length = 6, value, onChange }: OtpInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, digit: string) => {
    if (digit && !/^[0-9]$/.test(digit)) return;
    const next = [...value];
    next[i] = digit;
    onChange(next);
    if (digit && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          maxLength={1}
          inputMode="numeric"
          className="w-16 h-16 text-center text-xl border border-gray-200 rounded-lg focus:outline-none focus:border-[#A3195B]"
        />
      ))}
    </div>
  );
}