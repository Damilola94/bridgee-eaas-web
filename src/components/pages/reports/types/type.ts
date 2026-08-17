export const REPORT_TYPES = [
  "Escrow & wallet transactions",
  "Customers",
  "Disputes",
] as const;

export const FORMATS = ["PDF", "Excel", "csv"] as const;

export type ReportType = (typeof REPORT_TYPES)[number];
export type ReportFormat = (typeof FORMATS)[number];

export const REPORT_TYPE_PARAM: Record<ReportType, string> = {
  "Escrow & wallet transactions": "EscrowAndWalletTransactions",
  Customers: "Customers",
  Disputes: "Disputes",
};

export const FORMAT_PARAM: Record<ReportFormat, string> = {
  PDF: "Pdf",
  Excel: "Excel",
  csv: "Csv",
};

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];