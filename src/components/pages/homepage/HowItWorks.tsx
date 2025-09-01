import React, { useEffect, useState } from "react";
import Image from "next/image";

import Image1 from "../../../assets/images/how-it-works/step1.png";
import Image2 from "../../../assets/images/how-it-works/step2.png";
import Image3 from "../../../assets/images/how-it-works/step3.png";
import Image4 from "../../../assets/images/how-it-works/step4.png";
import Image5 from "../../../assets/images/how-it-works/step5.png";

const steps = [
  { image: Image1, text: "Buyer and Seller agree to terms" },
  { image: Image2, text: "Buyer makes payment to Escrow" },
  { image: Image3, text: "Seller delivers goods or service to buyer" },
  { image: Image4, text: "Buyer approves goods or services" },
  { image: Image5, text: "Escrow releases payment to seller" },
];

function HowItWorks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index > 3) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 2000);

    return function () {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <section id="how-it-works" className="relative overflow-hidden pt-24 pb-16">
      {/* <Image
        src={PinkLogo}
        alt="Pink 3D logo"
        className="absolute w-[210px] h-auto top-[400px] -left-20 hidden lg:block"
      /> */}

      <div className="w-full index-content">
        <h1 className="index-title text-center">How it works</h1>

        <div className="w-full min-h-[600px] h-full hidden mdx2:flex pt-16">
          <div className="w-1/2 pr-12">
            <div className="w-full h-full flex items-center">
              {steps.map((item, i) => (
                <Image
                  key={item?.text}
                  src={item?.image}
                  alt={item?.text}
                  className={`transition-all ${
                    index === i ? "w-full h-auto" : "w-0 h-0"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-12">
            <div className="w-full h-full flex items-center">
              <ul className="">
                {steps?.map((item, i) => (
                  <li key={item?.text} className="mb-12 last:mb-0">
                    <div className="flex items-center text-2xl mb-5">
                      <span
                        className={`w-10 h-10 flex justify-center items-center rounded-full ${
                          index !== i ? "bg-[#E0E0E0]" : "bg-purple"
                        } text-white p-1 mr-4`}
                      >
                        {i + 1}
                      </span>
                      <h4
                        className={`ff-medium ${
                          index !== i ? "text-[#E0E0E0]" : ""
                        }`}
                      >
                        {item?.text}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mdx2:hidden w-full max-w-xl mx-auto">
          {steps?.map((item, i) => (
            <div key={item?.text} className="w-full mt-24">
              <div className="flex justify-center items-center text-xl mb-5">
                <span className="w-8 h-8 flex justify-center items-center rounded-full bg-purple text-white p-1 mr-4">
                  {i + 1}
                </span>
                <h4 className="">{item?.text}</h4>
              </div>
              <div className="w-full">
                <Image
                  src={item?.image}
                  alt={item?.text}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
