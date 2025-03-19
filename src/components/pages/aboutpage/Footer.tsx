import React from "react";
import Image from "next/image";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { TbBrandInstagram } from "react-icons/tb";

import Logo from "../../../assets/svgs/logos/blue-full.svg";

function Footer() {
  return (
    <footer className="bg-white py-12 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="w-full border-b border-w pb-7">
          {/* Responsive Flex/Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6 md:gap-8">
            {/* Logo Section */}
            <div className="flex sm:justify-center md:justify-start">
              <Image
                src={Logo}
                alt="UseBridge Inc. logo"
                priority
                width={134}
                height={49}
              />
            </div>
            {/* Company Section */}
            <div className="sm:text-center md:text-left">
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

            {/* Legal Section */}
            <div className="sm:text-center md:text-left">
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

            {/* Contact Section */}
            <div className="sm:text-center md:text-right">
              <p className="text-gray-600 mb-2">54 Marina Rd, Lagos, Nigeria</p>
              <p className="text-gray-600 mb-2">contact@bridge.com</p>
              <p className="text-gray-600 mb-4">+2347037373284</p>

              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  href="https://www.facebook.com/Alatng"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ImFacebook className="w-4 h-auto" />
                </a>
                <a
                  href="https://twitter.com/alat_ng"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ImTwitter className="w-4 h-auto" />
                </a>
                <a
                  href="https://www.instagram.com/alat_ng/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TbBrandInstagram className="w-4 h-auto" />
                </a>
                <a
                  href="https://www.linkedin.com/company/alatbywema/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ImLinkedin2 className="w-4 h-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            ©&nbsp;
            {new Date().getFullYear()}
            &nbsp;Bridge, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
