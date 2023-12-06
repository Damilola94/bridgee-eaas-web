import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Link from 'next/link';

import DangerIcon from '../../../assets/svgs/danger.svg';
import useGetQuery from '../../../hooks/useGetQuery';
import { steps } from '../../../data/kyc';

function IncompleteKycNotifier() {
  const [isIncomplete, setIsIncomplete] = useState(false);

  const { data, status } = useGetQuery({
    endpoint: 'user', extra: 'user-information', queryKey: ['user-information', 'kyc notifier']
  });

  useEffect(() => {
    if (status === 'success') {
      for (let i = 0; i < steps.length; i += 1) {
        const curr = data?.data?.kycStages?.find((stage: any) => stage?.kycStage === steps[i]?.stage);

        if (!curr) {
          setIsIncomplete(true);
          break;
        }
      }
    }
  }, [status, data]);

  if (!isIncomplete) return null;

  return (
    <div className="w-full mb-3">
      <div className="bg-white w-full px-5 py-4 rounded-lg shadow border border-error">
        <div className="flex items-end space-x-2 mb-1">
          <Image src={DangerIcon} alt="danger" />
          <p className="text-lightText text-base font-bold">Complete your KYC</p>
        </div>
        <div className="flex">
          <p className="text-lightText">
            Kindly provide the requested information to fully verify your account.
            {' '}
            <Link href="/get-started/kyc" className="text-primary font-bold hover:underline">Get Started</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default IncompleteKycNotifier;
