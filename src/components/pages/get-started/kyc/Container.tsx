import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import PersonalInfoForm from './PersonalInfoForm';
import BvnForm from './BvnForm';
import ResidentialInfoForm from './ResidentialInfoForm';
import IdInfoForm from './IdInfoForm';
import KycSteps from './KycSteps';

const steps = [
  { title: 'Personal Information', step: 'personal-info' },
  { title: 'BVN Validation', step: 'bvn-validation' },
  { title: 'Residential Information', step: 'residential-info' },
  { title: 'ID Card Details', step: 'id-details' }
];

function KycContainer() {
  const router = useRouter();
  const { step } = router?.query || {};

  useEffect(() => {
    if (!router?.query?.step) {
      router.push({ pathname: '/get-started/kyc', query: { step: 'personal-info' } });
    }
  }, [router, router?.query?.status]);

  return (
    <div className="relative  w-full">
      <KycSteps steps={steps} />

      {step === 'personal-info' && <PersonalInfoForm />}
      {step === 'bvn-validation' && <BvnForm />}
      {step === 'residential-info' && <ResidentialInfoForm />}
      {step === 'id-details' && <IdInfoForm />}
    </div>
  );
}

export default KycContainer;
