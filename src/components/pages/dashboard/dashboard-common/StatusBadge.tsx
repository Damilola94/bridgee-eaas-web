import React from 'react';
import { TransactionStatus } from '../dashboard-data';

const STATUS_STYLES: Record<TransactionStatus, { dot: string; text: string; bg: string }> = {
  AwaitingPayment: { dot: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
  Confirmed: { dot: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-50' },
  Delivered: { dot: 'bg-indigo-500', text: 'text-indigo-700', bg: 'bg-indigo-50' },
  Completed: { dot: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  PayoutFailed: { dot: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' },
  Cancelled: { dot: 'bg-rose-400', text: 'text-rose-600', bg: 'bg-rose-50' },
};

const STATUS_LABELS: Record<TransactionStatus, string> = {
  AwaitingPayment: 'Awaiting Payment',
  Confirmed: 'Confirmed',
  Delivered: 'Delivered',
  Completed: 'Completed',
  PayoutFailed: 'PayoutFailed',
  Cancelled: 'Cancelled',
};

const FALLBACK_STYLE = { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-100' };

interface StatusBadgeProps {
  status: TransactionStatus | string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status as TransactionStatus] ?? FALLBACK_STYLE;
  const label = STATUS_LABELS[status as TransactionStatus] ?? String(status ?? 'Unknown');

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
}