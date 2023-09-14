import React from 'react';
import { useRouter } from 'next/router';

function KycSteps({ steps }: { steps: { title: string, step: string }[] }) {
  const router = useRouter();
  const { step } = router?.query || {};

  return (
    <div className="absolute z-10 max-w-[250px]">
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <h3 className="font-bold text-xl mb-5">KYC Progress</h3>
        <ul className="w-full border-l-2 border-dashed">
          {steps?.map((item) => (
            <li key={item?.step} className={`relative flex ${item?.step === step
              ? 'text-black' : 'text-lightText'} ff-bold pl-8 -ml-[10px] my-5`}>
              <span className={`absolute left-0 -top-0.5 inline-block w-5 h-5 bg-white border-2 ${
                item?.step === step ? 'border-success' : ''} rounded-full`} />
              {item?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default KycSteps;
