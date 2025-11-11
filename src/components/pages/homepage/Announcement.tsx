import React from "react";
import Image from "next/image";

import announce from "../../../assets/images/announce.png";
import PinkLogo from "../../../assets/images/logos/pink-3d.png";
import PurpleLogo from "../../../assets/images/logos/purple-3d.png";

const Announcement = () => {
  return (
    <div>
      <section id="announcement" className="w-full relative overflow- py-28">
        <Image
          src={PinkLogo}
          alt="Pink 3D logo"
          className="absolute w-[210px] h-auto top-[400px] -left-20 hidden lg:block"
        />
        <div className="w-full z-10 relative index-content bg-[#FEF2FF] rounded-[60px] flex flex-col gap-10 px-4 xs:px-6 sm:px-8 lg:px-14 py-16">
          <Image src={announce} alt="Announcement" />
          <div className="text-xl font-[400] leading-[170%] text-[#1A1A1A] tracking-[1%] space-y-5">
            <p>
              Bridgee is thrilled to announce its selection into Wema Bank&apos;s
              esteemed Startup Accelerator Programme and a strategic partnership
              with the bank as our financial and payment infrastructure partner.
            </p>
            <p>
              We extend our heartfelt gratitude to Wema Bank&apos;s leadership,
              particularly Solomon Ayodele, Head of Innovation & IDEAx Labs, and
              Babatunde Mumuni, Chief Transformation & Innovation Officer, for
              their unwavering support and commitment to fostering innovation
              among startups.
            </p>
            <p>
              This collaboration not only enhances the security and efficiency
              of our escrow payment platform but also strengthens trust among
              our users, paving the way for a more secure and seamless online
              transaction experience across Nigeria&apos;s digital market.
            </p>
          </div>
        </div>
        <Image
          src={PurpleLogo}
          alt="Purple 3D logo"
          className="absolute w-[190px] h-auto -bottom-1 right-20 hidden md:block"
        />
      </section>
    </div>
  );
};

export default Announcement;
