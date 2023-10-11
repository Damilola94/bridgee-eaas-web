import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';
import InvoiceList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Open dispute', status: 'Open' },
  { title: 'Resolved dispute', status: 'Resolved' }
];

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    if (!router?.query?.status) {
      router.push({ pathname: '/disputes', query: { status: 'all' } });
    }
  }, [router]);

  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/disputes" />
      <InvoiceList />
    </div>
  );
}

export default DisputesContainer;
