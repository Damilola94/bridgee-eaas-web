import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '../../assets/svgs/auth-banner.svg';

import IntroSlides from '../layouts/IntroSlides';

type Props = {
  title: string,
  children: React.ReactNode
}

function AuthWrapper({ title, children }: Props) {
  return (
    <div className="h-screen relative bg-auth-bg bg-primary bg-cover bg-center">
      <Head>
        <title>{title}</title>
      </Head>

      <div className="fixed top-0 left-0 w-[45%] h-full min-h-screen overflow-auto bg-white">
        {children}
      </div>

      <div className="w-full h-full p-5 pl-[45%] flex justify-center items-center">
        <div className="text-center w-full">
          <div className="-mt-20 max-w-4xl mx-auto">
            <Image
              src={Banner}
              alt="Banner"
              layout="responsive"
              className="!w-[70%] !h-auto !min-w-0 !min-h-0"
            />
          </div>

          <div className="w-[350px] mx-auto lg:w-[400px] max-w-sm">
            <IntroSlides />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
