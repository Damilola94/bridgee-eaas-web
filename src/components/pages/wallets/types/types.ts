export type WalletStats = {
  walletBalance: number;
  pendingSettlements: number;
  totalCredits: number;
  totalDebits: number;
  currency: string;
};

export type WalletTransaction = {
  id: string;
  transactionId: string;
  customerName: string;
  amount: number;
  source: string;
  fees: number;
  type: string;
  date: string;
  status: string;
};