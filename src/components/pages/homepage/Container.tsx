import React, { useState } from "react";
import { useRouter } from "next/router";

import HomepageContextProvider from "../../../context/Homepage";

import Header from "./Header";
import Hero from "./Hero";
import Benefits from "./Benefits";
// import TrackRecord from "./TrackRecord";
import HowItWorks from "./HowItWorks";
import GetStarted from "./GetStarted";
import Footer from "./Footer";

import Intro from "./Intro";
// import Announcement from "./Announcement";

import RegisterSelectionModal from "./modals/RegisterSelectionModal";
import JoinWaitlistModal from "./modals/JoinWaitlistModal";
import SuccessModal from "./modals/SuccessModal";

function Container() {
  const router = useRouter();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenRegisterModal = () => setShowRegisterModal(true);

  const handleSelectSeller = () => {
    setShowRegisterModal(false);
    router.push("/seller/create-account");
  };

  const handleSelectBuyer = () => {
    setShowRegisterModal(false);
    router.push("/buyer/create-account");
  };

  const handleWaitlistSuccess = () => {
    setShowWaitlistModal(false);
    setShowSuccessModal(true);
  };

  return (
    <HomepageContextProvider>
      <div className="bg-white">
        <Header onOpenRegisterModal={handleOpenRegisterModal} />

        <main id="top" className="w-full pt-24">
          <Hero onOpenRegisterModal={handleOpenRegisterModal} />
          {/* <MdSpeech /> */}
          <Intro />
          <HowItWorks />
          <Benefits />
          {/* <Announcement /> */}
          <GetStarted onOpenRegisterModal={handleOpenRegisterModal} />
        </main>

        <Footer />

        <RegisterSelectionModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSelectSeller={handleSelectSeller}
          onSelectBuyer={handleSelectBuyer}
        />

        <JoinWaitlistModal
          isOpen={showWaitlistModal}
          onClose={() => setShowWaitlistModal(false)}
          onSuccess={handleWaitlistSuccess}
        />

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
    </HomepageContextProvider>
  );
}

export default Container;
