import React from "react";

function Hero() {
  return (
    <section className="w-full relative bg-[#FAE6F0] overflow-">
      <div className="w-full relative header-content overflow-visible">
        <div className="w-full mx-auto text-center pt-14 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center p-1.5 bg-transparentPurple rounded-xl w-fit text-success my-8">
            About Us
          </div>
          <h1 className="text-bold ff-bold md:max-w-6xl text-4xl sm:text-5xl md:text-6xl mb-4 ">
            At Bridge, we are committed to making online commerce safer, simpler, and more trustworthy for everyone.
          </h1>
          <h4 className="text-lg leading-relaxed mb-10 max-w-4xl">
            What sets Bridge apart is our strong partnership with Wema Bank, one of Nigeria&apos;s leading financial institutions. This collaboration empowers Bridge with the financial expertise, security infrastructure, and resources necessary to deliver a reliable and trustworthy service to our users.
          </h4>
        </div>
      </div>
    </section>
  );
}

export default Hero;
