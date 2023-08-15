import React, { useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';

import FilePreview from '../../../common/FilePreview';
import Button from '../../../inputs/Button';
import NewProposalForm from './NewProposalForm';

const formatActivity = (activity: string) => {
  if (activity === 'escalated') {
    return <span className="">escalated to <b>Bridge Mediator</b></span>;
  }
  if (activity === 'reviewing') {
    return 'is reviewing the dispute, considering all available evidence and communication between the parties.';
  }
  if (activity === 'give verdict') {
    return 'made decision based on available evidence';
  }
  return activity;
};

const activitiesWithAction = ['opened a dispute', 'rejected with a new proposal'];

function ProposalDetails({ data, isLast }: any) {
  const router = useRouter();
  const [showNewProposalForm, setShowNewProposalForm] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-between">
          <p className="text-base mb-2 mr-5">
            <b>{data?.user}&nbsp;</b>
            {formatActivity(data?.activity)}
          </p>
          <p className="text-lightText min-w-max mb-2">{data?.date}</p>
        </div>
        {data?.reason && (
          <p className="">
            <span className="font-bold">Reason: </span>
            {data.reason}
          </p>
        )}
        {data?.comment && (
          <p className="">
            <span className="font-bold">Comment: </span>
            {data.comment}
          </p>
        )}
        {data?.files?.length && (
          <div className="mt-5">
            {data.files.map((file: { filepath: string, filename: string }) => (
              <FilePreview key={file.filepath} file={file} />
            ))}
          </div>
        )}
        {data?.proposal && (
          <div className="bg-inputBg rounded-r-lg border border-l-4 border-l-primary px-5 py-3 mt-5">
            <p className="text-base mb-2">
              <b>{data?.user}&nbsp;</b>
              proposal
            </p>
            <p className="">{data.proposal}</p>
          </div>
        )}
        {data?.decision && (
          <div className="bg-inputBg rounded-r-lg border border-l-4 border-l-primary px-5 py-3 mt-5">
            <p className="text-base mb-2">
              <b>{data?.user}&nbsp;</b>
              decision
            </p>
            <p className="">{data.decision}</p>
          </div>
        )}
      </div>

      {isLast && (
        <>
          {activitiesWithAction.includes(data?.activity) && (
            showNewProposalForm ? (
              <div className="">
                <NewProposalForm onClose={() => setShowNewProposalForm(false)} />
              </div>
            ) : (
              <div className="w-full flex space-x-3">
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
            )
          )}

          {data?.activity === 'give verdict' && (
            <div className="w-full">
              <p className="mb-2">Start delivery process</p>
              <Button
                paddingX="px-3"
                className="mb-3"
                onClick={() => router.push('/disputes/return-goods')}
              >
                Start Now
              </Button>

              <div className="w-full flex bg-yellow-50 text-yellow-500 rounded-r-lg border px-5 py-3 mt-5">
                <HiOutlineExclamationCircle className="w-7 h-7 mr-1" />
                <p className="w-[calc(100%-32px)] font-semibold">
                  You are kindly advised to return the order to the seller within the specified time frame they provided.
                  If you are unable to do so, we are required to release the funds to the seller, as per our terms and conditions.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProposalDetails;
