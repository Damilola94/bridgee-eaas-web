import { AddLinkedBankData, BanksApiResponse } from "../../types/bank";
import handleFetch from "./handleFetch";

export const getBanksList = (): Promise<BanksApiResponse> => {
  return handleFetch({
    service: "wallet-service",
    endpoint: "/api/v1/utility/banks",
    method: "GET",
  });
};

export const addLinkedBank = (data: AddLinkedBankData) => {
  return handleFetch({
    service: "identity-service",
    endpoint: "/api/v1/users/add-linked-bank",
    method: "POST",
    body: data,
    auth: true
  });
};

export const getAccountName = (data: {
  accountNumber: string;
  bankCode: string;
}) => {
  return handleFetch({
    service: "wallet-service",
    endpoint: "/api/v1/bankintegrations/name-enquiry",
    method: "POST",
    body: data,
  });
};
