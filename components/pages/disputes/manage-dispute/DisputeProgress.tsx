import React from 'react';

import { disputeProgress } from '../../../../sample-data/disputes';

function DisputeProgress({ onNext = () => {} }: { onNext?: () => void }) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-5">Activities</h3>

        <div className="w-full">
          <ul className="p">
            {disputeProgress?.map((item) => (
              <li
                key={item?.activity}
                className="relative w-full px-5 pt-2 pb-5 border-l-2 border-primary
                before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                before:absolute before:-left-1.5 before:top-2.5"
              >
                <p className="text-lightText">{item?.date}</p>
                <p className="font-bold text-base">{item?.activity}</p>
                <p className="text-lightText">{item?.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisputeProgress;
