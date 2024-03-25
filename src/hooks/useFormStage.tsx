import { useRouter } from 'next/router';

import { useKycContext } from '../context/Kyc';
import { stepsByStep } from '../data/kyc';

function useFormStage() {
  const router = useRouter();
  const { kycData } = useKycContext();

  const { kycStages } = kycData || {};
  const { step } = router?.query || {};

  const formStage = kycStages?.find((stage: any) => stage?.kycStage === stepsByStep?.[step as keyof typeof stepsByStep]);

  console.log(kycData, "kycData", stepsByStep, "stepsByStep");

  return formStage;
}

export default useFormStage;
