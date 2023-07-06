import React, { useState } from 'react';

import InflowArrow from '../../../../assets/svg-tsx/InflowArrow';
import OutflowArrow from '../../../../assets/svg-tsx/OutflowArrow';

import { useAccountsContext } from '../../../../context/Accounts';

import TransactionStatus from '../../../common/TransactionStatus';
import { formatChannel, formatCurrency } from '../../../../utilities/general';
import { formatDateTime } from '../../../../utilities/dateTime';
import TransactionDetails from './TransactionDetails';
import { TransactionProps } from '../../../../types/transaction';

function ListItem({ data, index }: { data: TransactionProps, index: number }) {
  const { accounts } = useAccountsContext();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <tr className="border-t">
      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
      <td className="px-3 py-5">
        <div className="flex items-center space-x-3">
          <span className={`w-8 h-8 ${data?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'} p-2 rounded-full`}>
            {data?.type === 'credit'
              ? <InflowArrow className="w-4 h-4" color="#03543F" />
              : <OutflowArrow className="w-4 h-4" color="#EB4336" />
            }
          </span>
          <span className="capitalize">{data?.type}</span>
        </div>
      </td>
      <td className="px-3 py-5">{data?.transactionReference}</td>
      <td className="px-3 py-5">{formatCurrency(data?.amount, true, accounts?.defaultWallets?.[0]?.currency?.code)}</td>
      <td className="px-3 py-5">{formatChannel(data?.channel)}</td>
      <td className="px-3 py-5">
        <TransactionStatus status={data?.status} />
      </td>
      <td className="px-3 py-5">{formatDateTime(data?.date)}</td>
      <td className="pr-5 sm:pr-10 pl-3 py-5">
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="border border-black rounded-lg px-3 py-1.5 hover:bg-gray-100"
        >
          View
        </button>
        {showDetails && <TransactionDetails data={data} onClose={() => setShowDetails(false)} />}
      </td>
    </tr>
  );
}

export default ListItem;
