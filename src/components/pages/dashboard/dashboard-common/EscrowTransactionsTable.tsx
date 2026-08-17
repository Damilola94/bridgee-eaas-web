import React from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import useGetQuery from '../../../../hooks/useGetQuery';
import { formatCurrency } from '../../../../utilities/general';
import StatusBadge from './StatusBadge';
import { TransactionStatus } from '../dashboard-data';

type EscrowTransactionRow = {
  id: string;
  buyerName: string;
  buyerEmail: string;
  referenceNumber: string;
  amount: string;
  createdDate: string;
  status: TransactionStatus;
};

export default function EscrowTransactionsTable() {
  const { data, status } = useGetQuery({
    service: 'escrow-service/api/v1/',
    endpoint: 'escrowtransactions',
    pQuery: { PageNumber: 1, PageSize: 10 },
    queryKey: ['escrow-transactions-dashboard'],
    auth: true,
  });

  const rows: EscrowTransactionRow[] = data?.isSuccess ? data.data : [];

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
              <th className="py-3 pr-4 font-medium">Reference</th>
              <th className="py-3 pr-4 font-medium">Buyer Name</th>
              <th className="py-3 pr-4 font-medium">Buyer Email</th>
              <th className="py-3 pr-4 font-medium">Amount</th>
              <th className="py-3 pr-4 font-medium">Date</th>
              <th className="py-3 pr-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' ? (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span className="text-gray-500">Loading transactions...</span>
                  </div>
                </td>
              </tr>
            ) : status === 'error' ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-red-500">
                  Failed to load transactions.
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3.5 pr-4 text-gray-500">{row.referenceNumber}</td>
                  <td className="py-3.5 pr-4 text-textColor">{row.buyerName}</td>
                  <td className="py-3.5 pr-4 text-gray-500">{row.buyerEmail}</td>
                  <td className="py-3.5 pr-4 text-textColor">{formatCurrency(row.amount)}</td>
                  <td className="py-3.5 pr-4 text-gray-500">
                    {moment(row.createdDate).format('DD MMM YYYY')}
                  </td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}