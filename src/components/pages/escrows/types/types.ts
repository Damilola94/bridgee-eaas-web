export type EscrowStatus =
  | "ongoing"
  | "pending_buyer"
  | "pending_funding"
  | "funded"
  | "escrow_disputed"
  | "escrow_refunded"
  | "escrow_cancelled";

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

