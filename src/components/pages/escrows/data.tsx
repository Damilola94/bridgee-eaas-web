import moment from "moment";
import { ColumnDef } from "../../common/DataTable";
import { formatCurrency } from "../../../utilities/general";
import TransactionStatus from "../wallets/ui/escrow-status-badge";
import { EscrowTransaction } from "./types/types";

export const MOCK_ESCROW_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "1253535",
    seller: {
      name: "Guy Hawkins",
      phone: "Guy Hawkins",
      email: "guyhawkins@gmail.com",
    },
    buyer: {
      name: "Guy Hawkins",
      phone: "Guy Hawkins",
      email: "guyhawkins@gmail.com",
      address: "25, Williams Street, Lekki Phase 1 Lagos State",
    },
    items: [
      { name: "IPhone 15 Pro", quantity: 1, amount: 2500000 },
      { name: "MacBook Air", quantity: 1, amount: 1500000 },
      { name: "AirPods Pro", quantity: 1, amount: 250000 },
    ],
    escrowAmount: 2500000,
    startDate: "2026-06-08",
    endDate: null,
    status: "ongoing",
    timeline: [
      { id: "1", label: "Escrow created.", date: "2026-04-01T12:00:00", state: "success" },
      { id: "2", label: "Escrow funded", date: "2026-04-01T12:00:00", state: "success" },
    ],
  },
  {
    id: "1253536",
    seller: {
      name: "Darrell Steward",
      phone: "Darrell Steward",
      email: "darrellsteward@gmail.com",
    },
    buyer: {
      name: "Darrell Steward",
      phone: "Darrell Steward",
      email: "darrellsteward@gmail.com",
      address: "12, Admiralty Way, Lekki Phase 1 Lagos State",
    },
    items: [{ name: "MacBook Air", quantity: 1, amount: 1500000 }],
    escrowAmount: 1500000,
    startDate: "2026-06-08",
    endDate: null,
    status: "pending_buyer",
    timeline: [
      { id: "1", label: "Escrow created.", date: "2026-04-01T12:00:00", state: "success" },
    ],
  },
  {
    id: "1253537",
    seller: {
      name: "Floyd Miles",
      phone: "Floyd Miles",
      email: "floydmiles@gmail.com",
    },
    buyer: {
      name: "Floyd Miles",
      phone: "Floyd Miles",
      email: "floydmiles@gmail.com",
      address: "8, Admiralty Road, Lekki Phase 1 Lagos State",
    },
    items: [{ name: "Toyota Camry 2015", quantity: 1, amount: 18500000 }],
    escrowAmount: 18500000,
    startDate: "2026-06-08",
    endDate: null,
    status: "pending_funding",
    timeline: [
      { id: "1", label: "Escrow created.", date: "2026-04-01T12:00:00", state: "success" },
    ],
  },
  {
    id: "1253538",
    seller: {
      name: "Albert Flores",
      phone: "Albert Flores",
      email: "albertflores@gmail.com",
    },
    buyer: {
      name: "Albert Flores",
      phone: "Albert Flores",
      email: "albertflores@gmail.com",
      address: "3, Marina Street, Lagos Island Lagos State",
    },
    items: [{ name: "Wedding Dress", quantity: 1, amount: 1500000 }],
    escrowAmount: 1500000,
    startDate: "2026-06-08",
    endDate: "2026-06-10",
    status: "funded",
    timeline: [
      { id: "1", label: "Escrow created.", date: "2026-04-01T12:00:00", state: "success" },
      { id: "2", label: "Escrow funded", date: "2026-04-01T12:00:00", state: "success" },
    ],
  },
];

export const columns: ColumnDef<EscrowTransaction>[] = [
  {
    header: "TRANSACTION ID",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">#{row.id}</span>
    ),
    width: "1fr",
  },
  {
    header: "BUYER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">{row.buyer.name}</span>
    ),
    width: "1.1fr",
  },
  {
    header: "SELLER NAME",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">{row.seller.name}</span>
    ),
    width: "1.1fr",
  },
  {
    header: "ITEM",
    accessor: (row) => (
      <span className="flex items-center gap-1.5 text-[#101828]">
        {row.items[0]?.name}
        {row.items.length > 1 && (
          <span className="bg-pink-50 text-pink-700 text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap">
            + {row.items.length - 1} More
          </span>
        )}
      </span>
    ),
    width: "1.4fr",
  },
  {
    header: "ESCROW AMOUNT",
    accessor: (row) => (
      <span className="font-medium text-[#101828]">
        {formatCurrency(row.escrowAmount)}
      </span>
    ),
    width: "1.2fr",
  },
  {
    header: "START DATE",
    accessor: (row) => (
      <span className="text-[#101828]">
        {moment(row.startDate).format("DD MMM YYYY")}
      </span>
    ),
    width: "0.9fr",
  },
  {
    header: "END DATE",
    accessor: (row) => (
      <span className="text-[#101828]">
        {row.endDate ? moment(row.endDate).format("DD MMM YYYY") : "---"}
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