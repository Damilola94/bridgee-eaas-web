import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { SummaryCard, financialSummaryCards, transactionSummaryCards } from '../dashboard-data';

const VARIANT_STYLES: Record<
  SummaryCard['variant'],
  { card: string; iconWrap: string; icon: string; value: string; label: string }
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

  const cards = activeTab === 'transaction' ? transactionSummaryCards : financialSummaryCards;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
      <div className="inline-flex items-center bg-gray-100 rounded-lg p-1 mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('transaction')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ff-bold ${
            activeTab === 'transaction' ? 'bg-white text-textColor shadow-sm' : 'text-gray-500'
          }`}
        >
          Transaction Summary
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('financial')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ff-bold ${
            activeTab === 'financial' ? 'bg-white text-textColor shadow-sm' : 'text-gray-500'
          }`}
        >
          Financial Summary
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => {
          const style = VARIANT_STYLES[card.variant];
          return (
            <div
              key={card.key}
              className={`relative overflow-hidden rounded-xl border p-4 ${style.card}`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 ${style.iconWrap}`}
              >
                <Wallet size={16} className={style.icon} />
              </div>
              <p className={`text-xs ff-regular mb-1 ${style.label}`}>{card.label}</p>
              <p className={`text-lg font-bold ff-bold ${style.value}`}>{card.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}