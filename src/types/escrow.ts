export interface OrderStatusResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    status: string;
    allowPayment: boolean;
  };
  metaData: null;
}


export interface TransactionStatusResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: string;
  metaData: string;
}

export interface PaymentDetailsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    orderReference: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    amount: string;
  };
  metaData: null;
}

export interface OrderStatusResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    status: string;
    allowPayment: boolean;
  };
  metaData: null;
}

export interface OrderDetailsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    id: string;
    createdDate: string;
    reference: string;
    recipientName: string;
    recipientEmail: string;
    recipientPhone: string;
    recipientAddress: string;
    paymentType: string;
    disputeManager: string;
    inspectionPeriod: string;
    dueDate: string;
    buyerPaysEscrowFee: boolean;
    items: {
      name: string;
      quantity: number;
      unitPrice: string;
      weightKg: number;
      total: string;
    }[];
    subtotal: string;
    deliveryFee: string;
    escrowFee: string;
    total: string;
  };
  metaData: string;
}

export interface ActivityLogItem {
  escrowOrderId: string;
  timestamp: string;
  action: string;
  isChecked: boolean;
}

export interface ActivityLogsResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: ActivityLogItem[];
  metaData: {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
export interface DeliveryPinResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    deliveryPin: string;
  };
}