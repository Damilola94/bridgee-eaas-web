import React from 'react';
import Image from 'next/image';

import { ImFacebook, ImTwitter, ImLinkedin2 } from 'react-icons/im';
import { TbBrandInstagram } from 'react-icons/tb';

import Logo from '../../../assets/svgs/logo-full.svg';

function Footer() {
  return (
    <footer className="w-full py-12">
      <div className="index-content">
        <div className="w-full border-b border-w pb-7">
          <div className="">
            <Image src={Logo} alt="ALAT Logo" priority width={134} height={49} className="w-auto h-auto" />
          </div>
        </div>
        <div className="w-full">
          <div className="pt-5 sm:flex sm:justify-between text-lightText">
            <p className="mb-5 sm:mb-0">
              ©&nbsp;
              {new Date().getFullYear()}
              &nbsp;Innovation. All rights reserved.
            </p>
            <ul className="flex space-x-4">
              <li className="">
                <a href="https://www.facebook.com/Alatng" target="_blank" rel="noreferrer">
                  <ImFacebook className="w-4 h-auto" />
                </a>
              </li>
              <li className="">
                <a href="https://twitter.com/alat_ng" target="_blank" rel="noreferrer">
                  <ImTwitter className="w-4 h-auto" />
                </a>
              </li>
              <li className="">
                <a href="https://www.instagram.com/alat_ng/" target="_blank" rel="noreferrer">
                  <TbBrandInstagram className="w-4 h-auto" />
                </a>
              </li>
              <li className="">
                <a href="https://www.linkedin.com/company/alatbywema/" target="_blank" rel="noreferrer">
                  <ImLinkedin2 className="w-4 h-auto" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
