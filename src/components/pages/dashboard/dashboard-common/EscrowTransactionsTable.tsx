import React from 'react';
import Link from 'next/link';
import { escrowTransactions } from '../dashboard-data';
import StatusBadge from './StatusBadge';

export default function EscrowTransactionsTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-gray-100 text-sm font-medium text-textColor px-3 py-1.5 rounded-lg ff-bold">
          Escrow Transactions
        </span>

        <Link href="/escrow-transactions">
          <span className="inline-flex items-center border border-[#A3195B] text-[#A3195B] text-sm font-medium px-4 py-1.5 rounded-lg cursor-pointer ff-bold">
            See More
          </span>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
              <th className="py-3 pr-4 font-medium">Transaction ID</th>
              <th className="py-3 pr-4 font-medium">Buyer Name</th>
              <th className="py-3 pr-4 font-medium">Seller Name</th>
              <th className="py-3 pr-4 font-medium">Item</th>
              <th className="py-3 pr-4 font-medium">Escrow Amount</th>
              <th className="py-3 pr-4 font-medium">Start Date</th>
              <th className="py-3 pr-4 font-medium">End Date</th>
              <th className="py-3 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {escrowTransactions.map((row) => (
              <tr key={row.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3.5 pr-4 text-gray-500">{row.transactionId}</td>
                <td className="py-3.5 pr-4 text-textColor">{row.buyerName}</td>
                <td className="py-3.5 pr-4 text-textColor">{row.sellerName}</td>
                <td className="py-3.5 pr-4 text-textColor">
                  <span className="flex items-center gap-2">
                    {row.item}
                    {!!row.extraItemsCount && (
                      <span className="bg-[#FDF0F6] text-[#A3195B] text-xs font-medium px-2 py-0.5 rounded-full">
                        + {row.extraItemsCount} More
                      </span>
                    )}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-textColor">{row.escrowAmount}</td>
                <td className="py-3.5 pr-4 text-gray-500">{row.startDate}</td>
                <td className="py-3.5 pr-4 text-gray-500">{row.endDate}</td>
                <td className="py-3.5 pr-4">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}