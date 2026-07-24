import { ColumnDef } from "../../common/DataTable";
import { formatCurrency } from "../../../utilities/general";
import moment from "moment";
import TransactionStatus from "../wallets/ui/escrow-status-badge";
import { TypeBadge } from "../wallets/ui/type-badge";

export type WalletTransaction = {
  id: string;
  customerName: string;
  amount: number;
  source: "Escrow" | "Wallet";
  fees: number;
  type: "Debit" | "Credit";
  dateTime: string;
  status: string;
};

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: "1253535", customerName: "Guy Hawkins", amount: 2500000, source: "Escrow", fees: 500, type: "Debit", dateTime: "2026-06-08T21:45:00", status: "Pending" },
  { id: "1253536", customerName: "Darrell Steward", amount: 1500000, source: "Wallet", fees: 500, type: "Credit", dateTime: "2026-06-08T21:45:00", status: "Pending" },
  { id: "1253537", customerName: "Floyd Miles", amount: 18500000, source: "Escrow", fees: 500, type: "Credit", dateTime: "2026-06-08T21:45:00", status: "Pending" },
  { id: "1253538", customerName: "Albert Flores", amount: 1500000, source: "Wallet", fees: 500, type: "Debit", dateTime: "2026-06-08T21:45:00", status: "Successful" },
  { id: "1253539", customerName: "Darlene Robertson", amount: 2500000, source: "Escrow", fees: 500, type: "Credit", dateTime: "2026-06-08T21:45:00", status: "Successful" },
];


export const columns: ColumnDef<WalletTransaction>[] = [
  { header: "Transaction ID", accessor: (r) => <span className="font-medium text-gray-900">#{r.id}</span>, width: "1fr" },
  { header: "Customer Name", accessor: (r) => <span className="text-gray-600">{r.customerName}</span>, width: "1.1fr" },
  { header: "Amount", accessor: (r) => <span className="text-gray-600">{formatCurrency(r.amount)}</span>, width: "1.1fr" },
  { header: "Source", accessor: (r) => <span className="text-gray-600">{r.source}</span>, width: "0.8fr" },
  { header: "Fees", accessor: (r) => <span className="text-gray-600">{formatCurrency(r.fees)}</span>, width: "0.8fr" },
  { header: "Type", accessor: (r) => <TypeBadge type={r.type} />, width: "0.8fr" },
  { header: "Date & Time", accessor: (r) => <span className="text-gray-600">{moment(r.dateTime).format("DD MMM YYYY ; hh:mmA")}</span>, width: "1.3fr" },
  { header: "Status", accessor: (r) => <TransactionStatus status={r.status} />, width: "0.8fr" },
];