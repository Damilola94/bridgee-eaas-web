"use client";

import { useState } from "react";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsSaveButton } from "./ui/settings-field";

const THEME_COLORS = ["#1B1749", "#A3195B", "#22C55E", "#34D399"];

export default function PersonalizationPage() {
  const [logoFileName, setLogoFileName] = useState("");
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[1]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ logoFileName, selectedColor });
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-primary-500/40 shadow-sm p-8 flex-1 space-y-6 max-w-xl">
        <h2 className="text-base font-semibold text-gray-900">Personalization</h2>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Company logo</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400">
              {logoFileName || "---"}
            </div>
            <label className="px-5 py-3 border border-pink-700 text-pink-700 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
              Select File
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Theme color</label>
          <div className="flex items-center gap-3">
            {THEME_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-9 h-9 rounded-full transition-transform ${
                  selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-105" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <SettingsSaveButton />
      </form>
    </div>
  );
}