import React from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';

import InvoiceList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Completed', status: 'completed' },
  { title: 'Pending', status: 'pending' },
  { title: 'Awaiting Payment', status: 'awaitingpayment' },
  { title: 'Awaiting Confirmation', status: 'awaitingconfirmation' },
  { title: 'Rejected', status: 'rejected' },
  { title: 'Dispute', status: 'dispute' }
];

function InvoiceContainer() {
  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/transactions" />

      <InvoiceList />
    </div>
  );
}

export default InvoiceContainer;
