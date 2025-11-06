import React from "react";
import Image from "next/image";

import Credibility from "../../../assets/svgs/badges/user-tick.svg";
import Confidence from "../../../assets/svgs/badges/credibility.svg";
import Growth from "../../../assets/svgs/badges/growth.svg";
import Community from "../../../assets/svgs/badges/community.svg";

const benefits = [
  {
    badge: Credibility,
    bg: "#EDF9F9",
    title: "Credibility",
    desc: "Build a business people believe in. We help you prove your authenticity with verified profiles, transparent reviews, and systems that make customers feel safe buying from you."
  },
  {
    badge: Confidence,
    bg: "#FAE9FC",
    title: "Confidence",
    desc: "Sell with peace of mind. Whether it’s secure payments or dispute protection, We give both you and your customers the confidence to transact freely and fairly."
  },
  {
    badge: Growth,
    bg: "#E8F6FF",
    title: "Growth",
    desc: "Turn trust into sales. More credibility = more customers. We help you scale faster through insights, spotlight features, and tools that position you as a trusted vendor."
  },
  {
    badge: Community,
    bg: "#E8F6FF",
    title: "Community",
    desc: "You’re not doing business alone. We connect you to a network of verified vendors, partners, and buyers; so you can learn, grow, and succeed together."
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
            Bridge is designed with your needs in mind, ensuring that you enjoy a secure, efficient, and transparent experience. Explore the benefits of using Bridge below:
          </p>
        </div>

        <div className="w-full relative pt-20">
          <div className="flex flex-wrap -mx-3">
            {benefits.map((item) => (
              <div className="w-full flex mdx2:w-1/2 p-3" key={item.title}>
                <div
                  style={{ backgroundColor: item?.bg }}
                  className="w-full h-full max-w-xl mdx2:max-w-[550px] mx-auto p-5 rounded-2xl"
                >
                  <Image
                    src={item.badge}
                    alt="Badge"
                    width={80}
                    height={80}
                    className="inline-block mb-10"
                  />
                  <h3 className="text-3xl ff-medium mb-4">{item.title}</h3>
                  <p className="text-xl leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Image src={PurpleLogo} alt="Purple 3D logo" className="absolute w-[190px] h-auto -bottom-20 right-20 hidden md:block" /> */}
    </section>
  );
}

export default Benefits;
