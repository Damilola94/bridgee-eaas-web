import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import PersonalInfoForm from './PersonalInfoForm';
import BvnForm from './BvnForm';
import ResidentialInfoForm from './ResidentialInfoForm';
import IdInfoForm from './IdInfoForm';
import KycSteps from './KycSteps';
import useGetQuery from '../../../../hooks/useGetQuery';
import Loading from '../../../common/Loading';
import { useKycContext } from '../../../../context/Kyc';
import Completion from './Completion';
import { steps } from '../../../../data/kyc';

function KycContainer() {
  const { setKycData } = useKycContext();
  const router = useRouter();
  const { step } = router?.query || {};

  const { data, status, isFetching } = useGetQuery({
    endpoint: 'user', extra: 'user-information', queryKey: ['user-information']
  });

  useEffect(() => {
    if (status === 'success') {
      setKycData(data?.data);
    }
  }, [status, data, setKycData]);

  useEffect(() => {
    if (status === 'success') {
      let isOngoing = false;

      for (let i = 0; i < steps.length; i += 1) {
        const curr = data?.data?.kycStages?.find((stage: any) => stage?.kycStage === steps[i]?.stage);

        if (!curr) {
          isOngoing = true;
          router.push({ pathname: '/get-started/kyc', query: { step: steps[i]?.step } });
          break;
        }
      }
      if (!isOngoing) {
        router.push({ pathname: '/get-started/kyc', query: { step: 'kyc-completed' } });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status]);

  if (status === 'loading' || isFetching) {
    return <Loading message={isFetching ? 'Updating KYC data...' : 'Loading KYC data...'} />;
  }

  return (
    <div className="w-full flex justify-center">
      <KycSteps steps={steps} />
      <div className="">
        {step === 'personal-info' && <PersonalInfoForm />}
        {step === 'bvn-validation' && <BvnForm />}
        {step === 'residential-info' && <ResidentialInfoForm />}
        {step === 'id-details' && <IdInfoForm />}
        {step === 'kyc-completed' && <Completion />}
      </div>
    </div>
  );
}

export default KycContainer;
