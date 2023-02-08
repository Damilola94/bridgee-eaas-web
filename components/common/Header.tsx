import React from 'react';

import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

import MonthPicker from '../inputs/MonthPicker';
import BreadCrumbs from './BreadCrumbs';
import DateRangePicker from '../inputs/AnalyticsDateRange';
import TransactionFilter from '../layouts/TransactionFilter';
import { useListFilter } from '../../context/ListFilter';

function Header() {
  const [cookie] = useCookies(['data']);
  const { asPath } = useRouter();
  const { filter, setFilter } = useListFilter();

  const showDateRangePicker = ['/pfm'].includes(asPath);
  const showMonthPicker = ['/pfm/budget', '/pfm/budget/budgeted', '/pfm/budget/unbudgeted'].includes(asPath);
  const showTransactionFilter = ['/pfm/transactions', '/pfm/budget/expenses'].includes(asPath);

  return (
    <>
      <header className="fixed z-20 w-full h-20 bg-white border-b lg:pl-72">
        <div className="content w-full h-full text-textColor flex items-center !pl-20 lg:!pl-4">
          <div className="flex items-center space-x-3 mr-5">
            <p className="font-semibold">{cookie.data?.fullName || 'N/A'}</p>
          </div>
        </div>
      </header>
      <div className="fixed z-20 w-full h-14 top-20 bg-white border-b lg:pl-72">
        <div className="w-full h-full text-textColor content flex items-center justify-between">
          <div className="mr-2">
            <BreadCrumbs />
          </div>
          <div className="flex items-center min-w-max">
            {showDateRangePicker && showMonthPicker && showTransactionFilter
              && <p className="text-labelColor text-sm mr-2">Filter by:</p>}
            {showDateRangePicker && (
              <DateRangePicker filter={filter?.flowchartFilter || null} setFilter={setFilter} />
            )}
            {showMonthPicker && (
              <MonthPicker
                value={filter?.monthFilter || null}
                label="Current Month"
                onChange={(val) => setFilter((state: any) => ({ ...state, monthFilter: val }))}
                yearsRange={[2020, new Date().getFullYear()]}
                max={[new Date().getMonth(), new Date().getFullYear()]}
              />
            )}
            {showTransactionFilter && (
              <TransactionFilter filter={filter?.transactionFilter || null} setFilter={setFilter} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
