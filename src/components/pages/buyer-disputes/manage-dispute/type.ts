export interface ApiDispute {
  id: string;

  /** Order / Invoice */
  orderReference?: string;
  invoiceName?: string;
  escrowOrderId?: string;
  orderTotalAmount?: number;
  orderItems?: Array<{
    name?: string;
    quantity?: number;
    unitPrice?: string;
    total?: string;
  }>;

  /** Dispute Details */
  disputeReason?: string;
  customReason?: string;
  description?: string;
  status?: string;
  sellerBusinessName?: string;

  /** Dates */
  createdAt: string;
  resolvedDate?: string;
  sellerResponseDate?: string;
  updatedAt?: string;

  /** Reporter (Buyer / Initiator) */
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;

  sellerName?: string;
  sellerPhone?: string;
  buyerName?: string;
  buyerPhone?: string;

  /** Seller (NEW – grouped) */
  seller?: {
    id?: string;
    businessName?: string;
    name?: string;
    email?: string;
    sellerName?: string;
    phone?: string;
  };

  /** Evidence */
  pictureProofs?: string[];
  videoProofs?: string[];
  sellerEvidence?: string[];

  /** Seller Response */
  sellerResponse?: string;

  /** Admin */
  adminComments?: string;

  resolvedInBuyerFavor?: boolean;
}

export interface FinalDecisionCardProps {
  adminName: string;
  decision?: string;
  decidedAt?: string;
  status?: string;
  onInitiateReturn?: () => void;
}