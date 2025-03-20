import Image from "next/image";

// import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { TbBrandYoutube } from "react-icons/tb";

import Logo from "../../../assets/svgs/logos/blue-full.svg";

function Footer() {
  return (
    <footer className="bg-white py-12 rounded-xl">
      <div className="just container mx-auto px-4">
        <div className="w-full border-b border-gray-200 pb-7">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-6 md:gap-8 w-full">
            <div className="flex flex-col sm:items-center md:items-start">
              <Image
                src={Logo || "/placeholder.svg"}
                alt="UseBridge Inc. logo"
                priority
                width={134}
                height={49}
              />
              <p className="text-gray-600 mt-4 sm:text-center md:text-left">
                Empowering secure transactions for everyone.
              </p>
            </div>

            <div className="sm:text-center md:text-left">
              <h4 className="font-semibold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div className="sm:text-center md:text-left">
              <div className="flex space-x-4 sm:justify-center md:justify-start">
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:text-red-700 transition-colors"
                  aria-label="YouTube"
                >
                  <TbBrandYoutube className="w-8 h-8 text-[#D61F69]" />
                </a>
              </div>
              <br/>
              <span className="text-gray-600 mb-2">
                48b, Town Planning Way, Opposite SPAR, Illupeju, Lagos
              </span>
              <br/>

              <span className="text-gray-600 mb-2">info@usebridge.com</span>
              <br/>
              <span className="text-gray-600 mb-4">+234 703 116 7741</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Bridge, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
