import React from "react";

// import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
// import { FaInstagram } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

import Logo1 from "../../../assets/svg-tsx/logo1";

function Footer() {
  return (
    <footer className="bg-white py-12 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="w-full border-b border-w pb-7">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="flex sm:justify-center md:justify-start">
              <Logo1 />
            </div>
            <div className="sm:text-center md:text-left">
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[#828282] hover:text-gray-800 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#828282] hover:text-gray-800 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#828282] hover:text-gray-800 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div className="sm:text-center md:text-right">
              {/* <h4 className="font-semibold text-lg mb-4">Contact Us</h4> */}
              <div className="mb-4 flex md:justify-end md:items-end ">
                <BsYoutube size={30} color="#D61F69" />
              </div>

              {/* <div className="flex space-x-4 sm:justify-center md:justify-start mb-4">
                <a
                  href="https://www.instagram.com/p/DHLgi3_oZcR/?igsh=Z3h3MG5mOHRtcG01"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/BRIDGE_NG_/status/1900528630620385787?t=AvwKDBvDuijGgo_kqCdyag&s=08"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-blue transition-colors"
                  aria-label="Twitter"
                >
                  <ImTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/posts/bridge-ng_comingsoon-activity-7302287027310329856-9Lff?utm_source=share&utm_medium=member_android&rcm=ACoAAA2yyHIBaSDdZrC1psIxJjeLMbdgjkCZvAA"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-sky-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <ImLinkedin2 className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/share/1ABHq1ppvY/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-sky-800 transition-colors"
                  aria-label="Facebook"
                >
                  <ImFacebook className="w-5 h-5" />
                </a>
              </div> */}
              <p className="text-[#828282] mb-2">
                48b, Town Planning Way, <br />
                Opposite SPAR, Illupeju, Lagos
              </p>

              <p className="text-[#828282] mb-2">info@usebridgee.com</p>
              <p className="text-[#828282] mb-4">+234 703 116 7741</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-6">
          <p className="text-[#828282]">
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
