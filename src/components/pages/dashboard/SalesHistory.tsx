import React, { useEffect } from 'react';
import Link from 'next/link';
import { RxChevronRight } from 'react-icons/rx';
import { BulletList } from 'react-content-loader';

import { useRouter } from 'next/router';

import { formatCurrency, formatDisbursementType } from '../../../utilities/general';
import { formatDateTime } from '../../../utilities/dateTime';

import NoData from '../../common/NoData';
import TransactionStatus from '../../common/TransactionStatus';
import ListStatusTabs from '../../common/ListStatusTabs';

type Props = {
  data: any;
  status: string;
  error: unknown
};

const options = [
  { title: 'All', status: 'all' },
  { title: 'Awaiting Shipment', status: 'awaitingshipment' },
  { title: 'Intransit', status: 'intransit' },
  { title: 'Disputed', status: 'disputed' },
  { title: 'Completed', status: 'completed' },
  { title: 'Inspection', status: 'inspection' }
];

function SalesHistory({ data, status, error }: Props) {
  const router = useRouter();
  const { tab } = router.query || {};

  useEffect(() => {
    if (!tab) {
      router.push({ pathname: '/dashboard', query: { tab: 'sales', status: 'all' } });
    }
  }, [router, tab]);
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between px-5 sm:px-10 py-5">
        <div>
          <h3 className="font-bold text-lg mr-5 mb-2">Sales</h3>
          <p className='text-lightText  mb-2'>This speaks to the funds sent by the buyer </p>
        </div>
        <Link href="/transactions">
          <span className="text-primary text-sm flex items-center hover:underline">
            See All
            <RxChevronRight className="w-5 h-auto mb-1" />
          </span>
        </Link>
      </div>
      <ListStatusTabs options={options} pathname="/dashboard" />
      <div className="w-full overflow-auto pb-20">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-secondary">
            <tr className="">
              <th className="pl-5 sm:pl-10 pr-3 py-5">#</th>
              <th className="px-3 py-5">Business Name</th>
              <th className="px-3 py-5">Invoice Number</th>
              <th className="px-3 py-5">Amount</th>
              <th className="px-3 py-5">Date</th>
              <th className="px-3 py-5">Payment Link</th>
              <th className="px-3 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {status === 'loading' && (
              <tr>
                <td colSpan={8} className="text-center pt-4">
                  <div className="px-5">
                    <BulletList className="relative w-full" />
                  </div>
                </td>
              </tr>
            )}
            {status === 'success' && (
              data?.length > 0 ? (
                <>
                  {data?.map((item: any, index: number) => (
                    <tr className="border-t" key={item?.escrowId}>
                      <td className="pl-5 sm:pl-10 pr-3 py-5">{index + 1}</td>
                      <td className="px-3 py-5">
                        <div className="flex items-center space-x-3">
                          <span className="capitalize">{item?.title}</span>
                        </div>
                      </td>
                      <td className="px-3 py-5">{`#${item?.invoiceNumber}`}</td>
                      <td className="px-3 py-5">{formatCurrency(item?.amount)}</td>
                      <td className="px-3 py-5">{formatDateTime(item?.createdAt)}</td>
                      <td className="px-3 py-5">{formatDisbursementType(item?.disbursementType)}</td>
                      <td className="px-3 py-5">
                        <TransactionStatus status={item?.status === 'paymentcompleted' ? item?.escrowDeliveryStatus : item?.status} />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td colSpan={8}>
                    <NoData py="pt-14" />
                  </td>
                </tr>
              )
            )}

            {status === 'error' && (
              <tr>
                <td colSpan={8} className="text-center pt-10">
                  {String(error)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesHistory;
