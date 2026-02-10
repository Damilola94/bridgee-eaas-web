/* eslint-disable no-console */
import React, { useState } from 'react';
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { RxChevronRight } from 'react-icons/rx';
import { BulletList } from 'react-content-loader';

import { formatDate } from '../../../utilities/dateTime';
import TransactionStatus from '../../common/TransactionStatus';
import useGetQuery from '../../../hooks/useGetQuery';
import NoData from '../../common/NoData';

function DisputeHistory() {
  const [currentTab, setCurrentTab] = useState(0);
  const [cookie] = useCookies(['data']);
  const isBuyer = cookie?.data?.activeRole === 'Buyer';

  const {
    data, status, error, isRefetching
  } = useGetQuery({
    service: "wallet-service/api/v1/",
    endpoint: 'disputes',
    extra: isBuyer ? 'buyer' : '',
    queryKey: ['dispute-history', currentTab],
    pQuery: {
      pageSize: 3,
      pageNumber: 1,
      BuyerId: cookie?.data?.userId,
      status: currentTab === 0 ? 'Pending' : 'Resolved'
    }
  });

  console.log({ error, "errorerror": String(error) });

  return (
    <div className="w-full h-full">
      <div className="bg-white border-b">
        <div className="w-full flex justify-between items-center p-5">
          <h3 className="text-lg font-bold ff-bold">Dispute</h3>
          <Link href="/buyer-disputes">
            <span className="text-primary text-sm flex items-center hover:underline">
              See All
              <RxChevronRight className="w-5 h-auto mb-1" />
            </span>
          </Link>
        </div>
        <div className="w-full flex">
          <div className="w-1/2">
            <button
              type="button"
              onClick={() => setCurrentTab(0)}
              className={`w-full py-2 border-b-4 ${currentTab === 0 ? 'border-primary' : 'border-white'}`}
            >
              Ongoing dispute
            </button>
          </div>
          <div className="w-1/2">
            <button
              type="button"
              onClick={() => setCurrentTab(1)}
              className={`w-full py-2 border-b-4 ${currentTab === 1 ? 'border-primary' : 'border-white'}`}
            >
              Resolved dispute
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-5 h-[calc(100%-100px)] overflow-auto hide-scroll">
        {(status === 'loading' || isRefetching) ? (
          <div className="px-5">
            <BulletList className="relative w-full" />
          </div>
        ) : (
          <>
            {data?.data?.map((item: any) => (
              <div key={item?.id} className="w-full flex justify-between py-3 bg-white shadow-md rounded-lg my-3 p-3">
                <div className="">
                  <div>
                    <p className="text-xs text-lightText">Invoice Reason</p>
                    <p className="text-xs font-bold">{item?.disputeReason}</p>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs text-lightText">Order Reference</p>
                    <p className="text-xs font-bold">{item?.orderReference}</p>
                  </div>
                </div>

                <div className="">
                  <div>
                    <p className="text-xs text-lightText">Status</p>
                    <p className="mt-1">
                      <TransactionStatus status={`Dispute-${item?.status}`} />
                    </p>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs text-lightText">Date Opened</p>
                    <p className="text-xs font-bold">{formatDate(item?.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
            {data?.data?.disputes?.length < 1 && (
              <NoData />
            )}
          </>
        )}
        {status === 'error' && (
          <NoData />
          // <div className="px-5 py-10 text-center">{String(error)}</div>
        )}

      </div>
    </div>
  );
}

export default DisputeHistory;
