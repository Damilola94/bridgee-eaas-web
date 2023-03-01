import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '../components/inputs/Button';
import Logo from '../assets/svgs/logo.svg';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Bridge by ALAT</title>
      </Head>

      <div className="bg-secondary">
        <header className="fixed z-20 w-full h-24 border-b bg-white/50 backdrop-blur-md">
          <div className="index-content mx-auto flex items-center w-full h-full text-textColor">
            <div className="w-full flex items-center justify-between">
              <div className="">
                <Image src={Logo} alt="ALAT Logo" priority width={50} height={53} className="w-auto h-auto" />
              </div>
              <div className="">
                <Button
                  onClick={() => router.push('/login')}
                  fontSize="text-sm"
                  paddingX="px-12"
                  paddingY="py-3"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full">
          <div className="w-full h-screen flex items-center justify-center">
            <h1 className="text-7xl text-center">WORK IN PROGRESS...</h1>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
