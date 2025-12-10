"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// import { FaWhatsapp } from "react-icons/fa";

import { Dialog, DialogContent } from "../../common/UI";

import HalfCircles from "../../../assets/images/half-circles.png";
import DashboardImg from "../../../assets/images/hero1.png";
import BlurLogo from "../../../assets/images/logos/blur-3d.png";
import BlueLogo from "../../../assets/images/logos/blue-3d.png";
import WemaBankLogo from "../../../assets/images/wemabanklogo.png";
import IdeaxLab from "../../../assets/images/ideaxlab.png";
import saraLogo from "../../../assets/images/saraLogo.png";
import bgBoxes from "../../../assets/images/bg-boxes.png";
import NDIC from "../../../assets/svg-tsx/NDIC";

import Button from "../../inputs/Button";

type HeroProps = {
  onOpenRegisterModal: () => void;
};

function Hero({ onOpenRegisterModal }: HeroProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // const handleWaitlistClick = () => {
  //   window.open("https://chat.whatsapp.com/BeDo7zGcwm58N69zC05YIP", "_blank");
  // };

  return (
    <>
      <section className="w-full relative bg-[#FAE6F0]"
      >
        <Image
          src={bgBoxes}
          alt="Decorative background"
          className="absolute top-0 left-0 w-full h-[200px] object-cover"
          priority
        />
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
            <h1 className="text-bold ff-bold text-5xl sm:text-6xl md:text-8xl">
              Buy <span className="text-success">Safely,</span>
            </h1>
            <h1 className="text-bold ff-bold text-5xl sm:text-6xl md:text-8xl mb-4 ">
              Sell Securely
            </h1>
            <h4 className="text-xl leading-relaxed mb-10">
              With Bridgee, you&apos;re in control, and you can trust us to safeguard your
              transactions every step of the way.
            </h4>
            <div className="flex justify-center space-x-4 mb-14 ">
              <Button
                iconPosition="left"
                onClick={onOpenRegisterModal}
                // onClick={() => router.push("/seller/create-account")}
                paddingX="px-10"
                paddingY="py-4"
                fontSize="text-lg"
              >
                Create Account
              </Button>

              {/* <Button
                icon={<FaWhatsapp size={20} />}
                border
                onClick={handleWaitlistClick}
                borderColor="border-success"
                bgColor="bg-transparent"
                textColor="text-success"
                paddingX="px-8"
                paddingY="py-3"
              >
                Join our Community
              </Button> */}
            </div>
            <div className="mb-20 flex justify-center items-center space-x-2">
              <p className="text-[#383838] text-xl">Insured by</p> <NDIC />
            </div>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <Image
              src={HalfCircles || "/placeholder.svg"}
              alt="purple circles"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute left-0 w-full bg-blue py-8 px-6 flex flex-col z-10 text-center justify-center items-center">
            <p className="mb-4 text-xs sm:text-lg tracking-wider text-white">
              Proudly backed and supported by:
            </p>
            <div className="flex space-x-8 justify-center items-center flex-wrap">
              <Image
                src={WemaBankLogo}
                alt="WemaBankLogo"
                className="w-12 sm:w-28 h-fit"
              />
              <Image
                src={IdeaxLab}
                alt="IdeaxLab"
                className="w-14 sm:w-28 h-fit"
              />
              <Image
                src={saraLogo}
                alt="SaraLogo"
                className="w-14 sm:w-28 h-fit"
              />
            </div>
          </div>

          <div className="absolute z-10 left-1/2 bottom-[-2.7rem] xs:bottom-[-4rem]  sm:bottom-[-5rem] md:bottom-[-6.7rem] w-full max-w-5xl mx-auto -translate-x-1/2 px-10">
            <Image
              src={DashboardImg || "/placeholder.svg"}
              alt="purple circles"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="sm:max-w-[500px] p-6 text-center bg-white">
          <h1 className="text-bold ff-bold text-3xl sm:text-3xl md:text-4xl m-4 mb-6">
            Be Among the First to Experience Bridge!
          </h1>

          <Button
            onClick={handleWaitlistClick}
            paddingX="px-10"
            paddingY="py-4"
            fontSize="text-lg"
          >
            Join the Waitlist
          </Button>
        </DialogContent>
      </Dialog> */}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 h-[80vh]">
          <iframe
            src="https://forms.gle/dof4p6j48c7YdyhJA"
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
