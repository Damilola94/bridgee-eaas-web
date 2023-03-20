import { useRouter } from 'next/router';
import React from 'react';

import invoices from '../../../sample-data/invoiceList';

import MenuOptions from '../../common/MenuOptions';
import NoData from '../../common/NoData';
import TransactionStatus from '../../common/TransactionStatus';
import SelectInput from '../../inputs/Select';

function InvoiceList({ showFilter = true }) {
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-10 py-5">
        <h3 className="font-bold text-lg mr-5">Invoice Disputes</h3>
        {showFilter && (
          <div className="max-w-xs w-full">
            <SelectInput placeholder="Filter" className="w-full" />
          </div>
        )}
      </div>

      <div className="w-full overflow-auto pb-20">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-secondary">
            <tr className="">
              <th className="pl-10 pr-3 py-5">#</th>
              <th className="px-3 py-5">Invoice Title</th>
              <th className="px-3 py-5">Invoice Number</th>
              <th className="px-3 py-5">Dispute Reason</th>
              <th className="px-3 py-5">Date</th>
              <th className="px-3 py-5">Status</th>
              <th>{null}</th>
            </tr>
          </thead>
          <tbody className="">
            {invoices.map((item, index) => (
              <tr className="border-t" key={item?.id}>
                <td className="pl-10 pr-3 py-5">{index + 1}</td>
                <td className="px-3 py-5">{item?.title}</td>
                <td className="px-3 py-5">{item?.number}</td>
                <td className="px-3 py-5">{item?.disputeReason}</td>
                <td className="px-3 py-5">{item?.dueDate}</td>
                <td className="px-3 py-5">
                  <TransactionStatus status={item?.status} />
                </td>
                <td className="pr-10 pl-3 py-5">
                  <MenuOptions
                    options={[
                      { title: 'View', action: () => router.push({ pathname: `transactions/invoice-details/${item?.id}` }) },
                      { title: 'Open Dispute', action: () => {} },
                      { title: 'Delete', action: () => {} }
                    ]}
                  />
                </td>
              </tr>
            ))}

            {invoices?.length < 1 && (
              <tr>
                <td colSpan={8}>
                  <NoData py="pt-14" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoiceList;
