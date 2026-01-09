import React, { useState } from "react";
import { useRouter } from "next/router";

import HomepageContextProvider from "../../../context/Homepage";
import RegisterSelectionModal from "../homepage/modals/RegisterSelectionModal";

import Header from "./Header";
import Hero from "./Hero";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import TeamSection from "./TeamSection";

function Container() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const router = useRouter();

  const handleOpenRegisterModal = () => setShowRegisterModal(true);

  const handleSelectSeller = () => {
    setShowRegisterModal(false);
    router.push("/create-account?userType=Seller");
  };

  const handleSelectBuyer = () => {
    setShowRegisterModal(false);
    router.push("/create-account?userType=Buyer");
  };

  return (
    <HomepageContextProvider>
      <div className="bg-[#FAE9FC]">
        <Header onOpenRegisterModal={handleOpenRegisterModal} />

        <main id="top" className="w-full pt-24 bg-[#FAE9FC]">
          <Hero />
          <TeamSection />
          <GetStarted />
        </main>

        <div className="px-14 pb-10">
          <Footer />
        </div>

        <RegisterSelectionModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSelectSeller={handleSelectSeller}
          onSelectBuyer={handleSelectBuyer}
        />
      </div>
    </HomepageContextProvider>
  );
}

export default Container;
