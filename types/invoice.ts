export type InvoiceFormProps = {
  title?: string;
  role?: { label: string, value: string };
  orderList?: OrderListItemProps[];
  paymentPlan?: string;
  agreement?: string;
  agreementFile?: string;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  recipientAddress?: string;
};

export type OrderListItemProps = {
  id?: string;
  name?: string;
  price?: string;
  quantity?: string;
  total?: number;
};
