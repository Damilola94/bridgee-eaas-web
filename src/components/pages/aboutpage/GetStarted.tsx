import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

import HappyCustomer from "../../../assets/images/happy-customer.png";

import Button from "../../inputs/Button";
import { useHomepageContext } from "../../../context/Homepage";

function GetStarted() {
  const router = useRouter();
  const { homepageData } = useHomepageContext();

  return (
    <div className="w-full">
      <div className="w-full index-content py-24">
        <div className="w-full flex flex-wrap bg-purple py-16 rounded-[35px]">
          <div className="w-full mdx2:w-3/5 flex items-center max-w-2xl mx-auto">
            <div className="text-center mdx2:text-left px-5 mdx2:pl-10">
              <h1 className="ff- text-4xl sm:text-[50px] sm:leading-[60px] text-white mb-10">
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
                    onClick={() => router.push("/seller/login")}
                    className="!rounded-full"
                    fontSize="text-xl"
                    bgColor="bg-[#B80074]"
                    paddingX="px-6"
                    paddingY="py-5"
                  >
                    <div className="flex items-center">
                      Get started now
                      <BsArrowRight className="ml-3 w-6 h-auto" />
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="w-full mdx2:w-2/5 max-w-xl mx-auto">
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
    </div>
  );
}

export default GetStarted;
