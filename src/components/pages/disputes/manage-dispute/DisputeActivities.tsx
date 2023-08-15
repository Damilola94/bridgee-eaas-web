import React, { useEffect } from 'react';

import { disputeActivities } from '../../../../sample-data/disputes';
import Button from '../../../inputs/Button';

import ProposalDetails from './ProposalDetails';

function DisputeActivities({ onNext = () => {} }: { onNext?: () => void }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <div className="flex flex-wrap justify-between items-center mb-7">
          <h3 className="font-bold text-xl ff-bold mb-1">Dispute</h3>
          <div className="">
            <Button paddingY="py-2">
              Escalate to Bridge mediator
            </Button>
          </div>
        </div>

        <div className="w-full">
          <ul className="">
            {disputeActivities?.map((item, index) => (
              <li
                key={item?.date}
                className="relative w-full px-5 py-2 border-l-2 border-primary
                before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                before:absolute before:-left-1.5 before:top-3"
              >
                <ProposalDetails data={item} isLast={disputeActivities.length === index + 1} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisputeActivities;
