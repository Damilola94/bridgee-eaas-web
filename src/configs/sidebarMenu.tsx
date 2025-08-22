import DashboardIcon from '../assets/svgs/dashboard.svg';
import TransactionsIcon from '../assets/svgs/transactions.svg';

import SettingsIcon from '../assets/svgs/settings.svg';

const menu = [
  { title: 'Dashboard', link: '/dashboard', icon: DashboardIcon },
  { title: 'Transactions', link: '/transactions', icon: TransactionsIcon },
  { title: 'Settings', link: '/settings', icon: SettingsIcon }
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
