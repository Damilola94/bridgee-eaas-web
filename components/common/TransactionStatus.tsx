import React from 'react';

import { statusColors, statusTitle } from '../../data/status';

function TransactionStatus({ status }: { status: string }) {
  return (
    <span
      style={{
        color: statusColors?.[status as keyof typeof statusTitle],
        backgroundColor: `${statusColors?.[status as keyof typeof statusTitle]}19`
      }}
      className="rounded-lg text-xs px-3 py-1.5 font-bold"
    >
      {statusTitle?.[status as keyof typeof statusTitle] || status}
    </span>
  );
}

export default TransactionStatus;
