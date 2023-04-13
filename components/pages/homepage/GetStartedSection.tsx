import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

import Arrow from '../../../assets/svgs/started-arrow.svg';

import Button from '../../inputs/Button';

function GetStartedSection() {
  const router = useRouter();

  return (
    <div className="bg-primary">
      <div className="index-content w-full pt-24 pb-32">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h1 className="index-title mb-12">
            Get started now
          </h1>
          <p className="text-xl leading-loose">
            Buy and Sell Anything with Confidence - Bridge by ALAT Ensures Safe Transactions and Eliminates Scam Risks
          </p>

          <div className="relative inline-block mx-auto mt-10">
            <Button
              onClick={() => router.push('/login')}
              fontSize="text-sm"
              bgColor="bg-white"
              textColor="text-primary"
              paddingX="px-5"
              paddingY="py-3"
            >
              Get started now
              <BsArrowRight className="ml-3 w-6 h-auto" />
            </Button>
            <Image src={Arrow} alt="Arrow" className="absolute w-[110px] h-auto -bottom-12 -left-32" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default GetStartedSection;
