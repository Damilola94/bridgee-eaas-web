import React from "react";
import Image from "next/image";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { TbBrandInstagram } from "react-icons/tb";

import Logo from "../../../assets/svgs/logos/blue-full.svg";

function Footer() {
  return (
    <footer className="bg-white py-12 rounded-xl">
      <div className="index-content">
        <div className="w-full border-b border-w pb-7">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <div className="">
                <Image
                  src={Logo}
                  alt="Bridge by ALAT logo"
                  priority
                  width={134}
                  height={49}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between sm:justify-between w-full sm:w-auto">
              <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-8">
                <h4 className="font-semibold text-lg mb-2">Company</h4>
                <ul>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      ALAT By Wema
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      Wema Bank
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-8">
                <h4 className="font-semibold text-lg mb-2">Legal</h4>
                <ul>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-800">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full sm:w-auto text-center sm:text-right">
              <div className="w-full">
                <div className="pt-5 sm:flex sm:justify-end text-lightText mb-5">
                  <ul className="flex justify-end space-x-4">
                    <li className="">
                      <a
                        href="https://www.facebook.com/Alatng"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImFacebook className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="https://twitter.com/alat_ng"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ImTwitter className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="">
                      <a
                        href="https://www.instagram.com/alat_ng/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TbBrandInstagram className="w-4 h-auto" />
                      </a>
                    </li>
                    <li className="">
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
              <p className="text-gray-600">54 Marina Rd, Lagos, Nigeria</p>
              <p className="text-gray-600">contact@bridge.com</p>
              <p className="text-gray-600">+2347037373284</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center mt-4">
          <p className="mb-5 sm:mb-0">
            ©&nbsp;
            {new Date().getFullYear()}
            &nbsp;Innovation. All rights reserved.
          </p>
        </div>

        {/* <div className="w-full">
          <div className="pt-5 sm:flex sm:justify-center text-lightText">
            <p className="text-gray-500">
              &copy; 2023 Bridge, Inc. All rights reserved.
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

export default Footer;
