import React from 'react';

import ListStatusTabs from '../../../common/ListStatusTabs';

import SalesList from './List';

const options = [
  { title: "All", status: "all" },
  { title: "Cancelled", status: "Cancelled" },
  { title: "Completed", status: "Completed" },
  { title: "Confirmed", status: "Confirmed" },
  { title: "Delivered", status: "Delivered" },
  { title: "Disputed", status: "Disputed" },
  { title: "Dispute Resolved", status: "DisputeResolved" },
  { title: "Draft", status: "Draft" },
  { title: "Picked Up", status: "PickedUp" }
];

function InvoiceContainer() {
  return (
    <div className="w-full">
      <ListStatusTabs options={options} pathname="/transactions" />

      <SalesList />
    </div>
  );
}

export default InvoiceContainer;
