import React from "react";

function Hero() {
  return (
    <section className="w-full relative overflow- pb-10">
      <div className="w-full relative header-content overflow-visible">
        <div className="w-full max-w-5xl mx-auto text-center pt-14 flex flex-col items-start justify-start">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-start  p-1 bg-[#FAE6F0] px-3 py-1  rounded-md w-fit text-success my-4 justify-start">
              <p>PRODUCT UPDATES</p>
            </div>
            <p className="font-bold"><span className="text-[#939393]">Published on </span> 15 September 2025</p>
          </div>
          <h1 className="text-bold ff-bold text-3xl sm:text-3xl md:text-5xl md:leading-tight text-left max-w-3xl">
           Wema Bank Startup Accelerator Programme
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
