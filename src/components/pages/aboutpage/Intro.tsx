import React from 'react';
import Image from 'next/image';

import TeamImage from '../../../assets/images/teams.png';

function Intro() {
  return (
    <section className="w-full ">
      <div className="w-full index-content pt-28 pb-32">
        <div className="w-full flex flex-wrap">
          <div className="w-full mdx2:w-1/2 max-w-xl mx-auto">
            <div className="w-full h-full flex items-center mt-5 mdx2:mt-0">
              <Image src={TeamImage} alt="Delivery image" className="w-full h-auto rounded-xl" />
            </div>
          </div>
          <div className="w-full mdx2:w-1/2 flex items-center max-w-[530px] mx-auto mb-12 mt-12  mdx2:mb-0 mdx2:mt-0">
            <div className="w-full text-center mdx2:text-left pr-5">
              <h1 className="index-title mb-5">Who We Are</h1>
              <p className="text-xl leading-relaxed">
                In today&apos;s fast-paced world, you need control over your financial transactions
                without compromising on security. That&apos;s why we&apos;ve built a platform that
                empowers you with the tools and trust you need to transact securely,
                efficiently, and with peace of mind.
              </p>
              <br/>
              <p className="text-xl leading-relaxed">
              What sets Bridge apart is our strong partnership with Wema Bank, one of Nigeria&apos;s leading financial institutions. This collaboration empowers Bridge with the financial expertise, security infrastructure, and resources necessary to deliver a reliable and trustworthy service to our users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
