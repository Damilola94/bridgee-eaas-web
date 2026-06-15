import { type FC } from "react";

type StatusBadgeProps = {
  status?: string;
};

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-green-50 text-green-600",
  successful: "bg-green-50 text-green-600",
  pending: "bg-amber-50 text-amber-600",
  "awaiting shipment": "bg-amber-50 text-amber-600",
  intransit: "bg-blue-50 text-blue-600",
  "in transit": "bg-blue-50 text-blue-600",
  failed: "bg-rose-50 text-rose-600",
  disputed: "bg-rose-50 text-rose-600",
  reversed: "bg-gray-100 text-gray-600",
  "dispute resolved": "bg-gray-100 text-gray-600",
  draft: "bg-gray-100 text-gray-600",
};

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const key = (status || "").toLowerCase().trim();
  const styles = STATUS_STYLES[key] || "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${styles}`}
    >
      {status || "—"}
    </span>
  );
};

export default StatusBadge;