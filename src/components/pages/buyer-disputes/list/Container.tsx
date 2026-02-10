import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { disputesOptions } from '../../../../data/dispute';

import ListStatusTabs from '../../../common/ListStatusTabs';

import DisputeList from './List';
import DisputeMetrics from './DisputeMetrics';

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    if (!router?.query?.status) {
      router.push({ pathname: '/buyer-disputes', query: { status: 'all' } });
    }
  }, [router]);

  return (
    <div className="w-full">
      <DisputeMetrics />
      <ListStatusTabs options={disputesOptions} pathname="/buyer-disputes" />
      <DisputeList />
    </div>
  );
}

export default DisputesContainer;
