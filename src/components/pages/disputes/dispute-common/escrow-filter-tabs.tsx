import { DisputeStatus } from "../types/types";

const FILTER_TABS: { value: DisputeStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "resolved", label: "Resolved" },
];

export function DisputeFilterTabs({
  activeTab,
  onChange,
}: {
  activeTab: DisputeStatus | "all";
  onChange: (tab: DisputeStatus | "all") => void;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap bg-gray-50 p-1 rounded-xl">
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`px-3.5 ff-bold py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === tab.value
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