import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/pages/homepage/Header';
import Hero from '../components/pages/homepage/Hero';
import Benefits from '../components/pages/homepage/Benefits';
import HowItWorks from '../components/pages/homepage/HowItWorks';
import DeliverySection from '../components/pages/homepage/DeliverySection';
import InvoiceSection from '../components/pages/homepage/InvoiceSection';
import GetStartedSection from '../components/pages/homepage/GetStartedSection';
import Footer from '../components/pages/homepage/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bridge by ALAT</title>
      </Head>

      <div className="bg-white">
        <Header />

        <main id="top" className="w-full pt-24">
          <Hero />
          <Benefits />
          <HowItWorks />
          <DeliverySection />
          <InvoiceSection />
          <GetStartedSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
