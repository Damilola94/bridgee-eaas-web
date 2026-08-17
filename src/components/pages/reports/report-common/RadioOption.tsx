export function RadioOption({
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
        selected
          ? "border-pink-700 bg-pink-50 text-gray-900"
          : "border-gray-200 text-gray-700"
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