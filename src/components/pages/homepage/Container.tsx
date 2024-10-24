import React from 'react';

import HomepageContextProvider from '../../../context/Homepage';

import Header from './Header';
import Hero from './Hero';
import Benefits from './Benefits';
import TrackRecord from './TrackRecord';
import HowItWorks from './HowItWorks';
import GetStarted from './GetStarted';
import Footer from './Footer';

import Intro from './Intro';

function Container() {
  return (
    <HomepageContextProvider>
      <div className="bg-white">
        <Header />

        <main id="top" className="w-full pt-24">
          <Hero />
          <TrackRecord/>
          <Intro />
          <HowItWorks />
          <Benefits />
          <GetStarted />
        </main>

        <Footer />
      </div>
    </HomepageContextProvider>
  );
}

export default Container;
