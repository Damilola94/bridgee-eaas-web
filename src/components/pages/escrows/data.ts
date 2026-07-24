import { EscrowTransaction } from "./types/types";

export const MOCK_ESCROW_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: "1253535",
    seller: {
      name: "Guy Hawkins",
      phone: "+234 801 234 5678",
      email: "guyhawkins@gmail.com",
    },
    buyer: {
      name: "Guy Hawkins",
      phone: "+234 801 234 5678",
      email: "guyhawkins@gmail.com",
      address: "25, Williams Street, Lekki Phase 1 Lagos State",
    },
    items: [
      { name: "IPhone 15 Pro", quantity: 1, amount: 2500000 },
      { name: "MacBook Air", quantity: 1, amount: 1500000 },
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
      phone: "+234 802 345 6789",
      email: "darrellsteward@gmail.com",
    },
    buyer: {
      name: "Darrell Steward",
      phone: "+234 802 345 6789",
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
      phone: "+234 803 456 7890",
      email: "floydmiles@gmail.com",
    },
    buyer: {
      name: "Floyd Miles",
      phone: "+234 803 456 7890",
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
      phone: "+234 804 567 8901",
      email: "albertflores@gmail.com",
    },
    buyer: {
      name: "Albert Flores",
      phone: "+234 804 567 8901",
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
  {
    id: "1253539",
    seller: {
      name: "Esther Howard",
      phone: "+234 805 678 9012",
      email: "estherhoward@gmail.com",
    },
    buyer: {
      name: "Esther Howard",
      phone: "+234 805 678 9012",
      email: "estherhoward@gmail.com",
      address: "45, Ozumba Mbadiwe, Victoria Island Lagos State",
    },
    items: [{ name: "MacBook Air", quantity: 1, amount: 1500000 }],
    escrowAmount: 1500000,
    startDate: "2026-06-08",
    endDate: null,
    status: "escrow_disputed",
    timeline: [
      { id: "1", label: "Escrow created.", date: "2026-04-01T12:00:00", state: "success" },
      { id: "2", label: "Escrow funded", date: "2026-04-01T12:00:00", state: "success" },
      { id: "3", label: "Dispute raised.", date: "2026-04-01T12:00:00", state: "pending" },
    ],
  },
];