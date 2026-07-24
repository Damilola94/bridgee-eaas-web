import moment from "moment";
import { ColumnDef } from "../../common/DataTable";
import { formatCurrency } from "../../../utilities/general";
import TransactionStatus from "../wallets/ui/escrow-status-badge";

export type DisputeTransaction = {
  id: string;
  buyerName: string;
  sellerName?: string;
  amount: number;
  dateTime: string;
  status: string;
};

export const MOCK_DISPUTES: DisputeTransaction[] = [
  {
    id: "1253535",
    buyerName: "Guy Hawkins",
    sellerName: "Guy Hawkins",
    amount: 2500000,
    dateTime: "2026-06-08T21:45:00",
    status: "Pending",
  },
  {
    id: "1253536",
    buyerName: "Darrell Steward",
    sellerName: "Darrell Steward",
    amount: 1500000,
    dateTime: "2026-06-08T21:45:00",
    status: "Pending",
  },
  {
    id: "1253537",
    buyerName: "Floyd Miles",
    sellerName: "Floyd Miles",
    amount: 18500000,
    dateTime: "2026-06-08T21:45:00",
    status: "Pending",
  },
  {
    id: "1253538",
    buyerName: "Albert Flores",
    sellerName: "Albert Flores",
    amount: 1500000,
    dateTime: "2026-06-08T21:45:00",
    status: "Successful",
  },
  {
    id: "1253539",
    buyerName: "Darlene Robertson",
    sellerName: "Darlene Robertson",
    amount: 2500000,
    dateTime: "2026-06-08T21:45:00",
    status: "Successful",
  },
];

export const columns: ColumnDef<DisputeTransaction>[] = [
  {
    header: "BUYER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">
        {row.buyerName}
      </span>
    ),
    width: "1.3fr",
  },
  {
    header: "SELLER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">
        {row.sellerName}
      </span>
    ),
    width: "1.3fr",
  },
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
        {moment(row.dateTime).format("DD MMM YYYY")}
      </span>
    ),
    width: "0.9fr",
  },
  {
    header: "STATUS",
    accessor: (row) => (
      <TransactionStatus status={row.status} />
    ),
    width: "1fr",
  },
];