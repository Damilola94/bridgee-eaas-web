import DashboardIcon from "../assets/svgs/dashboard.svg";
import TransactionsIcon from "../assets/svgs/transactions.svg";
import DisputeIcon from "../assets/svgs/dispute.svg";
import InventoryIcon from "../assets/svgs/inventory.svg";
import CustomerMgtIcon from "../assets/svgs/customer-mgt.svg";

import SettingsIcon from "../assets/svgs/settings.svg";

const menu = [
  { title: "Dashboard", link: "/dashboard", icon: DashboardIcon },
  { title: "Transactions", link: "/transactions", icon: TransactionsIcon },
  { title: "Disputes", link: "/disputes", icon: DisputeIcon },
  { title: "Inventory", link: "/inventory", icon: InventoryIcon },
  {
    title: "Customer Management",
    link: "/customer-management",
    icon: CustomerMgtIcon,
  },
  { title: "Settings", link: "/settings", icon: SettingsIcon },
];

export default menu;

/**
 * Sample properties for a menu item

  {
    title: 'Budget',
    link: '/pfm/budget',
    icon: Image-link,
    children: [
      { title: 'Dashboard', link: '/pfm/budget' },
      { title: 'Budgeted Expenses', link: '/pfm/budget/budgeted' },
      { title: 'Unbudgeted Expenses', link: '/pfm/budget/unbudgeted' },
      { title: 'Expenses', link: '/pfm/budget/expenses' }
    ]
  },
 */

