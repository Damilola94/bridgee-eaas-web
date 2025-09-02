import React from 'react';
import { useRouter } from 'next/router';

import { HiOutlineArrowLeft } from 'react-icons/hi';

import useGetQuery from '../../../hooks/useGetQuery';

import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import InvoiceDetails from './InvoiceDetails';
import ActivityLog from './ActivityLog';

function Container() {
  const router = useRouter();

  const { data, status, error } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "escrows",
    extra: "orders",
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  const { data: activityData, status: activityStatus, error: activityError } = useGetQuery({
    service: "wallet-service/api/v1",
    endpoint: "activitylogs",
    extra: "order",
    queryKey: ['activitylogs', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  return (
    <div>
      {status === 'loading' && <Loading />}
      {activityStatus === 'loading' && <Loading />}

      <div className="w-full mb-3">
        <Button
          border
          onClick={() => router.back()}
          borderColor="border-primary"
          textColor="text-primary"
          bgColor="bg-transparent"
          paddingX="px-3"
          iconPosition="left"
          icon={
            <HiOutlineArrowLeft className="mr-2 mb-0.5" />
          }
        >
            Back
        </Button>
      </div>

      <div className="w-full">
        <div className="flex flex-wrap -m-4">
          {status === 'success' && (
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full">
                <InvoiceDetails data={data?.data} />
              </div>
            </div>
          )}

          {activityStatus === 'success' && (
            <div className="w-full xl:w-5/12 p-4">
              <ActivityLog data={activityData?.data} />
            </div>
          )}
        </div>
      </div>

      {status === 'error' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
      {activityStatus === 'error' && (
        <div className="w-full py-10">
          {String(activityError)}
        </div>
      )}
    </div>
  );
}

export default Container;
