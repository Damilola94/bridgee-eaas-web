export type TransactionProps = {
  id: string // "84a85585-e45b-4134-82e8-af3e9547842b"
  amount: number // 10000
  fee: number // 10000
  description: string // "Amount deposited into escrow order:6984348"
  transactionReference: string // "BRGE|6243631147|9317108590"
  channel: string // "escrow"
  date: string // "2023-06-16T05:52:37.69"
  status: string // "successful"
  type: string // "debit"
};

export type FundTransferProps = {
  bankCode?: { label: string, value: string }
  accountNumber?: string
  accountName?: string
  amount?: string
  categoryId?: { label: string, value: string }
  narration?: string
  pin?: string
  saveAsBeneficiary?: boolean
  processFee?: number
};
