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
    walletTransactionId: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    amount: string;
  };
  metaData: null;
}
