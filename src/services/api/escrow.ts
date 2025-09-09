import {
  OrderDetailsResponse,
  OrderStatusResponse,
  PaymentDetailsResponse,
  TransactionStatusResponse,
} from "../../types/escrow";
import handleFetch from "./handleFetch";

export const getOrderStatus = (orderReference: string): Promise<OrderStatusResponse> => {
  return handleFetch({
    service: "wallet-service",
    // endpoint: `/api/v1/escrows/orders/status/${orderReference}`,
    endpoint: `/api/v1/escrows/orders/status/9C336337A6A5`,
    method: "GET",
  }) as Promise<OrderStatusResponse>;
};

export const getOrderDetails = (orderReference: string): Promise<OrderDetailsResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/api/v1/escrows/orders/reference/${orderReference}`,
    method: "GET",
  }) as Promise<OrderDetailsResponse>;
};

export const getPaymentDetails = (
  orderReference: string,
  email: string
): Promise<PaymentDetailsResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/api/v1/payments/details?OrderReference=${orderReference}&Email=${email}`,
    method: "GET",
  }) as Promise<PaymentDetailsResponse>;
};

export const getTransactionStatus = (
  transactionId: string
): Promise<TransactionStatusResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/wallet/transactions/${transactionId}/status`,
    method: "GET",
  }) as Promise<TransactionStatusResponse>;
};
