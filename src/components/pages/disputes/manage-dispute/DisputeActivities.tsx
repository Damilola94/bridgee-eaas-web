import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { List } from 'react-content-loader';
import { useMutation, useQueryClient } from 'react-query';

import { useDisputeContext } from '../../../../context/Dispute';
import useGetQuery from '../../../../hooks/useGetQuery';
import handleFetch from '../../../../services/api/handleFetch';
import notification from '../../../../utilities/notification';
import ConfirmPrompt from '../../../common/ConfirmPrompt';
import Loading from '../../../common/Loading';
import TransactionStatus from '../../../common/TransactionStatus';
import Button from '../../../inputs/Button';

import ActivityDetails from './ActivityDetails';

function DisputeActivities() {
  const router = useRouter();
  const { dispute } = useDisputeContext();
  const [showEscalationPrompt, setShowEscalationPrompt] = useState(false);

  const { data, status, error } = useGetQuery({
    endpoint: 'dispute',
    extra: `${dispute?.id}/activities`,
    queryKey: ['dispute-activities', dispute?.id],
    enabled: !!dispute?.id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const queryClient = useQueryClient();
  const escalationMutation = useMutation(handleFetch, {
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

  const handleEscalation = () => {
    setShowEscalationPrompt(false);
    escalationMutation.mutate({
      endpoint: 'dispute',
      extra: `${dispute?.id}/escalate-to-arbitrator`,
      method: 'PATCH',
      auth: true
    });
  };

  const { isLoading } = escalationMutation;

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      {isLoading && <Loading />}

      <div className="w-full px-10 py-8 border-b">
        {status === 'loading' && (
          <List />
        )}

        {status === 'success' && (
          <>
            <div className="flex flex-wrap justify-between items-center mb-7">
              <div className="flex items-center space-x-2  mb-2">
                <h3 className="font-bold text-xl ff-bold">Dispute</h3>
                <div>
                  <TransactionStatus status={`dispute-${dispute?.status}`} />
                </div>
              </div>
              <div className="">
                <Button paddingY="py-2" onClick={() => setShowEscalationPrompt(true)}>
                  Escalate to Bridge mediator
                </Button>
              </div>
            </div>

            <div className="w-full">
              <ul className="">
                {data?.data?.map((item: any, index: number) => (
                  <li
                    key={item?.date}
                    className="relative w-full pl-5 py-2 border-l-2 border-primary
                    before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                    before:absolute before:-left-1.5 before:top-3"
                  >
                    <ActivityDetails data={item} isLast={data?.data?.length === index + 1} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="">
            {String(error)}
          </div>
        )}
      </div>

      <ConfirmPrompt
        title='Confirm action'
        message='Are you sure you want to escalate this dispute to Bridge mediator?'
        isOpen={showEscalationPrompt}
        handleYes={handleEscalation}
        onClose={() => setShowEscalationPrompt(false)}
      />
    </div>
  );
}

export default DisputeActivities;
