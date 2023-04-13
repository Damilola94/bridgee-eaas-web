import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Image1 from '../../../assets/images/how-it-works-1.png';
import Image2 from '../../../assets/images/how-it-works-2.png';
import Image3 from '../../../assets/images/how-it-works-3.png';
import Image4 from '../../../assets/images/how-it-works-4.png';
import Image5 from '../../../assets/images/how-it-works-5.png';

const steps = [
  { image: Image1, text: 'Buyer and Seller agree to terms' },
  { image: Image2, text: 'Buyer makes payment to Escrow' },
  { image: Image3, text: 'Seller delivers goods or service to buyer' },
  { image: Image4, text: 'Buyer approves goods or services' },
  { image: Image5, text: 'Escrow releases payment to seller' }
];

function HowItWorks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(function() {
      if (index > 3) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2000);

    return function() {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <div id="how-it-works" className="bg-primary">
      <div className="w-full index-content pt-24 pb-28">
        <h1 className="index-title text-white text-center">How it works in 5 steps</h1>

        <div className="w-full hidden mdx2:flex pt-20">
          <div className="w-1/2 pr-12 py-16 border-r-4 border-[#523488]">
            <div className="w-full h-full flex items-center">
              {steps.map((item, i) => (
                <Image
                  key={item?.text}
                  src={item?.image}
                  alt={item?.text}
                  className={`w-full transition-all ${index === i ? 'h-auto' : 'h-0'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-12">
            <div className="w-full h-full flex items-center">
              <ul className="">
                {steps?.map((item, i) => (
                  <li
                    key={item?.text}
                    className={`ff-bold text-3xl text-white mb-10 ${
                      index !== i ? 'text-opacity-50' : ''}`}
                  >
                    {item?.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mdx2:hidden w-full max-w-xl mx-auto">
          {steps?.map((item) => (
            <div key={item?.text} className="w-full mt-24">
              <h3 className="bg-[#523488] text-white text-2xl ff-bold rounded p-4 mb-5">
                {item?.text}
              </h3>
              <div className="w-full">
                <Image src={item?.image} alt={item?.text} className="w-full h-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
