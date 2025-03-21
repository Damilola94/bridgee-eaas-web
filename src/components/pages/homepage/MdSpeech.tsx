import React from "react";
import Image from "next/image";

import MDSpeech from "../../../assets/images/md-speech.png";

function Intro() {
  return (
    <section className="max-w-7xl mx-auto rounded-2xl mt-96 bg-[#FEF2FF]">
      <div className="w-full  pt-28 pb-32">
        <div className="w-full flex flex-wrap">
          <div className="w-full mdx2:w-5/12 max-w-xl mx-auto mb-12">
            <div className="w-full h-full flex items-center mt-5 mdx2:mt-0">
              <Image
                src={MDSpeech}
                alt="Delivery image"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="w-full mdx2:w-7/12 flex items-center max-w-[530px] mx-auto  mdx2:mb-0">
            <div className="w-full text-justify sm:text-center mdx2:text-left pr-5">
              <p className="text-xl leading-relaxed">
                Bridge is thrilled to announce its selection into Wema Bank’s
                esteemed Startup Accelerator Programme and a strategic
                partnership with the bank as our financial and payment
                infrastructure partner.
              </p>
              <br />
              <p className="text-xl leading-relaxed">
                We extend our heartfelt gratitude to Wema Bank’s leadership,
                particularly Solomon Ayodele, Head of Innovation & IDEAx Labs,
                and Babatunde Mumuni, Chief Transformation & Innovation Officer,
                for their unwavering support and commitment to fostering
                innovation among startups.
              </p>
              <br />
              <p className="text-xl leading-relaxed">
                This collaboration not only enhances the security and efficiency
                of our escrow payment platform but also strengthens trust among
                our users, paving the way for a more secure and seamless online
                transaction experience across Nigeria’s digital market.
              </p>
              <h1 className="text-3xl font-bold mt-6">Jerry Peter</h1>
              <p className="text-xl leading-relaxed">
              CEO, Bridge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
