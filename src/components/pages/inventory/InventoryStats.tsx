import InventoryStatCard from "./component/InventoryStatCard";

import TotalStockIcon from "../../../assets/svgs/stock-item.svg";
import StockLowIcon from "../../../assets/svgs/stock-low.svg";
import ValueIcon from "../../../assets/svgs/value.svg";

type Props = {
  totalItems?: number;
  lowStock?: number;
  inStock?: number;
  outOfStock?: number;
  totalValue?: number;
};

export default function InventoryStats({
  totalItems = 0,
  lowStock = 0,
  totalValue = 0,
}: Props) {
  return (
    <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
      <InventoryStatCard
        icon={TotalStockIcon}
        label="Total Items"
        value={totalItems}
        badge="+3 this week"
        badgeColor="green"
      />
      <InventoryStatCard
        icon={StockLowIcon}
        label="Low Stock"
        value={lowStock}
        badge="Needs Restock"
        badgeColor="red"
      />
      <InventoryStatCard
        icon={ValueIcon}
        label="Total Value"
        value={totalValue}
        badge="Across all stock"
        badgeColor="orange"
      />
    </div>
  );
}
