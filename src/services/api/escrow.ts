import {
  ActivityLogsResponse,
  OrderDetailsResponse,
  OrderStatusResponse,
  PaymentDetailsResponse,
  TransactionStatusResponse,
} from "../../types/escrow";
import handleFetch from "./handleFetch";

export const getOrderStatus = (orderReference: string): Promise<OrderStatusResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/api/v1/escrows/orders/status/${orderReference}`,
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
  orderReference: string
): Promise<TransactionStatusResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/wallet/transactions/${orderReference}/status`,
    method: "GET",
  }) as Promise<TransactionStatusResponse>;
};

export const getOrderActivityLogs = async (escrowOrderId: string): Promise<ActivityLogsResponse> => {
  return await handleFetch({
    service: "wallet-service",
    method: "GET",
    endpoint: `/api/v1/activitylogs/order/${escrowOrderId}`,
  }) as Promise<ActivityLogsResponse>;
};
