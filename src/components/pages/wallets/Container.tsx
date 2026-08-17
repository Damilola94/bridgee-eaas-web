import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import moment from "moment";
import { StatCard } from "../wallets/ui/stat-card";
import { DataTable } from "../../common/DataTable";
import { columns, WalletTransaction } from "./data";
import { Pagination } from "../../common/TablePagination";
import useGetQuery from "../../../hooks/useGetQuery";
import { WalletStats } from "./types/types";

function formatMoney(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

export default function WalletTransactionPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const { data: statsData, status: statsStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet",
    queryKey: ["wallet-stats"],
    auth: true,
  });

  const stats: WalletStats | null =
    statsStatus === "success" && statsData?.isSuccess ? statsData.data : null;

  const { data: txData, status: txStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/transactions",
    pQuery: {
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["wallet-transactions", pageNumber, pageSize],
    auth: true,
  });

  const transactions: WalletTransaction[] = useMemo(() => {
    if (txStatus === "success" && txData?.isSuccess) {
      return (txData.data ?? []).map(
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
          id: tx.id,
          transactionId: tx.transactionId,
          customerName: tx.customerName,
          amount: tx.amount,
          source: tx.source,
          fees: tx.fees,
          type: tx.type,
          dateTime: moment(tx.date).format("MMMM D, YYYY; h:mma"),
          status: tx.status,
        }),
      );
    }
    return [];
  }, [txData, txStatus]);

  const isLoading = txStatus === "loading";

  // NOTE: `metaData` in the API docs is shown as a placeholder string ("string"),
  // so the real pagination field name isn't confirmed yet. Checking a couple of
  // likely shapes here — confirm the actual `metaData` object with backend and
  // simplify once known.
  const totalElements =
    txData?.metaData?.totalCount ??
    txData?.metaData?.totalElements ??
    txData?.totalCount ??
    0;

  const currency = stats?.currency ?? "NGN";

  return (
    <div className=" space-y-4 font-outfit">
      <div className="bg-white rounded-[20px] p-8 border border-primary-500/40">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Wallet Balance"
            value={formatMoney(stats?.walletBalance ?? 0, currency)}
            variant="blue"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total credits"
            value={formatMoney(stats?.totalCredits ?? 0, currency)}
            variant="green"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total debits."
            value={formatMoney(stats?.totalDebits ?? 0, currency)}
            variant="pink"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Pending settlements."
            value={formatMoney(stats?.pendingSettlements ?? 0, currency)}
            variant="neutral"
          />
        </div>
      </div>

      <div className="bg-white rounded-[20px] border border-primary-500/40 shadow-sm overflow-hidden pb-8">
        <div className="p-8">
          <span className="inline-flex items-center bg-[#F4F4FC] px-4 py-2 rounded-2xl text-base font-medium">
            Wallet Transaction Table
          </span>
        </div>

        <DataTable
          columns={columns}
          data={transactions}
          isLoading={isLoading}
        />

        <div className="px-5 ">
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