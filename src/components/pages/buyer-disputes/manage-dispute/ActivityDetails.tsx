import React, { useState } from 'react';
import { MdClose, MdCheck } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import FilePreview from '../../../common/FilePreview';
import Button from '../../../inputs/Button';

import { useAccountsContext } from '../../../../context/Accounts';
import { formatDateTime } from '../../../../utilities/dateTime';
import { proposalsObject, shippingStatuses } from '../../../../data/dispute';
import notification from '../../../../utilities/notification';
import handleFetch from '../../../../services/api/handleFetch';
import { useDisputeContext } from '../../../../context/Dispute';
import ConfirmPrompt from '../../../common/ConfirmPrompt';
import Loading from '../../../common/Loading';
import SelectInput, { SelectOptionType } from '../../../inputs/Select';

import NewProposalForm from './NewProposalForm';
import DisputeShipmentDetails from './actions/DisputeShipmentDetails';

const formatActivity = (activity: string) => {
  if (activity === 'escalated') {
    return (
      <span className="">
        escalated to
        <b>Bridgee Mediator</b>
      </span>
    );
  }
  if (activity === 'reviewing') {
    return 'is reviewing the dispute, considering all available evidence and communication between the parties.';
  }
  if (activity === 'give verdict') {
    return 'made decision based on available evidence';
  }
  return activity;
};

const formatActionType = (activity: string) => {
  if (activity === 'shipped return items') return 'Return';
  if (activity === 'shipped replaced items') return 'Replacement';
  if (activity === 'shipped additional items') return 'AdditionalShipment';
  return undefined;
};

const activitiesWithAction = [
  'opened a dispute',
  'rejected with a new proposal',
  'proposed a new proposal',
  'proposed a new proposal'
];

const activitiesWithInvoice = [
  'shipped return items',
  'shipped replaced items',
  'shipped additional items'
];

function ActivityDetails({ data, isLast }: any) {
  const router = useRouter();
  const { accounts } = useAccountsContext();
  const { dispute } = useDisputeContext();

  const [showNewProposalForm, setShowNewProposalForm] = useState(false);
  const [showAcceptancePrompt, setShowAcceptancePrompt] = useState(false);
  const [showShippingUpdatePrompt, setShowShippingUpdatePrompt] = useState(false);
  const [showShippingConfirmationPrompt, setShowShippingConfirmationPrompt] = useState(false);

  const [shippingStatus, setShippingStatus] = useState<SelectOptionType>();

  const isUser = data?.user
    === (accounts?.defaultMerchant?.name || `${accounts?.user?.firstName} ${accounts?.user?.lastName}`);

  const queryClient = useQueryClient();
  const acceptanceMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['dispute-activities']);
      queryClient.invalidateQueries(['escrow-details', router?.query?.slug]);

      notification({
        title: 'Successful',
        message: res?.message || 'Dispute opened successfully',
        type: 'success'
      });
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const shippingMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['dispute-activities']);
      queryClient.invalidateQueries(['escrow-details', router?.query?.slug]);

      notification({
        title: 'Successful',
        message: res?.message || 'Dispute opened successfully',
        type: 'success'
      });
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const shippingConfirmationMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['dispute-activities']);
      queryClient.invalidateQueries(['escrow-details', router?.query?.slug]);

      notification({
        title: 'Successful',
        message: res?.message || 'Dispute opened successfully',
        type: 'success'
      });
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleAcceptance = () => {
    setShowAcceptancePrompt(false);
    acceptanceMutation.mutate({
      endpoint: 'dispute', extra: `${dispute?.id}/accept`, method: 'PATCH', auth: true
    });
  };

  const processShippingUpdate = () => {
    if (!shippingStatus?.value) {
      notification({
        title: 'Process Error',
        message: 'Please, select a status',
        type: 'danger'
      });
      return;
    }
    setShowShippingUpdatePrompt(true);
  };

  const handleShippingStatusUpdate = () => {
    setShowShippingUpdatePrompt(false);
    shippingMutation.mutate({
      endpoint: 'dispute',
      extra: `${dispute?.id}/update-shipped-order-status`,
      method: 'PATCH',
      auth: true,
      pQuery: { requestStatus: shippingStatus?.value }
    });
  };

  const handleShippingConfirmation = () => {
    setShowShippingConfirmationPrompt(false);
    shippingConfirmationMutation.mutate({
      endpoint: 'dispute', extra: `${dispute?.id}/confirm-shipped-order`, method: 'PATCH', auth: true
    });
  };

  const { isLoading } = acceptanceMutation;
  const { isLoading: isLoadingShipping } = shippingMutation;
  const { isLoading: isLoadingConfirmation } = shippingConfirmationMutation;

  return (
    <div className="w-full">
      {(isLoading || isLoadingShipping || isLoadingConfirmation) && <Loading />}

      <div className="w-full mb-4">
        <div className="flex flex-wrap sm:flex-nowrap justify-between">
          <p className="text-base mb-2 mr-5">
            <b>
              {isUser ? 'You' : data?.user}
&nbsp;
            </b>
            {formatActivity(data?.activity)}
          </p>
          <p className="text-lightText min-w-max mb-2">{formatDateTime(data?.date)}</p>
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
        {data?.proposal?.name && (
          <div className="bg-inputBg rounded-r-lg border border-l-4 border-l-primary px-5 py-3 mt-5">
            <p className="text-base mb-2">
              <b>
                {isUser ? 'Your' : data?.user}
&nbsp;
              </b>
              proposal
            </p>
            <p className="">{proposalsObject[data.proposal.name as keyof typeof proposalsObject]}</p>
          </div>
        )}
        {data?.decision && (
          <div className="bg-inputBg rounded-r-lg border border-l-4 border-l-primary px-5 py-3 mt-5">
            <p className="text-base mb-2">
              <b>
                {data?.user}
&nbsp;
              </b>
              decision
            </p>
            <p className="">{data.decision}</p>
          </div>
        )}
        {activitiesWithInvoice.includes(data?.activity) && (
          <DisputeShipmentDetails
            disputeId={dispute?.id}
            actionType={formatActionType(data?.activity)}
          />
        )}
      </div>

      {isLast && (
        <>
          {activitiesWithAction.includes(data?.activity?.toLowerCase()) && !isUser && (
            showNewProposalForm ? (
              <div className="">
                <NewProposalForm onClose={() => setShowNewProposalForm(false)} />
              </div>
            ) : (
              <div className="w-full flex space-x-3">
                <Button
                  onClick={() => setShowNewProposalForm(true)}
                  paddingX="px-3"
                  border
                  borderColor="border-error"
                  textColor="text-error"
                  bgColor="bg-white"
                >
                  <MdClose className="mr-1 mb-1" />
                  Reject
                </Button>
                <Button paddingX="px-3" onClick={() => setShowAcceptancePrompt(true)}>
                  <MdCheck className="mr-1 mb-1" />
                  Accept
                </Button>
              </div>
            )
          )}

          {data?.shippingStat === 'Initiator' && (
            <div className="w-full">
              <p className="mb-2">Start shipment process</p>
              <Button
                paddingX="px-3"
                className="mb-3"
                onClick={() => router.push(`/disputes/return-goods/${dispute?.invoiceId}`)}
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

          {data?.shippingStat === 'Recipient' && (
            <p className="">
              The shipment of your good(s) is yet to resume.
            </p>
          )}

          {data?.statusUpdateStat === 'Initiator' && (
            <div className="">
              <p className="mb-3">Process your delivery:</p>
              <div className="xs:flex">
                <SelectInput
                  height="h-[35px]"
                  placeholder="Select Status"
                  value={shippingStatus}
                  onChange={(val: any) => setShippingStatus(val)}
                  options={shippingStatuses || []}
                  className="w-full max-w-[250px] mr-5 mb-4 xs:mb-0"
                />
                <Button onClick={processShippingUpdate}>Process</Button>
              </div>
            </div>
          )}

          {data?.confirmStat === 'Initiator' && (
            <div className="">
              <p className="">The goods has been delivered to you. Inspect the goods, then confirm if it is in good condition.</p>
              <div className="w-full flex flex-wrap">
                <Button
                  border
                  paddingX="px-3"
                  borderColor="border-error"
                  textColor="text-error"
                  bgColor="bg-white"
                  className="mr-3 mt-3"
                >
                  <MdClose className="mr-1 mb-1" />
                  Raise Dispute
                </Button>
                <Button
                  paddingX="px-3"
                  className="mt-3"
                  onClick={() => setShowShippingConfirmationPrompt(true)}
                >
                  <MdCheck className="mr-1 mb-1" />
                  Confirm Shipment
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmPrompt
        title="Confirm action"
        message="Are you sure you want to accept this dispute proposal?"
        isOpen={showAcceptancePrompt}
        handleYes={handleAcceptance}
        onClose={() => setShowAcceptancePrompt(false)}
      />

      <ConfirmPrompt
        title="Confirm action"
        message={`Are you sure you want to change the status to "${shippingStatus?.label}"?`}
        isOpen={showShippingUpdatePrompt}
        handleYes={handleShippingStatusUpdate}
        onClose={() => setShowShippingUpdatePrompt(false)}
      />

      <ConfirmPrompt
        title="Confirm action"
        message="Are you sure you want to confirm the delivery of the shipped goods?"
        isOpen={showShippingConfirmationPrompt}
        handleYes={handleShippingConfirmation}
        onClose={() => setShowShippingConfirmationPrompt(false)}
      />
    </div>
  );
}

export default ActivityDetails;
