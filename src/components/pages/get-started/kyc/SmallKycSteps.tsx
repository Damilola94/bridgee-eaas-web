import React from 'react';
import { useRouter } from 'next/router';

function SmallKycSteps({ steps }: { steps: { title: string, step: string, stage: string }[] }) {
  const router = useRouter();

  const { step } = router?.query || {};

  const currentFormIndex = steps.findIndex((item) => item.step === step);
  const percent = (currentFormIndex + 1) / steps?.length * 100;

  return (
    <div className="sm:hidden w-full max-w-md mx-auto mb-5">
      <div className="w-full">
        <p className="text-lightText text-sm">
          Step {currentFormIndex + 1} of {steps?.length}
        </p>
        <h3 className="font-bold text-xl my-1">{steps[currentFormIndex]?.title}</h3>
        <div className="w-full">
          <div className="w-full h-2 relative bg-[#DFDFDF] rounded-full overflow-hidden">
            <div style={{ width: `${percent}%` }} className="h-full bg-success rounded-full absolute top-0 left-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallKycSteps;
