import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Banner from '../../assets/svgs/auth-banner.svg';

import IntroSlides from '../pages/auth/IntroSlides';

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

      <div className="w-full h-full pr-5 pl-[45%] py-14 flex justify-center items-center">
        <div className="w-full h-full flex justify-between flex-col">
          <div className="w-full max-w-4xl flex justify-center">
            <Image
              src={Banner}
              alt="Banner"
              priority
              className="!w-[70%] !h-auto !min-w-0 !min-h-0"
            />
          </div>

          <div className="w-[350px] mx-auto lg:w-[400px] max-w-sm text-center">
            <IntroSlides />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
