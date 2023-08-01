export type InvoiceFormProps = {
  title?: string;
  role?: { label: string, value: string };
  escrowItems?: OrderListItemProps[];
  weight?: string | number;
  isDeliveryOnUs?: boolean;
  pickUpAddress?: string;
  disbursementType?: string;
  inspectionDuration?: string;
  writtenTerms?: string;
  contract?: File;
  recipientDetails?: RecipientDetailsProps;
};

export type OrderListItemProps = {
  id?: string;
  name?: string;
  amount?: string | number;
  quantity?: string | number;
  size?: number;
  total?: number;
};

export type RecipientDetailsProps = {
  address?: string;
  recipientName?: string;
  phoneNumber?: string;
  email?: string;
};
