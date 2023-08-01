import React from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';
import TransactionList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Initiated', status: 'initiated' },
  { title: 'Pending', status: 'pending' },
  { title: 'Processing', status: 'processing' },
  { title: 'Successful', status: 'successful' },
  { title: 'Reversed', status: 'reversed' },
  { title: 'Failed', status: 'failed' }
];

function WalletContainer() {
  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/transactions" />

      <TransactionList />
    </div>
  );
}

export default WalletContainer;
