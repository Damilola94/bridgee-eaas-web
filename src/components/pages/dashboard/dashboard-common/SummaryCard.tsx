import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import useGetQuery from '../../../../hooks/useGetQuery';
import { formatCurrency } from '../../../../utilities/general';

type Variant = 'filled' | 'neutral' | 'success' | 'danger';

type CardDef = {
  key: string;
  label: string;
  value: React.ReactNode;
  variant: Variant;
};

const VARIANT_STYLES: Record<
  Variant,
  {
    card: string;
    iconWrap: string;
    icon: string;
    value: string;
    label: string;
  }
> = {
  filled: {
    card: 'bg-[#A3195B] border-transparent',
    iconWrap: 'bg-white/20',
    icon: 'text-white',
    value: 'text-white',
    label: 'text-white/80',
  },
  neutral: {
    card: 'bg-white border-gray-200',
    iconWrap: 'bg-gray-100',
    icon: 'text-gray-700',
    value: 'text-textColor',
    label: 'text-gray-500',
  },
  success: {
    card: 'bg-white border-emerald-200',
    iconWrap: 'bg-emerald-50',
    icon: 'text-emerald-600',
    value: 'text-emerald-600',
    label: 'text-gray-500',
  },
  danger: {
    card: 'bg-white border-[#A3195B]/30',
    iconWrap: 'bg-[#A3195B]/10',
    icon: 'text-[#A3195B]',
    value: 'text-[#A3195B]',
    label: 'text-gray-500',
  },
};

type Tab = 'transaction' | 'financial';

export default function SummaryCards() {
  const [activeTab, setActiveTab] = useState<Tab>('transaction');

  const { data, status } = useGetQuery({
    service: 'escrow-service/api/v1',
    endpoint: 'dashboard',
    queryKey: ['escrow-dashboard-summary'],
    auth: true,
  });

  const summary = data?.isSuccess ? data.data : null;

  const transactionSummaryCards: CardDef[] = [
    {
      key: 'totalTransactions',
      label: 'Total Transactions',
      value: summary?.totalTransactions?.toLocaleString() ?? '—',
      variant: 'filled',
    },
    {
      key: 'activeTransactions',
      label: 'Active Transactions',
      value: summary?.activeTransactions?.toLocaleString() ?? '—',
      variant: 'neutral',
    },
    {
      key: 'completedTransactions',
      label: 'Completed Transactions',
      value: summary?.completedTransactions?.toLocaleString() ?? '—',
      variant: 'success',
    },
    {
      key: 'cancelledTransactions',
      label: 'Cancelled Transactions',
      value: summary?.cancelledTransactions?.toLocaleString() ?? '—',
      variant: 'danger',
    },
  ];

  const financialSummaryCards: CardDef[] = [
    {
      key: 'totalEscrowAmount',
      label: 'Total Escrow Amount',
      value: summary ? formatCurrency(summary.totalEscrowAmount) : '—',
      variant: 'filled',
    },
    {
      key: 'totalReleasedEscrow',
      label: 'Total Released Escrow',
      value: summary ? formatCurrency(summary.totalReleasedEscrow) : '—',
      variant: 'success',
    },
    {
      key: 'totalFundsRefunded',
      label: 'Total Funds Refunded',
      value: summary ? formatCurrency(summary.totalFundsRefunded) : '—',
      variant: 'neutral',
    },
    {
      key: 'totalPendingEscrowAmount',
      label: 'Total Pending Escrow',
      value: summary ? formatCurrency(summary.totalPendingEscrowAmount) : '—',
      variant: 'danger',
    },
  ];

  const cards =
    activeTab === 'transaction'
      ? transactionSummaryCards
      : financialSummaryCards;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
      <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('transaction')}
          className={`px-4 py-1.5 text-sm ff-bold rounded-md transition-colors ${
            activeTab === 'transaction'
              ? 'bg-white text-textColor shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Transaction Summary
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-1.5 text-sm ff-bold rounded-md transition-colors ${
            activeTab === 'financial'
              ? 'bg-white text-textColor shadow-sm'
              : 'text-gray-500'
          }`}
        >
          Financial Summary
        </button>
      </div>

      {status === 'loading' ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span className="text-gray-500">Loading summary...</span>
        </div>
      ) : status === 'error' || !summary ? (
        <div className="py-8 text-center text-sm text-red-500">
          Failed to load dashboard summary.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const style = VARIANT_STYLES[card.variant];

            return (
              <div
                key={card.key}
                className={`relative overflow-hidden rounded-xl border p-4 ${style.card}`}
              >
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${style.iconWrap}`}
                >
                  <Wallet size={16} className={style.icon} />
                </div>

                <p className={`mb-1 text-xs ff-regular ${style.label}`}>
                  {card.label}
                </p>

                <p className={`text-lg ff-bold ${style.value}`}>
                  {card.value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}