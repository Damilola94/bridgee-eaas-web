import React from 'react';
import { TransactionStatus } from '../dashboard-data';

const STATUS_STYLES: Record<TransactionStatus, { dot: string; text: string; bg: string }> = {
  Ongoing: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  'Pending On Buyer': { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  'Pending Funding': { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Funded: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  Disputed: { dot: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' },
  Refunded: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  Cancelled: { dot: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' },
};

interface StatusBadgeProps {
  status: TransactionStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}