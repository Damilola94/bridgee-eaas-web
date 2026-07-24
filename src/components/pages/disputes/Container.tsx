import { Wallet } from "lucide-react";
import { StatCard } from "../wallets/ui/stat-card";
import { DataTable } from "../../common/DataTable";
import { columns,  MOCK_DISPUTES} from "./data";
import { Pagination } from "../../common/TablePagination";
import { useState } from "react";
import { DisputeSearchBar } from "./dispute-common/escrow-search-bar";
import { DisputeFilterTabs } from "./dispute-common/escrow-filter-tabs";
import { DisputeStatus } from "./types/types";
import { useRouter } from "next/router";

export default function DisputeManagementPage() {
  const [search, setSearch] = useState("");
    const router = useRouter();

  const [activeTab, setActiveTab] = useState<DisputeStatus | "all">("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const totalElements = 100;


  const handleRowClick = () => {
    router.push("/disputes-management/123");
  };

  return (
    <div className=" space-y-6 font-outfit">
      <div className="bg-white rounded-[20px] p-8 border border-[#ECECEC]">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8">
          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total Disputes"
            value="NGN 7,450"
            variant="blue"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Resolved Disputes"
            value="NGN 7,450"
            variant="green"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Ongoing Dispute"
            value="NGN 7,450"
            variant="pink"
          />
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-[#ECECEC]  shadow-sm overflow-hidden pb-8">
        <div className="p-5">
          <span className="inline-flex items-center bg-[#F4F4FC] px-4 py-2 rounded-2xl text-base font-medium">
            Dispute Table
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-5">
          <DisputeSearchBar
            value={search} 
            onChange={(value) => {
              setSearch(value);
              setPageNumber(1);
            }}
          />
          <DisputeFilterTabs
            activeTab={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              setPageNumber(1);
            }}
          />
        </div>
        <DataTable columns={columns} data={MOCK_DISPUTES} 
         onRowClick={handleRowClick}
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

