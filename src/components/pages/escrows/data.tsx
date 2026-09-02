import moment from "moment";
import { ColumnDef } from "../../common/DataTable";
import { formatCurrency } from "../../../utilities/general";
import TransactionStatus from "../wallets/ui/escrow-status-badge";
import { EscrowTransactionSummary } from "./types/types";

export const columns: ColumnDef<EscrowTransactionSummary>[] = [
  {
    header: "TRANSACTION ID",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">#{row.referenceNumber}</span>
    ),
    width: "1fr",
  },
  {
    header: "BUYER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">{row.buyerName}</span>
    ),
    width: "1.1fr",
  },
  {
    header: "SELLER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">
        {row.sellerName || "N/A"}{" "}
      </span>
    ),
    width: "1.1fr",
  },
  // {
  //   header: "ITEM",
  //   accessor: (row) => (
  //     <span className="flex items-center gap-1.5 text-[#101828]">
  //       {row.items[0]?.name}
  //       {row.items.length > 1 && (
  //         <span className="bg-pink-50 text-pink-700 text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
  //           + {row.items.length - 1} More
  //         </span>
  //       )}
  //     </span>
  //   ),
  //   width: "1.4fr",
  // },
  {
    header: "ESCROW AMOUNT",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">
        {formatCurrency(row.amount)}
      </span>
    ),
    width: "1.2fr",
  },
  {
    header: "START DATE",
    accessor: (row) => (
      <span className="text-[#101828]">
        {moment(row.createdDate).format("DD MMM YYYY")}
      </span>
    ),
    width: "0.9fr",
  },
  {
    header: "END DATE",
    accessor: (row) => (
      <span className="text-[#101828]">
        {row.createdDate
          ? moment(row.createdDate).format("DD MMM YYYY")
          : "---"}
      </span>
    ),
    width: "0.9fr",
  },
  {
    header: "STATUS",
    accessor: (row) => <TransactionStatus status={row.status} />,
    width: "1fr",
  },
];

