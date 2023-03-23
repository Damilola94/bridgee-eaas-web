import React, { useState } from 'react';
import Link from 'next/link';
import { RxChevronRight } from 'react-icons/rx';

import { disputes } from '../../../sample-data/disputes';
import { formatDate } from '../../../utilities/dateTime';
import TransactionStatus from '../../common/TransactionStatus';

function DisputeHistory() {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="w-full h-full">
      <div className="bg-white border-b">
        <div className="w-full flex justify-between items-center py-5 pl-5 pr-7">
          <h3 className="text-lg font-bold ff-bold">Dispute</h3>
          <Link href="/disputes">
            <span className="text-primary text-xs flex items-end hover:underline">
              See All
              <RxChevronRight className="w-5 h-auto" />
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

      <div className="w-full pl-5 pr-7 h-[calc(100%-100px)] overflow-auto hide-scroll">
        {disputes?.map((item) => (
          <div key={item?.invoiceNo} className="w-full flex justify-between py-3 bg-white shadow-md rounded-lg my-3 p-3">
            <div className="">
              <div>
                <p className="text-xs text-lightText">Invoice Number</p>
                <p className="text-base font-bold">{item?.invoiceNo}</p>
              </div>
              <div className="mt-5">
                <p className="text-xs text-lightText">InspectionPeriod</p>
                <p className="text-base font-bold">{`${item?.inspectionPeriod} Days`}</p>
              </div>
            </div>

            <div className="">
              <div>
                <p className="text-xs text-lightText">Status</p>
                <p className="mt-1">
                  <TransactionStatus status={item?.status} />
                </p>
              </div>
              <div className="mt-5">
                <p className="text-xs text-lightText">Due Date</p>
                <p className="text-base font-bold">{formatDate(item?.dueDate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisputeHistory;
