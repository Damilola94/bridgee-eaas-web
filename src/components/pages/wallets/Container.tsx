import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";

import { StatCard } from "../wallets/ui/stat-card";
import { DataTable } from "../../common/DataTable";
import { columns, WalletTransaction } from "./data";
import { Pagination } from "../../common/TablePagination";
import useGetQuery from "../../../hooks/useGetQuery";
import { WalletStats } from "./types/types";

function formatMoney(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDateTime(date: string) {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function WalletTransactionPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  // =========================
  // WALLET STATS
  // =========================

  const { data: statsData, status: statsStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet",
    queryKey: ["wallet-stats"],
    auth: true,
  });

  const stats: WalletStats | null =
    statsStatus === "success" && statsData?.isSuccess
      ? statsData.data
      : null;

  // =========================
  // WALLET TRANSACTIONS
  // =========================

  const { data: txData, status: txStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/transactions",
    pQuery: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["wallet-transactions", pageNumber, pageSize],
    auth: true,
  });

  // =========================
  // MAP TRANSACTIONS
  // =========================

  const transactions: WalletTransaction[] = useMemo(() => {
    if (
      txStatus !== "success" ||
      !txData?.isSuccess ||
      !Array.isArray(txData.data)
    ) {
      return [];
    }

    return txData.data.map(
      (tx: {
        id: string;
        transactionId: string;
        customerName: string;
        amount: number;
        source: string;
        fees: number;
        type: string;
        date: string;
        status: string;
      }) => ({
        id: tx.transactionId,

        // IMPORTANT:
        // Use transactionId from the API.
        transactionId: tx.transactionId,

        customerName: tx.customerName,

        amount: tx.amount,

        source: tx.source,

        fees: tx.fees,

        type: tx.type,

        dateTime: formatDateTime(tx.date),

        status: tx.status,
      }),
    );
  }, [txData, txStatus]);

  // =========================
  // PAGINATION
  // =========================

  const totalElements = txData?.metaData?.totalCount ?? 0;

  const currency = stats?.currency ?? "NGN";

  const isLoading = txStatus === "loading";

  return (
    <div className="space-y-4 font-outfit">
      {/* Wallet Stats */}
      <div className="rounded-[20px] border border-primary-500/40 bg-white p-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Wallet Balance"
            value={formatMoney(
              stats?.walletBalance ?? 0,
              currency,
            )}
            variant="blue"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total Credits"
            value={formatMoney(
              stats?.totalCredits ?? 0,
              currency,
            )}
            variant="green"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total Debits"
            value={formatMoney(
              stats?.totalDebits ?? 0,
              currency,
            )}
            variant="pink"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Pending Settlements"
            value={formatMoney(
              stats?.pendingSettlements ?? 0,
              currency,
            )}
            variant="neutral"
          />
        </div>
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-[20px] border border-primary-500/40 bg-white pb-8 shadow-sm">
        <div className="p-8">
          <span className="inline-flex items-center rounded-2xl bg-[#F4F4FC] px-4 py-2 text-base font-medium">
            Wallet Transaction Table
          </span>
        </div>

        <DataTable
          columns={columns}
          data={transactions}
          isLoading={isLoading}
        />

        <div className="px-5">
          <Pagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalElements={totalElements}
            onPageChange={setPageNumber}
          />
        </div>
      </div>
    </div>
  );
}