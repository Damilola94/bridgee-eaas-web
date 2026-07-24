import {
  LayoutGrid,
  Repeat,
  Wallet,
  MessageSquareWarning,
  ClipboardList,
  Settings
} from 'lucide-react';

const menuList = [
  { title: 'Dashboard', link: '/dashboard', icon: LayoutGrid },
  { title: 'Escrow Transactions', link: '/escrow-transactions', icon: Repeat },
  { title: 'Wallet Transaction', link: '/wallet-transactions', icon: Wallet },
  { title: 'Dispute Management', link: '/disputes-management', icon: MessageSquareWarning },
  { title: 'Reports and Analytics', link: '/reports', icon: ClipboardList },
  { title: 'Settings', link: '/settings/company-profile', icon: Settings }
];

export default menuList;

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

