import handleFetch from "./handleFetch";

export const getOrderStatus = (orderReference: string) => {
  return handleFetch({
    service: "wallet-service",
    // endpoint: `/api/v1/escrows/orders/status/${orderReference}`,
    endpoint: `/api/v1/escrows/orders/status/9C336337A6A5`,
    method: "GET",
  });
};

export const getPaymentDetails = (orderReference: string, email: string) => {
  return handleFetch({
    service: "wallet-service",
    endpoint: `/api/v1/payments/details?OrderReference=${orderReference}&Email=${email}`,
    method: "GET",
  });
};
