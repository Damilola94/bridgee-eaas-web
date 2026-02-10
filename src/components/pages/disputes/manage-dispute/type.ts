export interface ApiDispute {
  id: string;
  invoiceName?: string;
  orderReference?: string;
  orderTotalAmount?: number;
  disputeReason?: string;
  customReason?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  reporterName?: string;
  sellerPhone?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  sellerId?: string;
  sellerBusinessName?: string;
  pictureProofs?: string[];
  videoProofs?: string[];
  sellerResponse?: string;
  sellerResponseDate?: string;
  sellerEvidence?: string[];
  adminComments?: string;
  resolvedDate?: string;
  resolvedInBuyerFavor?: boolean;
  orderItems?: Array<{
    name?: string;
    quantity?: number;
    unitPrice?: string;
    total?: string;
  }>;
}
