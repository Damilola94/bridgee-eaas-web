import React from "react";

import HomepageContextProvider from "../../../context/Homepage";

import Header from "./Header";
import Footer from "./Footer";

import TermsCondition from './TermsCondition'; // ✅ correct default import

function Container() {
  return (
    <HomepageContextProvider>
      <div className="">
        <Header />

        <main id="top" className="w-full pt-24  ">
          <TermsCondition />
        </main>
        <div className="px-14 pb-10">
          <Footer />
        </div>
      </div>
    </HomepageContextProvider>
  );
}

export default Container;
