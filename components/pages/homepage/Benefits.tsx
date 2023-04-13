import React from 'react';
import Image from 'next/image';

import Arrow from '../../../assets/svgs/benefit-arrow.svg';
import SecurityBadge from '../../../assets/svgs/security-badge.svg';
import TrustBadge from '../../../assets/svgs/trust-badge.svg';
import DisputeBadge from '../../../assets/svgs/dispute-badge.svg';

const benefits = [
  {
    badge: SecurityBadge,
    title: 'Security',
    desc: 'We prevent fraud, misrepresentation, or default by releasing funds only after all transaction terms and conditions are met.'
  },
  {
    badge: TrustBadge,
    title: 'Trust',
    desc: 'We enhance trust by ensuring that both parties are confident in receiving what they expect and fulfilling their obligations.'
  },
  {
    badge: DisputeBadge,
    title: 'Dispute resolution',
    desc: 'We offer neutral third-party assistance to resolve disputes and reach mutually agreeable solutions.'
  }
];

function Benefits() {
  return (
    <div id="why-us" className="w-full py-32">
      <div className="w-full index-content">
        <div className="w-full max-w-xl mdx2:max-w-none text-center mdx2:text-left mx-auto">
          <div className="max-w-4xl mb-5">
            <h1 className="index-title">
              Both the buyer and seller can benefit from increased security
            </h1>
          </div>
          <p className="text-xl mb-12 max-w-2xl">
            We ensure obligations are met, minimizing financial loss and legal disputes for a smooth transaction.
          </p>
        </div>

        <div className="w-full relative pt-20">
          <Image src={Arrow} alt="Badge" width={80} height={80} className="absolute w-[145px] h-auto top-5 -translate-x-1/2 left-1/2" />

          <div className="flex flex-wrap -mx-3">
            {benefits.map((item) => (
              <div className="w-full mdx2:w-1/3 p-3" key={item.title}>
                <div className="w-full max-w-xl mdx2:max-w-[300px] text-center mdx2:text-left mx-auto mb-12">
                  <Image src={item.badge} alt="Badge" width={80} height={80} className="inline-block mb-10" />
                  <h3 className="text-3xl ff-bold mb-4">{item.title}</h3>
                  <p className="text-xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
