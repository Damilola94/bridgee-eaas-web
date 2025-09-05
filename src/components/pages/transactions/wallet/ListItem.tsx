import React, { useState } from 'react';

import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';

import TransactionStatus from '../../../common/TransactionStatus';
import { TransactionProps } from '../../../../types/transaction';

import TransactionDetailsModal from './TransactionDetailsModal';

function ListItem({ data, index }: { data: TransactionProps, index: number }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  return (
    <tr className="border-t">
      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
      <td className="px-3 py-5">
        <div className="flex items-center space-x-3">
          <span className={`w-8 h-8 ${data?.type === 'Inflow' ? 'bg-success/10' : 'bg-error/10'} p-2 rounded-full`}>
            {data?.transaction === 'Inflow'
              ? <InflowArrow className="w-4 h-4" color="#03543F" />
              : <OutflowArrow className="w-4 h-4" color="#EB4336" />}
          </span>
          <span className="capitalize">{data?.transaction}</span>
        </div>
      </td>
      <td className="px-3 py-5">{data?.referenceNumber}</td>
      <td className="px-3 py-5">{data?.amount}</td>
      <td className="px-3 py-5">{data?.source}</td>
      <td className="px-3 py-5">
        <TransactionStatus status={data?.status} />
      </td>
      <td className="px-3 py-5">{data?.date}</td>
      <td className="pr-5 sm:pr-10 pl-3 py-5">
        <button
          type="button"
          onClick={() => {
            setSelectedTransaction(data?.id);
            setShowDetails(true);
          }}
          className="border border-black rounded-lg px-3 py-1.5 hover:bg-gray-100"
        >
          View
        </button>
        {showDetails && <TransactionDetailsModal onClose={() => setShowDetails(false)}
          transactionId={selectedTransaction}
        />}
      </td>
    </tr>
  );
}

export default ListItem;
