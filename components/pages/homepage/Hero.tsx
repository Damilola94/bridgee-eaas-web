import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';

import HeroImage from '../../../assets/images/hero-image.png';
import HeroImageSm from '../../../assets/images/hero-image-sm.png';
import Arrow from '../../../assets/svgs/hero-arrow.svg';

import Button from '../../inputs/Button';

const features = ['Dispute Resolution', 'Fair and transparent fees', 'No extra charges'];

function Hero() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="w-full header-content flex items-center justify-center">
        <div className="w-full flex flex-wrap">
          <div className="w-full mdx2:w-1/2 flex items-center max-w-xl mdx2:max-w-none mx-auto mdx2:mx-0">
            <div className="w-full mdx2:pl-24 py-20 text-center mdx2:text-left">
              <div className="index-title mb-5">
                <h1 className="">Shield yourself from online scams, Protect your transactions with</h1>
                <h1 className="text-primary">Bridge by ALAT</h1>
              </div>
              <p className="text-xl mb-12 max-w-lg">
                Buy and sell anything with confidence - Bridge by ALAT ensures safe transactions and eliminates scam risks
              </p>
              <div className="relative inline-block mb-10">
                <Button
                  onClick={() => router.push('/login')}
                  fontSize="text-sm"
                  bgColor="bg-primary"
                  paddingX="px-5"
                  paddingY="py-3"
                >
                      Get started now
                  <BsArrowRight className="ml-3 w-6 h-auto" />
                </Button>
                <Image src={Arrow} alt="Arrow" className="absolute w-[110px] h-auto -top-3 -left-36" />
              </div>
              <div className="max-w-md flex flex-wrap justify-center mdx2:justify-start mx-auto mdx2:mx-0">
                {features.map((item) => (
                  <div className="flex items-center mr-10 mb-5" key={item}>
                    <BsCheckCircleFill className="text-success mr-2 w-5 h-5" />
                    <span className="text-base font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mdx2:w-1/2 max-w-xl mdx2:max-w-none mx-auto mdx2:mx-0">
            <div className="hidden mdx2:block w-[calc(100%+20px)] relative">
              <Image src={HeroImage} priority alt="Hero background" className="w-full h-auto" />
              <div className="image-blurred-edge absolute top-0 flex w-full h-full"></div>
            </div>
            <div className="block mdx2:hidden w-[calc(100%+39px)] -ml-5">
              <Image src={HeroImageSm} priority alt="Hero background" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
