export type EscrowStatus =
  | "ongoing"
  | "pending_buyer"
  | "pending_funding"
  | "funded"
  | "escrow_disputed"
  | "escrow_refunded"
  | "escrow_cancelled";

export const ESCROW_STATUSES: EscrowStatus[] = [
  "ongoing",
  "pending_buyer",
  "pending_funding",
  "funded",
  "escrow_disputed",
  "escrow_refunded",
  "escrow_cancelled",
];

export type EscrowProductItem = {
  name: string;
  quantity: number;
  amount: number;
};

export type EscrowTimelineEvent = {
  id: string;
  label: string;
  date: string;
  state: "success" | "error" | "pending";
};

export type EscrowTransaction = {
  id: string;
  seller: {
    name: string;
    phone: string;
    email: string;
  };
  buyer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: EscrowProductItem[];
  escrowAmount: number;
  startDate: string;
  endDate: string | null;
  status: EscrowStatus;
  timeline: EscrowTimelineEvent[];
};

export interface EscrowTransactionDetailDTO {
  id: string;
  reference: string;
  sellerName: string;
  sellerAddress: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;
  items: {
    name: string;
    quantity: number;
    unitPrice: string;
    weightKg: number;
    total: string;
  }[];
  subtotal: string;
  deliveryFee: string;
  escrowFee: string;
  total: string;
  status: string;
  paymentLink: string;
  description: string;
}

function mapStatus(raw: string): EscrowStatus {
  const match = ESCROW_STATUSES.find(
    (s) => s.toLowerCase() === raw.toLowerCase(),
  );
  // Falls back to the raw value cast — surfaces mismatches loudly in the UI
  // instead of silently swallowing an unrecognized status from the API.
  return match ?? (raw as EscrowStatus);
}

export function mapDetailDtoToTransaction(
  dto: EscrowTransactionDetailDTO,
): EscrowTransaction {
  return {
    id: dto.id,
    status: mapStatus(dto.status),
    seller: {
      name: dto.sellerName,
      // Not returned by the API today — confirm with backend whether
      // these should be added to the response or dropped from the UI.
      phone: "",
      email: "",
    },
    buyer: {
      name: dto.buyerName,
      phone: dto.buyerPhone,
      email: dto.buyerEmail,
      address: dto.buyerAddress,
    },
    items: dto.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      amount: parseFloat(item.total),
    })),
    escrowAmount: parseFloat(dto.total),
    // The DTO has no date fields at all — nothing to map these from yet.
    // Confirm with backend whether these come from a different field
    // (e.g. createdAt/completedAt) that isn't in the sample response.
    startDate: "",
    endDate: null,
    // No timeline in this response yet — needs its own source/endpoint.
    timeline: [],
  };
}