export const proposalOptions = [
  { label: "Refund", value: "Refund" },
  { label: "Replace order", value: "ReplaceOrder" },
  { label: "Ship additional item", value: "ShipAdditionalItem" },
  { label: "Full refund and return order", value: "ReturnOrderWithFullRefund" },
  { label: "Partial refund and replacement of order", value: "PartialRefundAndReplacement" }
];

export const proposalsObject = {
  Refund: 'Refund',
  ReplaceOrder: 'Replace order',
  ShipAdditionalItem: 'Ship additional item',
  ReturnOrderWithFullRefund: 'Full refund and return order',
  PartialRefundAndReplacement: 'Partial refund and replacement of order'
};

export const reasonOptions = [
  { label: "Non-Conformance to Description", value: "NonConformanceToDescription" },
  { label: "Counterfeit or Fraudulent Items", value: "CounterfeitOrFraudulentItems" },
  { label: "Damaged or Defective Goods", value: "DamagedOrDefectiveGoods" },
  { label: "Incomplete or Missing Deliverables", value: "IncompleteOrMissingDeliverables" },
  { label: "Delivery to Wrong Address", value: "DeliveryToWrongAddress" },
  { label: "Disputed Inspection Results", value: "DisputedInspectionResult" }
];

export const reasonsObject = {
  NonConformanceToDescription: 'Non-Conformance to Description',
  CounterfeitOrFraudulentItems: 'Counterfeit or Fraudulent Items',
  DamagedOrDefectiveGoods: 'Damaged or Defective Goods',
  IncompleteOrMissingDeliverables: 'Incomplete or Missing Deliverables',
  DeliveryToWrongAddress: 'Delivery to Wrong Address',
  DisputedInspectionResult: 'Disputed Inspection Results'
};
