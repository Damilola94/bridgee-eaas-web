import { Wallet } from "lucide-react";
import { StatCard } from "../wallets/ui/stat-card";
import { DataTable } from "../../common/DataTable";
import { columns, MOCK_WALLET_TRANSACTIONS } from "./data";
import { Pagination } from "../../common/TablePagination";
import { useState } from "react";

export default function WalletTransactionPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const totalElements = 100;
  return (
    <div className=" space-y-6 font-outfit">
      <div className="bg-white rounded-[20px] p-8 border border-[#ECECEC]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Wallet Balance"
            value="NGN 7,450"
            variant="blue"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total credits"
            value="NGN 7,450"
            variant="green"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total debits."
            value="NGN 7,450"
            variant="pink"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Pending settlements."
            value="NGN 7,450"
            variant="neutral"
          />
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-[#ECECEC]  shadow-sm overflow-hidden pb-8">
        <div className="p-8">
          <span className="inline-flex items-center bg-[#F4F4FC] px-4 py-2 rounded-2xl text-base font-medium">
            Wallet Transaction Table
          </span>
        </div>

        <DataTable columns={columns} data={MOCK_WALLET_TRANSACTIONS} />

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

