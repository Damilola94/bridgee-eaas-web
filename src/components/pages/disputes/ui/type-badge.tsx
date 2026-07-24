export function TypeBadge({ type }: { type: "Debit" | "Credit" }) {
  const isDebit = type === "Debit";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-lg text-xs font-bold ${
        isDebit ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
      }`}
    >
      {type}
    </span>
  );
}