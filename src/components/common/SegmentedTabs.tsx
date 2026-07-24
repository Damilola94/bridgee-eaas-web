"use client";

interface SegmentedTabsProps<T extends string> {
  tabs: { value: T; label: string }[];
  activeValue: T;
  onChange: (value: T) => void;
}

export function SegmentedTabs<T extends string>({
  tabs,
  activeValue,
  onChange,
}: SegmentedTabsProps<T>) {
  return (
    <div className="flex items-center gap-1 flex-wrap bg-gray-50 p-1 rounded-xl">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeValue === tab.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}