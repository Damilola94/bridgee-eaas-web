// Dummy data for the dashboard. Replace with real API-backed data
// once the endpoints are wired up — shapes are kept close to what
// the API is expected to return so swapping later is low-friction.

export type TransactionStatus =
  | 'AwaitingPayment'
  | 'Confirmed'
  | 'Delivered'
  | 'Completed'
  | 'PayoutFailed'
  | 'Cancelled';

export interface EscrowTransactionRow {
  id: string;
  transactionId: string;
  buyerName: string;
  sellerName: string;
  item: string;
  extraItemsCount?: number;
  escrowAmount: string;
  startDate: string;
  endDate: string;
  status: TransactionStatus;
}

export interface SummaryCard {
  key: string;
  label: string;
  value: string;
  variant: 'filled' | 'neutral' | 'success' | 'danger';
}

export interface AnalyticsPoint {
  label: string;
  amount: number;
  transactionCount: number;
}

export const transactionSummaryCards: SummaryCard[] = [
  {
    key: 'total',
    label: 'Total number of escrow transactions.',
    value: 'NGN 7,450',
    variant: 'filled',
  },
  {
    key: 'active',
    label: 'Active escrow transactions.',
    value: 'NGN 7,450',
    variant: 'neutral',
  },
  {
    key: 'completed',
    label: 'Completed escrow transactions.',
    value: 'NGN 7,450',
    variant: 'success',
  },
  {
    key: 'cancelled',
    label: 'Cancelled escrow transactions.',
    value: 'NGN 7,450',
    variant: 'danger',
  },
];

export const financialSummaryCards: SummaryCard[] = [
  {
    key: 'totalVolume',
    label: 'Total transaction volume.',
    value: 'NGN 128,400,000',
    variant: 'filled',
  },
  {
    key: 'inEscrow',
    label: 'Funds currently in escrow.',
    value: 'NGN 42,150,000',
    variant: 'neutral',
  },
  {
    key: 'released',
    label: 'Funds released to sellers.',
    value: 'NGN 79,800,000',
    variant: 'success',
  },
  {
    key: 'refunded',
    label: 'Funds refunded to buyers.',
    value: 'NGN 6,450,000',
    variant: 'danger',
  },
];

export const analyticsData: AnalyticsPoint[] = [
  { label: 'Week 1', amount: 40000, transactionCount: 12 },
  { label: 'Week 2', amount: 400000, transactionCount: 40 },
  { label: 'Week 3', amount: 160000, transactionCount: 55 },
  { label: 'Week 4', amount: 120000, transactionCount: 31 },
];

export const customerMetrics = {
  totalUsers: 100,
  totalBuyers: 40,
  totalSellers: 60,
};

export const escrowTransactions: EscrowTransactionRow[] = [
  {
    id: '1',
    transactionId: '#1253535',
    buyerName: 'Guy Hawkins',
    sellerName: 'Guy Hawkins',
    item: 'IPhone 15 Pro',
    extraItemsCount: 2,
    escrowAmount: 'NGN 2,500,000',
    startDate: '08 Jun 2026',
    endDate: '---',
    status: 'AwaitingPayment',
  },
  {
    id: '2',
    transactionId: '#1253535',
    buyerName: 'Darrell Steward',
    sellerName: 'Darrell Steward',
    item: 'MacBook Air',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '---',
    status: 'Confirmed',
  },
  {
    id: '3',
    transactionId: '#1253535',
    buyerName: 'Floyd Miles',
    sellerName: 'Floyd Miles',
    item: 'Toyota Camry 2015',
    escrowAmount: 'NGN 18,500,000',
    startDate: '08 Jun 2026',
    endDate: '---',
    status: 'Delivered',
  },
  {
    id: '4',
    transactionId: '#1253535',
    buyerName: 'Albert Flores',
    sellerName: 'Albert Flores',
    item: 'Wedding Dress',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '10 Jun 2026',
    status: 'Completed',
  },
  {
    id: '5',
    transactionId: '#1253535',
    buyerName: 'Esther Howard',
    sellerName: 'Esther Howard',
    item: 'MacBook Air',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '---',
    status: 'PayoutFailed',
  },
  {
    id: '6',
    transactionId: '#1253535',
    buyerName: 'Cody Fisher',
    sellerName: 'Cody Fisher',
    item: 'MacBook Air',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '10 Jun 2026',
    status: 'Completed',
  },
  {
    id: '7',
    transactionId: '#1253535',
    buyerName: 'Leslie Alexander',
    sellerName: 'Leslie Alexander',
    item: 'MacBook Air',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '10 Jun 2026',
    status: 'Cancelled',
  },
  {
    id: '8',
    transactionId: '#1253535',
    buyerName: 'Eleanor Pena',
    sellerName: 'Eleanor Pena',
    item: 'MacBook Air',
    escrowAmount: 'NGN 1,500,000',
    startDate: '08 Jun 2026',
    endDate: '---',
    status: 'AwaitingPayment',
  },
];