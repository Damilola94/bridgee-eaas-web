import React from "react";
import Image from "next/image";

import PinkLogo from "../../../assets/images/logos/pink-3d.png";

function Hero() {
  return (
    <section className="w-full relative bg-[#FAE9FC] overflow- pb-32">
      <Image
        src={PinkLogo}
        alt="Pink 3D logo"
        className="absolute w-[180px] h-auto top-[150px] -left-20 hidden lg:block"
      />
      <div className="w-full relative header-content overflow-visible">
        <div className="w-full max-w-3xl mx-auto text-center pt-14 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center p-1.5 bg-transparentPurple rounded-xl w-fit text-success my-8">
            Blog
          </div>
          <h1 className="text-bold ff-bold text-3xl sm:text-3xl md:text-5xl mb-4 md:leading-tight">
            Insights, Tips, and Stories from the World of Online Transactions
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
