import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

import HappyCustomer from "../../../assets/images/happy-customer.png";
import Button from "../../inputs/Button";
import { useHomepageContext } from "../../../context/Homepage";
import PinkLogo from "../../../assets/images/logos/pink-3d.png";
import PurpleLogo from "../../../assets/images/logos/purple-3d.png";
import bgBoxes from "../../../assets/images/bg-boxes.png";

type GetStartedProps = {
  onOpenRegisterModal: () => void;
};

function GetStarted({ onOpenRegisterModal }: GetStartedProps) {
  const router = useRouter();
  const { homepageData } = useHomepageContext();

  return (
    <div className="w-full relative">
      <Image
        src={PinkLogo}
        alt="Pink 3D logo"
        className="absolute w-[210px] h-auto top-[150px] -left-16 hidden lg:block z-0 opacity-70"
      />

      <div className="w-full index-content py-24 relative z-10">
        <div className="w-full flex flex-wrap bg-blue relative py-16 rounded-[35px] overflow-hidden">
          <Image
            src={bgBoxes}
            alt="Decorative background"
            className="absolute top-0 left-0 w-full h-[200px] object-cover"
            priority
          />

          <div className="w-full mdx2:w-3/5 flex items-center max-w-2xl mx-auto z-10">
            <div className="text-center mdx2:text-left px-5 mdx2:pl-10">
              <h1 className="text-4xl sm:text-[50px] sm:leading-[60px] text-white mb-10">
                Ready to experience the future of secure digital transactions?
              </h1>
              <div className="inline-block mb-10">
                {homepageData?.isWaitlist ? (
                  <Button
                    onClick={() => router.push("/waitlist")}
                    className="!rounded-full"
                    fontSize="text-xl"
                    bgColor="bg-[#B80074]"
                    paddingX="px-6"
                    paddingY="py-5"
                  >
                    Join the waiting list
                    <BsArrowRight className="ml-3 w-6 h-auto" />
                  </Button>
                ) : (
                  <Button
                    onClick={onOpenRegisterModal}
                    // onClick={() => router.push("/seller/create-account")}
                    className="!rounded-full"
                    fontSize="text-xl"
                    bgColor="bg-[#B80074]"
                    paddingX="px-6"
                    paddingY="py-5"
                  >
                    <div className="flex items-center">
                      Create Account
                      <BsArrowRight className="ml-3 w-6 h-auto" />
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mdx2:w-2/5 max-w-xl mx-auto z-10">
            <div className="w-full h-full flex items-center pt-5 mdx2:pt-0">
              <Image
                src={HappyCustomer}
                alt="Delivery image"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <Image
        src={PurpleLogo}
        alt="Purple 3D logo"
        className="absolute w-[190px] h-auto bottom-0 right-0 hidden md:block z-0 opacity-70"
      />
    </div>
  );
}

export default GetStarted;
