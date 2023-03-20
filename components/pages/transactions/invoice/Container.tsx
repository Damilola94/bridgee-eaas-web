import React from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';
import InvoiceList from './List';

const options = [
  { title: 'All', status: 'all' },
  { title: 'Completed', status: 'completed' },
  { title: 'In Progress', status: 'in-progress' },
  { title: 'Awaiting Confirmation', status: 'awaiting-confirmation' },
  { title: 'Awaiting Payment', status: 'awaiting-payment' },
  { title: 'Declined', status: 'declined' },
  { title: 'Dispute', status: 'dispute' },
  { title: 'Draft', status: 'draft' }
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
