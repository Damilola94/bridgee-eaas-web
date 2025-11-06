import React from 'react';
import Image from 'next/image';

import DeliveryImage from '../../../assets/images/invoice-creation.png';

function Intro() {
  return (
    <section className="w-full mt-40">
      <div className="w-full index-content pt-28 pb-32">
        <div className="w-full flex flex-wrap">
          <div className="w-full mdx2:w-7/12 flex items-center max-w-[530px] mx-auto mb-12 mdx2:mb-0">
            <div className="w-full text-center mdx2:text-left pr-5">
              <h1 className="index-title mb-5 max-w-lg">Your Path to Secure, and Convenient Transactions</h1>

              <p className="text-xl leading-snug">
                In today&apos;s fast-paced world,
                you need control over your financial transactions without compromising on security. That&apos;s why we&apos;ve built a platform that empowers you with the tools
                and trust you need to transact securely, efficiently, and with peace of mind.
              </p>
            </div>
          </div>
          <div className="w-full mdx2:w-5/12 max-w-xl mx-auto">
            <div className="w-full h-full flex items-center mt-5 mdx2:mt-0">
              <Image src={DeliveryImage} alt="Delivery image" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
