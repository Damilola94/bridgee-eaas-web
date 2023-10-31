import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import HalfCircles from '../../../assets/images/half-circles.png';
import DashboardImg from '../../../assets/images/business-dashboard.png';

import Button from '../../inputs/Button';
import { useHomepageContext } from '../../../context/Homepage';

function Hero() {
  const router = useRouter();
  const { homepageData } = useHomepageContext();

  return (
    <section className="w-full bg-[#FAE9FC]">
      <div className="w-full relative header-content">
        <div className="w-full max-w-3xl mx-auto text-center pt-14">
          <h1 className="text-bold ff-bold text-5xl sm:text-6xl md:text-8xl mb-4">
            Get Empowered to Transact
          </h1>
          <h4 className="text-xl leading-relaxed mb-10">
            With Bridge by ALAT, you&apos;re in control, and you can trust us to safeguard your
            transactions every step of the way.
          </h4>
          <div className="flex justify-center">
            {homepageData?.isWaitlist ? (
              <Button
                onClick={() => router.push('/waitlist')}
                paddingX="px-10"
                paddingY="py-4"
                fontSize='text-lg'
              >
                Join the waiting list
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/signup')}
                paddingX="px-10"
                paddingY="py-4"
                fontSize='text-lg'
              >
                Awesome! Let&apos;s do it
              </Button>

            )}
          </div>
        </div>
        <div className="w-full max-w-5xl mx-auto">
          <Image src={HalfCircles} alt="purple circles" className="w-full h-auto" />
        </div>
        <div className="absolute left-1/2 -bottom-20 sm:-bottom-32 md:-bottom-40 w-full max-w-5xl mx-auto -translate-x-1/2 px-10">
          <Image src={DashboardImg} alt="purple circles" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
