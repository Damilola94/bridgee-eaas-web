export interface Bank {
  bankCode: string;
  bankName: string;
}

export interface BanksApiResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: Bank[];
  metaData: any | null;
}

export interface AddLinkedBankData {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}

export interface Account {
  bankName: string;
  accountNumber: string;
  accountName: string;
  isPrimary: boolean;
}
