export interface DisputePayload {
  EscrowOrderId: string;
  DisputeReasonId: string;
  CustomReason?: string;
  Description: string;
  ReporterPhone: string;
  PictureProofs: string[];
  VideoProofs: string[];
  BankCode: string | undefined;
  ReporterAccountNumber: string;
}
