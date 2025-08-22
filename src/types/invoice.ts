export type InvoiceFormProps = {
  title?: string;
  role?: { label: string, value: string };
  escrowItems?: OrderListItemProps[];
  weight?: string | number;
  isDeliveryOnUs?: boolean;
  recipientAddress?: string;
  pickUpAddress?: { label: string, value: string }
  deliveryAddress?: { label: string, value: string }

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
  oldQuantity?: string | number;
  size?: number;
  weight?: number;
  total?: number;
};

export type RecipientDetailsProps = {
  address?: string | any;
  recipientName?: string;
  phoneNumber?: string;
  email?: string;
};

export type SenderDetailsProps = {
  address?: string;
  name?: string;
  phoneNumber?: string;
  email?: string;
};

export type ReturnFormProps = {
  escrowItems?: OrderListItemProps[];
  weight?: string | number;
  isDeliveryOnUs?: boolean;
  pickUpAddress?: string;
  inspectionDuration?: string;
  recipientDetails?: RecipientDetailsProps;
  senderDetails?: SenderDetailsProps;
};
