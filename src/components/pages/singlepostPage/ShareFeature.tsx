import React from "react";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { TbBrandInstagram } from "react-icons/tb";

function ShareFeature() {
  return (
    <section id="why-us" className="w-full relative overflow- ">
      <div className="w-full index-content">
        <div className="w-full relative pt-5">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full">
              <div className="w-full mdx2:w-full max-w-5xl mx-auto">
                <div className="flex justify-end items-center space-x-4">
                  <span className="text-[#939393]">Share:</span>
                  <ul className="flex justify-end space-x-4">
                    <li className="w-10 h-10 rounded-full bg-[#EAEAEA] flex justify-center items-center">
                      <a
                        href="https://www.facebook.com/Alatng"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImFacebook className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="w-10 h-10 rounded-full bg-[#EAEAEA] flex justify-center items-center">
                      <a
                        href="https://twitter.com/alat_ng"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImTwitter className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="w-10 h-10 rounded-full bg-[#EAEAEA] flex justify-center items-center">
                      <a
                        href="https://www.instagram.com/alat_ng/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TbBrandInstagram className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="w-10 h-10 rounded-full bg-[#EAEAEA] flex justify-center items-center">
                      <a
                        href="https://www.linkedin.com/company/alatbywema/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImLinkedin2 className="w-4 h-auto" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShareFeature;
