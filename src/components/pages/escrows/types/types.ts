// =========================
// ESCROW STATUS
// =========================

export type EscrowStatus =
  | "AwaitingPayment"
  | "Confirmed"
  | "Delivered"
  | "Completed"
  | "PayoutFailed"
  | "Cancelled";

export const ESCROW_STATUSES: EscrowStatus[] = [
  "AwaitingPayment",
  "Confirmed",
  "Delivered",
  "Completed",
  "PayoutFailed",
  "Cancelled",
];

export function mapStatus(raw: string): EscrowStatus {
  const match = ESCROW_STATUSES.find(
    (status) => status.toLowerCase() === raw?.toLowerCase(),
  );

  return match ?? "AwaitingPayment";
}


// =========================
// LIST ITEM TYPES
// =========================

export type EscrowProductItem = {
  name: string;
  quantity: number;
  amount: number;
};

export type EscrowTransaction = {
  id: string;

  seller: {
    name: string;
    phone: string;
    email: string;
    address: string;
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

export type EscrowTransactionSummary = {
  id: string;
  buyerName: string;
  sellerName: string;
  items: EscrowProductItem[];
  escrowAmount: string;
  buyerEmail: string;
  referenceNumber: string;
  amount: string;
  createdDate: string;
  status: EscrowStatus;
};

export type EscrowTransactionListMeta = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};


// =========================
// TIMELINE
// =========================

export type EscrowTimelineEvent = {
  id: string;
  label: string;
  date: string;
  state: "success" | "error" | "pending";
};


// =========================
// API DETAIL DTO
// =========================

export interface EscrowTransactionItemDTO {
  name: string;
  quantity: number;
  unitPrice: string;
  weightKg: number | null;
  total: string;
}

export interface EscrowTransactionDetailDTO {
  id: string;
  reference: string;

  sellerName: string;
  sellerAddress: string;

  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerAddress: string;

  items: EscrowTransactionItemDTO[];

  subtotal: string;
  deliveryFee: string;
  escrowFee: string;
  total: string;

  status: string;

  paymentLink: string;
  description: string;
}


// =========================
// UI TYPES
// =========================

export interface TransactionSeller {
  name: string;
  address: string;
}

export interface TransactionBuyer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface TransactionItem {
  name: string;
  quantity: number;
  unitPrice: string;
  weightKg: number | null;
  total: string;
}

export interface MappedTransaction {
  id: string;
  reference: string;

  seller: TransactionSeller;
  buyer: TransactionBuyer;

  items: TransactionItem[];

  subtotal: string;
  deliveryFee: string;
  escrowFee: string;
  total: string;

  status: EscrowStatus;

  paymentLink: string;
  description: string;
}


// =========================
// MAPPER
// =========================

export function mapDetailDtoToTransaction(
  dto: EscrowTransactionDetailDTO,
): MappedTransaction {
  return {
    id: dto.id,

    reference: dto.reference,

    seller: {
      name: dto.sellerName,
      address: dto.sellerAddress || "No address provided",
    },

    buyer: {
      name: dto.buyerName,
      email: dto.buyerEmail,
      phone: dto.buyerPhone,
      address: dto.buyerAddress || "No address provided",
    },

    items: dto.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      weightKg: item.weightKg,
      total: item.total,
    })),

    subtotal: dto.subtotal.startsWith("NGN")
      ? dto.subtotal
      : `NGN ${dto.subtotal}`,

    deliveryFee: dto.deliveryFee,

    escrowFee: dto.escrowFee,

    total: dto.total,

    status: mapStatus(dto.status),

    paymentLink: dto.paymentLink,

    description: dto.description,
  };
}