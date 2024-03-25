import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Loading from '../../../common/Loading';

import useGetQuery from '../../../../hooks/useGetQuery';

import { useKycContext } from '../../../../context/Kyc';

import { steps } from '../../../../data/kyc';

import KycSteps from './KycSteps';
import SmallKycSteps from './SmallKycSteps';

import PersonalInfoForm from './PersonalInfoForm';
import BvnForm from './BvnForm';
import ResidentialInfoForm from './ResidentialInfoForm';
import IdInfoForm from './IdInfoForm';
import Completion from './Completion';
import SelfieForm from './SelfieForm';

function KycContainer() {
  const { setKycData } = useKycContext();
  const router = useRouter();
  const { step } = router?.query || {};
  const [bvn, setBvn] = useState("");
  const [showCapModal, setShowCapModal] = useState(false);

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

        if (!curr || curr?.kycStatus === 'Rejected') {
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
    return <Loading message={status === 'loading' ? 'Loading KYC data...' : 'Updating KYC data...'} />;
  }

  return (
    <div className="w-full flex justify-center relative">
      <KycSteps steps={steps} />
      <div>
        {step !== 'kyc-completed' && <SmallKycSteps steps={steps} />}
        {step === 'bvn-validation' && <BvnForm setBvn={setBvn} showCapModal={showCapModal} setShowCapModal={setShowCapModal}/>}
        {step === 'take-a-selfie' && <SelfieForm bvn={bvn} showCapModal={showCapModal} setShowCapModal={setShowCapModal}/>}
        {step === 'personal-info' && <PersonalInfoForm />}
        {step === 'nin-details' && <IdInfoForm showCapModal={showCapModal} setShowCapModal={setShowCapModal}/>}
        {step === 'take-a-selfie-nin' && <SelfieForm bvn={bvn} showCapModal={showCapModal} setShowCapModal={setShowCapModal}/>}
        {step === 'residential-info' && <ResidentialInfoForm />}
        {step === 'kyc-completed' && <Completion />}
      </div>
    </div>
  );
}

export default KycContainer;
