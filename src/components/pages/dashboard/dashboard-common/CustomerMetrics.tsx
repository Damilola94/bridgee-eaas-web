"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = {
  buyers: "#A3195B",
  sellers: "#22C55E",
  remainder: "#C7C2F5",
};

export default function CustomerMetrics() {
  const totalUsers = 100;
  const totalBuyers = 40;
  const totalSellers = 60;
  const remainder = Math.max(totalUsers - totalBuyers - totalSellers, 0);

  const data = [
    {
      name: "Total Buyers who use escrow.",
      value: totalBuyers,
      color: COLORS.buyers,
    },
    {
      name: "Total Seller who uses escrow.",
      value: totalSellers,
      color: COLORS.sellers,
    },
    ...(remainder > 0
      ? [{ name: "Other", value: remainder, color: COLORS.remainder }]
      : []),
  ];

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-6 h-full flex flex-col">
      <span className="self-start text-lg font-medium text-gray-900 mb-8 ff-bold">
        Customer Metrics
      </span>

      <div className="flex-1 flex items-center justify-center relative mb-6">
        <PieChart width={240} height={240}>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={80}
            outerRadius={110}
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => value}
            contentStyle={{
              borderRadius: 8,
              fontSize: 12,
              border: "1px solid #e5e7eb",
            }}
          />
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-5xl ff-bold font-bold text-gray-900">{totalUsers}</span>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        <MetricRow
          color="bg-[#C7C2F5]"
          label="Total Users who use escrow."
          value={totalUsers}
        />
        <MetricRow
          color="bg-[#A3195B]"
          label="Total Buyers who use escrow."
          value={totalBuyers}
        />
        <MetricRow
          color="bg-[#22C55E]"
          label="Total Seller who uses escrow."
          value={totalSellers}
        />
      </div>
    </div>
  );
}

function MetricRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between text-sm px-2 py-1.5">
      <span className="flex items-center gap-2 text-gray-700">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        {label}
      </span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}

