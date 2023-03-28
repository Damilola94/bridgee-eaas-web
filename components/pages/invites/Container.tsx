import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import ListStatusTabs from '../../common/ListStatusTabs';
import InviteList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Pending', status: 'pending' },
  { title: 'Rejected', status: 'rejected' }
];

function DisputesContainer() {
  const router = useRouter();

  useEffect(() => {
    if (!router?.query?.status) {
      router.push({ pathname: '/invites', query: { status: 'all' } });
    }
  }, [router, router?.query?.status]);

  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/invites" />
      <InviteList />
    </div>
  );
}

export default DisputesContainer;
