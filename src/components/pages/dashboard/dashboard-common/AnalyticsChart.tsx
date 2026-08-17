'use client';

import React from 'react';
import type { TooltipProps } from 'recharts';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Calendar, ChevronDown, Loader2 } from 'lucide-react';
import moment from 'moment';
import useGetQuery from '../../../../hooks/useGetQuery';

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const point = payload[0].payload as {
    amount: number;
    transactionCount: number;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 text-sm">
      <p className="flex items-center gap-1.5 text-gray-500 mb-1.5">
        <span className="w-2 h-2 rounded-full bg-[#A3195B]" />
        {label}
      </p>

      <p className="text-gray-700">
        Amount: <span className="font-semibold">NGN {point.amount.toLocaleString()}</span>
      </p>

      <p className="text-gray-700">
        No of transactions: <span className="font-semibold">{point.transactionCount}</span>
      </p>
    </div>
  );
}

export default function AnalyticsChart() {
  const { data, status } = useGetQuery({
    service: 'escrow-service/api/v1',
    endpoint: 'dashboard',
    extra: 'analytics',
    pQuery: { weeks: 11 },
    queryKey: ['escrow-analytics', 11],
    auth: true,
  });

  const analyticsData = data?.isSuccess
    ? data.data.map((point: { weekStart: string; amount: number; transactionCount: number }) => ({
        label: moment(point.weekStart).format('MMM D'),
        amount: point.amount,
        transactionCount: point.transactionCount,
      }))
    : [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <span className="text-lg font-medium text-gray-900 ff-bold">Analytics</span>

        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            Monthly <ChevronDown size={14} />
          </button>

          <span className="text-gray-400">—</span>

          <button
            type="button"
            className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            Month <Calendar size={14} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50"
          >
            Year <Calendar size={14} />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4">Last 11 weeks</p>

      <div className="h-72">
        {status === 'loading' ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            <span className="text-gray-500 text-sm">Loading analytics...</span>
          </div>
        ) : status === 'error' ? (
          <div className="h-full flex items-center justify-center text-red-500 text-sm">
            Failed to load analytics.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analyticsData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                tickFormatter={(value: any) => (value === 0 ? '0K' : `${value / 1000}K`)}
              />

              <Tooltip content={CustomTooltip} />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#A3195B"
                strokeWidth={2}
                dot={{ r: 4, fill: '#A3195B', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}