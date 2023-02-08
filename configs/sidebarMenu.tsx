import React from 'react';

import { AiOutlineFundView } from 'react-icons/ai';
import { HiSwitchVertical } from 'react-icons/hi';
import { IoMdAnalytics } from 'react-icons/io';

const menu = [
  { title: 'Analytics', link: '/pfm', icon: <IoMdAnalytics className="icon" /> },
  {
    title: 'Budget',
    link: '/pfm/budget',
    icon: <AiOutlineFundView className="icon" />,
    children: [
      { title: 'Dashboard', link: '/pfm/budget' },
      { title: 'Budgeted Expenses', link: '/pfm/budget/budgeted' },
      { title: 'Unbudgeted Expenses', link: '/pfm/budget/unbudgeted' },
      { title: 'Expenses', link: '/pfm/budget/expenses' }
    ]
  },
  { title: 'Transactions', link: '/pfm/transactions', icon: <HiSwitchVertical className="icon" /> }
];

export default menu;
