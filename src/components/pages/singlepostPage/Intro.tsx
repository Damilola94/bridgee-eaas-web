import React from "react";
import Image from "next/image";

import SinglePost from "../../../assets/images/single-post.png";

import ShareFeature from "./ShareFeature";

function BlogPage() {
  return (
    <section id="why-us" className="w-full relative overflow- mb-36">
      <div className="w-full index-content max-w-4xl">
        <div className="w-full relative pt-5">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full">
              <div className="w-full mdx2:w-full mx-auto max-w-4xl">
                <div className="w-full h-full  items-center mt-5 mdx2:mt-0">
                  <Image
                    src={SinglePost}
                    alt="Single Post"
                    className="w-full h-auto rounded-xl"
                  />
                  <ShareFeature />

                </div>
              </div>
              <div className="w-full mdx2:w-full flex items-center max-w-4xl mx-auto mb-12 mt-12 mdx2:mb-0  ">
                <div className="w-full text-center mdx2:text-left pr-5">
                  <p className="text-lg leading-relaxed">
                    Bridge is thrilled to announce its selection into Wema Bank’s esteemed Startup Accelerator Programme and a strategic partnership with the bank as our financial and payment infrastructure partner.
                  </p>
                  <br />
                  <p className="text-lg  leading-relaxed">
                    We extend our heartfelt gratitude to Wema Bank’s leadership, particularly Solomon Ayodele, Head of Innovation & IDEAx Labs, and Babatunde Mumuni, Chief Transformation & Innovation Officer, for their unwavering support and commitment to fostering innovation among startups.
                  </p>
                  <br />
                  <p className="text-lg  leading-relaxed">
                    This collaboration not only enhances the security and efficiency of our escrow payment platform but also strengthens trust among our users, paving the way for a more secure and seamless online transaction experience across Nigeria’s digital market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default BlogPage;
