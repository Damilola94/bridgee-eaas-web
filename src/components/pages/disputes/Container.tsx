import { Wallet } from "lucide-react";
import { StatCard } from "../wallets/ui/stat-card";
import { DataTable } from "../../common/DataTable";
import { columns } from "./data";
import { Pagination } from "../../common/TablePagination";
import { useMemo, useState } from "react";
import { DisputeSearchBar } from "./dispute-common/escrow-search-bar";
import { DisputeFilterTabs } from "./dispute-common/escrow-filter-tabs";
import { DisputeStatus, DisputeStatsDTO } from "./types/interface";
import { useRouter } from "next/router";
import useGetQuery from "../../../hooks/useGetQuery";

export default function DisputeManagementPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DisputeStatus | "all">("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const { data: statsData, status: statsStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/disputes/stats",
    queryKey: ["dispute-stats"],
    auth: true,
  });

  const stats: DisputeStatsDTO | null =
    statsStatus === "success" && statsData?.isSuccess ? statsData.data : null;

  const { data: listData, status: listStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/disputes",
    pQuery: {
      Status: activeTab === "all" ? undefined : activeTab,
      Search: search || undefined,
      PageNumber: pageNumber,
      PageSize: pageSize,
    },
    queryKey: ["disputes", activeTab, search, pageNumber, pageSize],
    auth: true,
  });

  const disputes = useMemo(() => {
    if (listStatus === "success" && listData?.isSuccess) {
      return listData.data ?? [];
    }
    return [];
  }, [listData, listStatus]);

  const isLoading = listStatus === "loading";

  const totalElements = listData?.totalCount ?? 0;

  const handleRowClick = (dispute: { id: string }) => {
    router.push(`/disputes-management/${dispute.id}`);
  };

  return (
    <div className="space-y-4 font-outfit">
      <div className="bg-white rounded-[20px] p-8 border border-primary-500/40">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-8">
          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Total Disputes"
            value={String(stats?.totalDisputes ?? 0)}
            variant="blue"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Resolved Disputes"
            value={String(stats?.resolvedDisputes ?? 0)}
            variant="green"
          />

          <StatCard
            icon={<Wallet size={26} strokeWidth={2} />}
            label="Ongoing Dispute"
            value={String(
              (stats?.pendingDisputes ?? 0) + (stats?.underReviewDisputes ?? 0),
            )}
            variant="pink"
          />
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-primary-500/40 shadow-sm overflow-hidden pb-8">
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

        <DataTable
          columns={columns}
          data={disputes}
          isLoading={isLoading}
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