import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HiOutlineMenu } from 'react-icons/hi';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';

import Logo from '../../../assets/svgs/logo-full.svg';

import Button from '../../inputs/Button';
import { toggleScroll } from '../../../utilities/general';

function Header() {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    toggleScroll();

    return function() {
      setTimeout(() => {
        toggleScroll();
      }, 0);
    };
  }, [showMenu]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth"
    });
    setShowMenu(false);
  };

  return (
    <>
      <header className="fixed z-20 w-full h-24 border-b bg-white/50 backdrop-blur-2xl">
        <div className="header-content flex items-center w-full h-full text-textColor">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-16">
              <div className="">
                <Link href="/#top" onClick={handleScroll}>
                  <Image src={Logo} alt="ALAT Logo" priority width={134} height={49} className="w-auto h-auto" />
                </Link>
              </div>
              <div className="hidden sm:block">
                <ul className="flex space-x-5 text-lg font-bold">
                  <Link href="#why-us" onClick={handleScroll}>
                    <li className="">Why us</li>
                  </Link>
                  <Link href="#how-it-works" onClick={handleScroll}>
                    <li className="">How it works</li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className="hidden sm:block">
              <Button
                onClick={() => router.push('/login')}
                fontSize="text-sm"
                bgColor="bg-primary"
                paddingX="px-5"
                paddingY="py-3"
              >
                Get Started
              </Button>
            </div>
            <div className="sm:hidden">
              <HiOutlineMenu className="w-8 h-auto cursor-pointer" onClick={() => setShowMenu(true)} />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`header-side-menu ${showMenu || false ? 'show overlay' : ''
        } fixed z-40 top-0 left-0 w-full h-screen bg-black bg-opacity-40`}
      >
        <div className="bg-white w-full absolute right-0 top-0 h-full overflow-y-auto">
          <div className="w-full relative">
            <div className="flex justify-between px-5 py-8">
              <div className="logo">
                <Link href="/" onClick={handleScroll}>
                  <Image src={Logo} className="w-40 h-auto" alt="Idea Factory Logo" />
                </Link>
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() => setShowMenu(false)}
                  className="font-bold flex items-center hover:bg-opacity-20 hover:bg-primary"
                >
                  <MdClose className="w-10 h-auto" />
                </button>
              </div>
            </div>
            <div className="w-full px-10 py-8">
              <ul className="w-full text-sm">
                <Link href="#top" onClick={handleScroll}>
                  <li className={`${location.hash === '#top' ? 'bg-primary bg-opacity-20' : ''} header-side-link`}>
                    Home
                  </li>
                </Link>
                <Link href="#why-us" onClick={handleScroll}>
                  <li className={`${location.hash === '#why-us' ? 'bg-primary bg-opacity-20' : ''} header-side-link`}>
                    Why us
                  </li>
                </Link>
                <Link href="#how-it-works" onClick={handleScroll}>
                  <li className={`${location.hash === '#how-it-works' ? 'bg-primary bg-opacity-20' : ''} header-side-link`}>
                    How it works
                  </li>
                </Link>
              </ul>

              <div className="w-full border-t py-10 mt-5">
                <div className="justify-center flex">
                  <Button
                    onClick={() => router.push('/login')}
                    fontSize="text-sm"
                    bgColor="bg-primary"
                    paddingX="px-5"
                    paddingY="py-3"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
