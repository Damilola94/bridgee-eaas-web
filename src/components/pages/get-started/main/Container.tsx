import React from 'react';
import { useRouter } from 'next/router';
import { FaRegUser, FaRegMap } from 'react-icons/fa';

import Button from '../../../inputs/Button';

const options = [
  {
    title: 'Verify your email by completing your KYC',
    desc: 'Complete your KYC for unlimited access',
    icon: <FaRegUser className="w-5 h-5 text-primary" />,
    link: { title: 'Complete KYC', url: '/get-started/kyc' }
  },
  {
    title: 'Take dashboard tour (Optional)',
    desc: 'Your account is currently in test mode, so there are a few more',
    icon: <FaRegMap className="w-6 h-6 text-primary" />,
    link: { title: 'Take tour', url: '/get-started', disabled: true }
  }
];

function GetStartedContainer() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-2xl ff-bold font-bold mb-5">Welcome to your dashboard</h3>
          <p className="text-base text-lightText">
            Your account is currently in test mode, so there are a few more things to
            do before you can go live and start receiving payments.
            Follow the steps below to get activated.
          </p>
        </div>

        <div className="">
          <div className="flex flex-wrap justify-center">
            {options?.map((item) => (
              <div key={item?.title} className="w-full max-w-[300px] bg-white rounded-lg shadow-md px-8 py-10 m-5">
                <div className="w-ful text-center">
                  <span className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-primary/20 mb-5">
                    {item?.icon}
                  </span>
                  <h3 className="text-base ff-bold max-w-[200px] mx-auto mb-5">{item?.title}</h3>
                  <p className="text-base text-lightText max-w-[240px] mx-auto mb-8">{item?.desc}</p>
                  <div className="flex justify-center">
                    <Button
                      paddingY="py-2.5"
                      disabled={item?.link?.disabled}
                      onClick={() => router.push(item?.link?.url)}
                    >
                      {item?.link?.title}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetStartedContainer;
