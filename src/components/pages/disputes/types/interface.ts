export type DisputeStatus =
  | "pending"
  | "under_review"
  | "escalated"
  | "resolved";

export type DsputeTimelineEvent = {
  id: string;
  label: string;
  date: string;
  state: "success" | "error" | "pending";
};
export interface DisputeStatsDTO {
  totalDisputes: number;
  pendingDisputes: number;
  underReviewDisputes: number;
  escalatedDisputes: number;
  resolvedDisputes: number;
}

export interface DisputeDetailDTO {
  id: string;
  escrowOrderId: string;
  orderReference: string;
  orderTotalAmount: number;
  disputeReason: string;
  customReason: string;
  description: string;
  status: string;
  createdAt: string;
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  pictureProofs: string[];
  videoProofs: string[];
  sellerResponse: string;
  sellerResponseDate: string;
  sellerEvidence: string[];
  adminComments: string;
  resolvedDate: string;
  resolvedInBuyerFavor: boolean;
}