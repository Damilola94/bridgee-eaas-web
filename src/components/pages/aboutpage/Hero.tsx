import React from "react";

function Hero() {
  return (
    <section className="w-full relative bg-[#FAE9FC] overflow-">
      <div className="w-full relative header-content overflow-visible">
        <div className="w-full max-w-3xl mx-auto text-center pt-14 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center p-1.5 bg-transparentPurple rounded-xl w-fit text-success my-8">
          About Us
          </div>
          <h1 className="text-bold ff-bold text-3xl sm:text-3xl md:text-4xl mb-4 md:leading-tight">
            At Bridge, we are committed to making online commerce safer,
            simpler, and more trustworthy for everyone.
          </h1>
          <h4 className="text-lg leading-relaxed mb-10 ">
            And we are proudly supported by Wema Bank
          </h4>
        </div>
      </div>
    </section>
  );
}

export default Hero;
