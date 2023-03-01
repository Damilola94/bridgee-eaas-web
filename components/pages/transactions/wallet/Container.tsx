import React from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';
import TransactionList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Successful', status: 'successful' },
  { title: 'Pending', status: 'pending' },
  { title: 'Failed', status: 'failed' }
];

function WalletContainer() {
  return (
    <div className="w-full">
      <ListStatusTabs options={options} />

      <TransactionList />
    </div>
  );
}

export default WalletContainer;
