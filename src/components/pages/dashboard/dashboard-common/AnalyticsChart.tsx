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
import { Calendar, ChevronDown } from 'lucide-react';

const analyticsData = [
  { label: 'Week 1', amount: 50000, transactionCount: 15 },
  { label: 'Week 2', amount: 100000, transactionCount: 40 },
  { label: 'Week 3', amount: 160000, transactionCount: 35 },
  { label: 'Week 4', amount: 120000, transactionCount: 20 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
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
        January - {label}
      </p>

      <p className="text-gray-700">
        Amount:{' '}
        <span className="font-semibold">
          NGN {point.amount.toLocaleString()}
        </span>
      </p>

      <p className="text-gray-700">
        No of transactions:{' '}
        <span className="font-semibold">
          {point.transactionCount}
        </span>
      </p>
    </div>
  );
}

export default function AnalyticsChart() {
  return (
    <div className="bg-white rounded-2xl border-2 border-blue-500 shadow-sm p-6 h-full">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <span className="text-lg font-medium text-gray-900 ff-bold">
          Analytics
        </span>

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

      <p className="text-xs text-gray-500 mb-4">
        01 - 30 Sept, 2024
      </p>

      <div className="h-72 border-2 border-blue-400 rounded-lg p-4 bg-blue-50">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={analyticsData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />

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
              tickFormatter={(value:any) =>
                value === 0 ? '0K' : `${value / 1000}K`
              }
            />

            <Tooltip content={CustomTooltip} />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#A3195B"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: '#A3195B',
                strokeWidth: 0,
              }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
