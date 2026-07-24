

import React from "react";
import { useCookies } from "react-cookie";

import AnalyticsChart from "./dashboard-common/AnalyticsChart";
import CustomerMetrics from "./dashboard-common/CustomerMetrics";
import EscrowTransactionsTable from "./dashboard-common/EscrowTransactionsTable";
import SummaryCard from "./dashboard-common/SummaryCard";

function DashboardContainer() {
  const [cookie] = useCookies(["data"]);
  return (
    <div className="px-3 pt-3 pb-5">

      <SummaryCard />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 mb-5">
        <AnalyticsChart />
        <CustomerMetrics />
      </div>

      <EscrowTransactionsTable />
    </div>
  );
}

export default DashboardContainer;