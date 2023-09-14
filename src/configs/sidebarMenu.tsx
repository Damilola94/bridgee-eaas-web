import GlobalIcon from '../assets/svgs/global.svg';
import DashboardIcon from '../assets/svgs/dashboard.svg';
import TransactionsIcon from '../assets/svgs/transactions.svg';
import DisputesIcon from '../assets/svgs/dispute.svg';
import InviteIcon from '../assets/svgs/invite.svg';
import SettingsIcon from '../assets/svgs/settings.svg';

const menu = [
  { title: 'Get Started', link: '/get-started', icon: GlobalIcon },
  { title: 'Dashboard', link: '/dashboard', icon: DashboardIcon },
  { title: 'Transactions', link: '/transactions', icon: TransactionsIcon },
  { title: 'Disputes', link: '/disputes', icon: DisputesIcon },
  { title: 'Invites', link: '/invites', icon: InviteIcon },
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
