import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { statusOptions } from '../../../../data/dispute';

import ListStatusTabs from '../../../common/ListStatusTabs';
import InvoiceList from './List';

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    if (!router?.query?.status) {
      router.push({ pathname: '/disputes', query: { status: 'all' } });
    }
  }, [router]);

  return (
    <div className="w-full">
      <ListStatusTabs options={statusOptions} pathname="/disputes" />
      <InvoiceList />
    </div>
  );
}

export default DisputesContainer;
