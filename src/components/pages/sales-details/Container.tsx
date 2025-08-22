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
    endpoint: 'escrow',
    queryKey: ['escrow', router?.query?.slug],
    param: router?.query?.slug,
    enabled: !!router?.query?.slug
  });

  return (
    <div>
      {status === 'loading' && <Loading />}

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

      {status === 'success' && (
        <div className="w-full">
          <div className="flex flex-wrap -m-4">
            <div className="w-full xl:w-7/12 p-4">
              <div className="w-full">
                <InvoiceDetails data={data?.data} />
              </div>
            </div>

            <div className="w-full xl:w-5/12 p-4">
              <ActivityLog data={data?.data} />
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="w-full py-10">
          {String(error)}
        </div>
      )}
    </div>
  );
}

export default Container;
