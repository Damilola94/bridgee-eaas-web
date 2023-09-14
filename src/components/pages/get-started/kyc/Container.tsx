import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import PersonalInfoForm from './PersonalInfoForm';
import BvnForm from './BvnForm';
import ResidentialInfoForm from './ResidentialInfoForm';
import IdInfoForm from './IdInfoForm';

// const forms = [
//   { title: 'Personal Information', tab: 'personal-info' },
//   { title: 'BVN Validation', tab: 'bvn-validation' },
//   { title: 'Residential Information', tab: 'residential-info' },
//   { title: 'ID Card Details', tab: 'id-details' }
// ];

function KycContainer() {
  const router = useRouter();
  const { tab } = router?.query || {};

  useEffect(() => {
    if (!router?.query?.tab) {
      router.push({ pathname: '/get-started/kyc', query: { tab: 'personal-info' } });
    }
  }, [router, router?.query?.status]);

  return (
    <div className="w-full">
      {tab === 'personal-info' && <PersonalInfoForm />}
      {tab === 'bvn-validation' && <BvnForm />}
      {tab === 'residential-info' && <ResidentialInfoForm />}
      {tab === 'id-details' && <IdInfoForm />}
    </div>
  );
}

export default KycContainer;
