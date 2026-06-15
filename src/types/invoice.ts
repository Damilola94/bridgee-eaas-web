import { ShippingRate } from "./shipbubble";

export type InvoiceFormProps = {
  title?: string;
  categoryId?: string;
  selectedCourier?: ShippingRate;
  role?: { label: string; value: string };
  escrowItems?: OrderListItemProps[];
  weight?: string | number;
  isDeliveryOnUs?: boolean;
  recipientAddress?: string;
  pickupAddress?: { label: string; value: string };
  deliveryAddress?: { label: string; value: string };
  deliveryZone?: { label: string; value: string };
  pickUpZone?: { label: string; value: string };
  disbursementType?: string;
  inspectionDuration?: string;
  writtenTerms?: string;
  description?: string;
  contract?: File;
  recipientDetails?: RecipientDetailsProps;
};

export type OrderListItemProps = {
  id?: string;
  inventoryItemId?: string;
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
