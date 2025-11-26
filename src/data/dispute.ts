export const proposalOptions = [
  { label: 'Refund', value: 'Refund' },
  { label: 'Replace order', value: 'ReplaceOrder' },
  { label: 'Ship additional item', value: 'ShipAdditionalItem' },
  { label: 'Full refund and return order', value: 'ReturnOrderWithFullRefund' }
  // { label: "Partial refund and replacement of order", value: "PartialRefundAndReplacement" }
];

export const proposalsObject = {
  Refund: 'Refund',
  ReplaceOrder: 'Replace order',
  ShipAdditionalItem: 'Ship additional item',
  ReturnOrderWithFullRefund: 'Full refund and return order',
  PartialRefundAndReplacement: 'Partial refund and replacement of order'
};

export const reasonOptions = [
  { label: 'Non-Conformance to Description', value: 'NonConformanceToDescription' },
  { label: 'Counterfeit or Fraudulent Items', value: 'CounterfeitOrFraudulentItems' },
  { label: 'Damaged or Defective Goods', value: 'DamagedOrDefectiveGoods' },
  { label: 'Incomplete or Missing Deliverables', value: 'IncompleteOrMissingDeliverables' },
  { label: 'Delivery to Wrong Address', value: 'DeliveryToWrongAddress' },
  { label: 'Disputed Inspection Results', value: 'DisputedInspectionResult' }
];

export const reasonsObject = {
  NonConformanceToDescription: 'Non-Conformance to Description',
  CounterfeitOrFraudulentItems: 'Counterfeit or Fraudulent Items',
  DamagedOrDefectiveGoods: 'Damaged or Defective Goods',
  IncompleteOrMissingDeliverables: 'Incomplete or Missing Deliverables',
  DeliveryToWrongAddress: 'Delivery to Wrong Address',
  DisputedInspectionResult: 'Disputed Inspection Results'
};

export const shippingStatuses = [
  { label: 'In Transit', value: 'InTransit' },
  { label: 'Rider Pickup Order', value: 'RiderPickUpOrder' },
  { label: 'Return In Progress', value: 'ReturnInProgress' },
  { label: 'Return Delivered', value: 'ReturnDelivered' },
  { label: 'Awaiting Return', value: 'AwaitingReturn' },
  { label: 'Awaiting Additional Item', value: 'AwaitingAdditionalItem' },
  { label: 'Additional Item In Progress', value: 'AdditionalItemInProgress' },
  { label: 'Additional Item In Transit', value: 'AdditionalItemInTransit' },
  { label: 'Additional Item Delivered', value: 'AdditionalItemDelivered' },
  { label: 'Additional Item Confirmed', value: 'AdditionalItemConfirmed' },
  { label: 'Return In Transit', value: 'ReturnInTransit' },
  { label: 'Return Confirmed', value: 'ReturnConfirmed' },
  { label: 'Awaiting Replacement', value: 'AwaitingReplacement' },
  { label: 'Replacement In Process', value: 'ReplacementInProcess' },
  { label: 'Replacement In Transit', value: 'ReplacementInTransit' },
  { label: 'Replacement Delivered', value: 'ReplacementDelivered' },
  { label: 'Replacement Confirmed', value: 'ReplacementConfirmed' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'New Dispute Opened', value: 'NewDisputeOpened' }
];

export const disputesOptions = [
  { title: 'All Dispute', status: 'all' },
  { title: 'Resolved', status: 'ResolvedInSellerFavor' },
  { title: 'In progress', status: 'Pending' }
];

export const statusOptions = [
  { title: 'All', status: 'all' },
  { title: 'Open dispute', status: 'Open' },
  { title: 'Resolved dispute', status: 'Resolved' },
  { title: 'In Progress', status: 'InProgress' },
  { title: 'Awaiting Return', status: 'AwaitingReturn' },
  { title: 'Awaiting Ship Additional', status: 'AwaitingShipAdditional' },
  { title: 'Return Received', status: 'ReturnReceived' },
  { title: 'Awaiting Replacement', status: 'AwaitingReplacement' },
  { title: 'Replacement Sent', status: 'ReplacementSent' },
  { title: 'Cancelled', status: 'Cancelled' },
  { title: 'New Dispute Opened', status: 'NewDisputeOpened' },
  { title: 'Awaiting Mediator Review', status: 'AwaitingMediatorReview' },
  { title: 'Awaiting Approval', status: 'AwaitingApproval' }
];
