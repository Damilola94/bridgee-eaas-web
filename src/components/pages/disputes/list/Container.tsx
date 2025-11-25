import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { disputesOptions } from '../../../../data/dispute';

import ListStatusTabs from '../../../common/ListStatusTabs';

import InvoiceList from './List';
import DisputeMetrics from './DisputeMetrics';

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    if (!router?.query?.status) {
      router.push({ pathname: '/disputes', query: { status: 'all-dispute' } });
    }
  }, [router]);

  return (
    <div className="w-full">
      <DisputeMetrics />
      <ListStatusTabs options={disputesOptions} pathname="/disputes" />
      <InvoiceList />
    </div>
  );
}

export default DisputesContainer;
