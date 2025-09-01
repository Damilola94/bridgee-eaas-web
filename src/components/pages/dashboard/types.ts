export interface SalesItem {
  id: string | number;
  recipientName: string;
  referenceNumber: string;
  amount: number;
  createdDate: string;
  paymentLink?: string | null;
  status: string;
}