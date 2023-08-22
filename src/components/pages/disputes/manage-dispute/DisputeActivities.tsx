import React, { useEffect } from 'react';
import { List } from 'react-content-loader';
import { useDisputeContext } from '../../../../context/Dispute';

import useGetQuery from '../../../../hooks/useGetQuery';
import Button from '../../../inputs/Button';

import ActivityDetails from './ActivityDetails';

function DisputeActivities({ onNext = () => {} }: { onNext?: () => void }) {
  const { dispute } = useDisputeContext();
  const { data, status, error } = useGetQuery({
    endpoint: 'dispute',
    extra: `${dispute?.id}/activities`,
    queryKey: ['dispute-activities', dispute?.id],
    enabled: !!dispute?.id
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        {status === 'loading' && (
          <List />
        )}

        {status === 'success' && (
          <>
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
                {data?.data?.map((item: any, index: number) => (
                  <li
                    key={item?.date}
                    className="relative w-full px-5 py-2 border-l-2 border-primary
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
    </div>
  );
}

export default DisputeActivities;
