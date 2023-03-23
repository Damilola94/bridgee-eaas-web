import DashboardIcon from '../assets/svgs/dashboard.svg';
import TransactionsIcon from '../assets/svgs/transactions.svg';
import DisputesIcon from '../assets/svgs/dispute.svg';
import InviteIcon from '../assets/svgs/invite.svg';

const menu = [
  { title: 'Dashboard', link: '/dashboard', icon: DashboardIcon },
  { title: 'Transactions', link: '/transactions', icon: TransactionsIcon },
  { title: 'Disputes', link: '/disputes', icon: DisputesIcon },
  { title: 'Invites', link: '/invites', icon: InviteIcon }
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
