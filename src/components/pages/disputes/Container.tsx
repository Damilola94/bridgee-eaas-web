import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import ListStatusTabs from '../../common/ListStatusTabs';
import InvoiceList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Resolved', status: 'resolved' }
];

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    router.push({ pathname: '/disputes', query: { status: 'all' } });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/disputes" />
      <InvoiceList />
    </div>
  );
}

export default DisputesContainer;
