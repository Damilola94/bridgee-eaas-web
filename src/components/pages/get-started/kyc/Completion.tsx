import React from 'react';
import { useRouter } from 'next/router';

import Button from '../../../inputs/Button';

function Completion() {
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="mb-5">
            <h2 className="font-bold text-xl">KYC information</h2>
          </div>

          <div className="font-bold mb-10">
            <p className="text-lightText mb-1">
              Your KYC information has been submitted successfully.
            </p>
            <p className="text-success">
              We&apos;ll notify you once your application has been approved.
            </p>
          </div>

          <div className="">
            <Button
              border
              borderColor="border-gray-300"
              bgColor="bg-white"
              textColor="text-black"
              paddingY="py-3"
              onClick={() => router.push('/get-started/kyc?step=id-details')}
            >
              Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Completion;
