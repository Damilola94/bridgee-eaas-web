import React from "react";

import HomepageContextProvider from "../../../context/Homepage";

import Header from "./Header";
import Hero from "./Hero";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

import Intro from "./Intro";

function Container() {
  return (
    <HomepageContextProvider>
      <div className="bg-[#FAE9FC]">
        <Header />

        <main id="top" className="w-full pt-24  bg-[#FAE9FC]">
          <Hero />
          <Intro />
          <GetStarted />
        </main>
        <div className="px-14 pb-10">
          <Footer />
        </div>
      </div>
    </HomepageContextProvider>
  );
}

export default Container;
