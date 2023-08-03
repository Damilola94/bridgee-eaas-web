import React from 'react';
import { useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';

import { disputeProgress } from '../../../../sample-data/disputes';
import Button from '../../../inputs/Button';
import NewProposalForm from './NewProposalForm';

function DisputeProgress({ onNext = () => {} }: { onNext?: () => void }) {
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-5">Dispute Activities</h3>

        <div className="w-full">
          <ul className="p">
            {disputeProgress?.map((item) => (
              <li
                key={item?.activity}
                className="relative w-full px-5 pt-2 pb-5 border-l-2 border-primary
                before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                before:absolute before:-left-1.5 before:top-3"
              >
                <div className="w-full">
                  <p className="text-lightText mb-2">{item?.date}</p>
                  <p className="text-base font-bold mb-2">{item?.activity}</p>
                  <p className="">
                    <span className="font-bold">Reason: </span>
                    {item?.reason}
                  </p>
                </div>
                {showNewProposalForm ? (
                  <div className="mt-5">
                    <NewProposalForm onClose={() => setShowNewProposalForm(false)} />
                  </div>
                ) : (
                  <div className="w-full flex space-x-3 mt-5">
                    <Button
                      onClick={() => setShowNewProposalForm(true)}
                      paddingX="px-3" border borderColor="border-error" textColor="text-error" bgColor="bg-white"
                    >
                      <MdClose className="mr-1 mb-1" />
                      Reject
                    </Button>
                    <Button paddingX="px-3">
                      <MdCheck className="mr-1 mb-1" />
                      Accept
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisputeProgress;
