import { type FC } from "react";
import Skeleton from "react-loading-skeleton";

import CustomerIcon from "../../../../assets/svgs/stock-item.svg";
import CompletedIcon from "../../../../assets/svgs/stock-low.svg";
import PendingIcon from "../../../../assets/svgs/clock.svg";

import Image from "next/image";

type CustomerMgtStatsProps = {
  totalCustomers?: number;
  totalCustomersWithCompletedTransactions?: number;
  totalCustomersWithPendingTransactions?: number;
  isLoading?: boolean;
};

const StatCard: FC<{
  icon: any;
  label: string;
  value?: number;
  isLoading?: boolean;
}> = ({ icon, label, value, isLoading }) => (
  <div className="flex-1 min-w-[260px] bg-white shadow-sm rounded-xl border border-lightText/20 px-5 py-5 flex items-center gap-4">
    <div className="rounded-xl  bg-primary/10 flex items-center justify-center flex-shrink-0 p-3">
      <Image src={icon} alt="" width={24} height={24} />
    </div>
    <div>
      <p className="text-sm text-lightText mb-1">{label}</p>
      {isLoading ? (
        <Skeleton width={60} height={22} />
      ) : (
        <p className="text-xl font-bold text-textColor">
          {(value ?? 0).toLocaleString()}
        </p>
      )}
    </div>
  </div>
);

const CustomerMgtStats: FC<CustomerMgtStatsProps> = ({
  totalCustomers,
  totalCustomersWithCompletedTransactions,
  totalCustomersWithPendingTransactions,
  isLoading,
}) => {
  return (
    <div className="w-full flex flex-wrap gap-4">
      <StatCard
        icon={CustomerIcon}
        label="Total Customers"
        value={totalCustomers}
        isLoading={isLoading}
      />
      <StatCard
        icon={CompletedIcon}
        label="Total Customers With Completed Transactions"
        value={totalCustomersWithCompletedTransactions}
        isLoading={isLoading}
      />
      <StatCard
        icon={PendingIcon}
        label="Total Customers With Pending Transactions"
        value={totalCustomersWithPendingTransactions}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CustomerMgtStats;
