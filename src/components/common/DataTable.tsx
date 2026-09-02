import { ReactNode } from "react";

export type ColumnDef<T> = {
  header: string;
  accessor: (row: T) => ReactNode;
  width?: string;
};

type Props<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
};

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  onRowClick,
}: Props<T>) {
  const template = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 1200 }}>
        <div
          className="grid border-y border-[#EAEAEA] bg-[#F8F9FC] h-16 items-center"
          style={{ gridTemplateColumns: template }}
        >
          {columns.map((column) => (
            <div
              key={column.header}
              className="text-[15px] font-semibold uppercase text-[#667085]"
            >
              {column.header}
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="py-16 text-center text-gray-500">Loading...</div>
        )}

        {/* Empty */}
        {!isLoading && data.length === 0 && (
          <div className="py-16 text-center text-gray-500">{emptyMessage}</div>
        )}

        {/* Rows */}
        {!isLoading &&
          data.map((row) => (
            <div
              key={row.id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`grid px-6 h-[72px] items-center border-b border-[#ECECEC] bg-white ${
                onRowClick ? "hover:bg-gray-50 cursor-pointer" : ""
              }`}
              style={{ gridTemplateColumns: template }}
            >
              {columns.map((column, i) => (
                <div key={i}>{column.accessor(row)}</div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

