import React from 'react';
import Image from 'next/image';

import SecurityBadge from '../../../assets/svgs/badges/security.svg';
import TrustBadge from '../../../assets/svgs/badges/trust.svg';
import DisputeBadge from '../../../assets/svgs/badges/dispute.svg';

import PurpleLogo from '../../../assets/images/logos/purple-3d.png';

const benefits = [
  {
    badge: SecurityBadge,
    bg: '#EDF9F9',
    title: 'Security',
    desc: 'We prevent fraud, misrepresentation, or default by releasing funds only after all transaction terms and conditions are met.'
  },
  {
    badge: TrustBadge,
    bg: '#FAE9FC',
    title: 'Trust',
    desc: 'We enhance trust by ensuring that both parties are confident in receiving what they expect and fulfilling their obligations.'
  },
  {
    badge: DisputeBadge,
    bg: '#E8F6FF',
    title: 'Dispute resolution',
    desc: 'We offer neutral third-party assistance to resolve disputes and reach mutually agreeable solutions.'
  }
];

function Benefits() {
  return (
    <section id="why-us" className="w-full relative overflow- py-28">
      <div className="w-full index-content">
        <div className="w-full max-w-4xl text-center mx-auto">
          <h1 className="index-title mb-7">
            Here&apos;s what you stand to gain
          </h1>
          <p className="text-xl leading-relaxed">
            Bridge is designed with your needs in mind, ensuring that you enjoy a secure,
            efficient, and transparent experience. Explore the benefits of using UseBridge Escrow below:
          </p>
        </div>

        <div className="w-full relative pt-20">
          <div className="flex flex-wrap -mx-3">
            {benefits.map((item) => (
              <div className="w-full flex mdx2:w-1/3 p-3" key={item.title}>
                <div
                  style={{ backgroundColor: item?.bg }}
                  className="w-full h-full max-w-xl mdx2:max-w-[350px] mx-auto p-5 rounded-2xl"
                >
                  <Image src={item.badge} alt="Badge" width={80} height={80} className="inline-block mb-10" />
                  <h3 className="text-3xl ff-medium mb-4">{item.title}</h3>
                  <p className="text-xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Image src={PurpleLogo} alt="Purple 3D logo" className="absolute w-[190px] h-auto -bottom-20 right-20 hidden md:block" />
    </section>
  );
}

export default Benefits;
