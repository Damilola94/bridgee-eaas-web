"use client";

import { useState } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";

import { Dialog, DialogContent } from "../../common/UI";

import HalfCircles from "../../../assets/images/half-circles.png";
import DashboardImg from "../../../assets/images/business-dashboard.png";
import BlurLogo from "../../../assets/images/logos/blur-3d.png";
import BlueLogo from "../../../assets/images/logos/blue-3d.png";
import WemaBankLogo from "../../../assets/images/wemabanklogo.png";
import IdeaxLab from "../../../assets/images/ideaxlab.png";

import Button from "../../inputs/Button";
import { useHomepageContext } from "../../../context/Homepage";

function Hero() {
  const { homepageData } = useHomepageContext();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleWaitlistClick = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <section className="w-full relative bg-[#FAE9FC]">
        <Image
          src={BlurLogo || "/placeholder.svg"}
          alt="Blur 3D logo"
          className="absolute w-[110px] h-auto top-32 -left-10 hidden mdx2:block"
        />
        <Image
          src={BlueLogo || "/placeholder.svg"}
          alt="Blur 3D logo"
          className="absolute w-[210px] h-auto top-[400px] right-0 hidden mdx2:block"
        />

        <div className="w-full relative overflow-visible">
          <div className="w-full max-w-3xl mx-auto text-center pt-14">
            <h1 className="text-bold ff-bold text-5xl sm:text-6xl md:text-8xl mb-4">
              Get Empowered to Transact
            </h1>
            <h4 className="text-xl leading-relaxed mb-10">
              With Bridge, you&apos;re in control, and you can trust us to
              safeguard your transactions every step of the way.
            </h4>
            <div className="flex justify-center">
              {homepageData?.isWaitlist ? (
                <Button
                  onClick={handleWaitlistClick}
                  paddingX="px-10"
                  paddingY="py-4"
                  fontSize="text-lg"
                >
                  Join the waiting list
                </Button>
              ) : (
                <Button
                  onClick={handleWaitlistClick}
                  paddingX="px-10"
                  paddingY="py-4"
                  fontSize="text-lg"
                >
                  Join the Waitlist
                </Button>
              )}
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <Image
              src={HalfCircles || "/placeholder.svg"}
              alt="purple circles"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute left-0 w-full bg-blue py-8 px-6 flex z-10 text-center justify-center items-center">
            <p className="mb-1 text-xs sm:text-lg tracking-wider text-white mr-5">
              Proudly backed and supported by:
            </p>
            <div className="flex space-x-8">
              <Image
                src={WemaBankLogo}
                alt="WemaBankLogo"
                className="w-14 sm:w-36  h-auto"
              />
              <Image src={IdeaxLab} alt="IdeaxLab" className="w-14 sm:w-40 h-auto" />
            </div>
          </div>
          <div className="absolute left-1/2 -bottom-0 sm:-bottom-0 md:-bottom-0 w-full max-w-4xl mx-auto -translate-x-1/2 px-10">
            <Image
              src={DashboardImg || "/placeholder.svg"}
              alt="purple circles"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 h-[80vh]">
          <iframe
            src="https://forms.office.com/r/SsSvq3UbKz"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Bridge Waitlist Form"
            className="rounded-md"
            allowFullScreen
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Hero;
