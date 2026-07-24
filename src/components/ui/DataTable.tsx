import { ReactNode } from "react";

export type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => ReactNode;
  width?: string; // fr unit, e.g. "1.3fr"
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found.",
  onRowClick,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}) {
  const gridTemplate = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div className="overflow-x-auto font-outfit">
      <div style={{ minWidth: `${columns.length * 130}px` }}>
        <div
          className="grid gap-4 px-6 py-3 text-xs font-medium text-gray-400 tracking-wide border-b border-gray-100 bg-gray-50/60 rounded-t-lg"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {columns.map((col) => (
            <div key={col.header}>{col.header}</div>
          ))}
        </div>

        {isLoading && (
          <div className="py-10 text-center text-sm text-gray-500">Loading...</div>
        )}

        {!isLoading && data.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">{emptyMessage}</div>
        )}

        {!isLoading &&
          data.map((row) => {
            const rowClasses =
              "grid gap-4 px-6 py-4 text-sm text-left border-b border-gray-50 w-full items-center" +
              (onRowClick ? " hover:bg-gray-50 cursor-pointer" : "");

            return onRowClick ? (
              <button
                key={row.id}
                type="button"
                onClick={() => onRowClick(row)}
                className={rowClasses}
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {columns.map((col, idx) => (
                  <div key={idx}>{col.accessor(row)}</div>
                ))}
              </button>
            ) : (
              <div key={row.id} className={rowClasses} style={{ gridTemplateColumns: gridTemplate }}>
                {columns.map((col, idx) => (
                  <div key={idx}>{col.accessor(row)}</div>
                ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}