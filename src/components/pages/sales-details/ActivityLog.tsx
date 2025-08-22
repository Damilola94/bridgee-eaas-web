import React from 'react';

import { formatDateTime } from '../../../utilities/dateTime';
import NoData from '../../common/NoData';

function ActivityLog({ data = {} }: { data: any }) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-5">Activities</h3>

        <div className="w-full">
          <ul className="p">
            {data?.activities?.map((item: any) => (
              <li
                key={JSON.stringify(item)}
                className="relative w-full px-5 pt-2 pb-5 border-l-2 border-primary
                before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                before:absolute before:-left-1.5 before:top-[13px]"
              >
                <p className="text-lightText">{formatDateTime(item?.datetime)}</p>
                <p className="font-bold text-base">{item?.title}</p>
              </li>
            ))}
          </ul>

          {data?.activities?.length < 1 && <NoData message="No activity yet" py="py-5" />}
        </div>
      </div>
    </div>
  );
}

export default ActivityLog;
