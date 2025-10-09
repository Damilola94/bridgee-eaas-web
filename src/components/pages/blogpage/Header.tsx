import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { MdClose } from "react-icons/md";

import Logo from "../../../assets/svgs/logos/full-pink.svg";

import Button from "../../inputs/Button";
import { toggleScroll } from "../../../utilities/general";
import { useHomepageContext } from "../../../context/Homepage";

function Header() {
  const router = useRouter();
  const { homepageData } = useHomepageContext();

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
    const { href } = e.currentTarget;
    const targetId = href.replace(/.*#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth"
    });
    setShowMenu(false);
  };

  return (
    <>
      <header className="fixed z-20 w-full h-24 border-b bg-[#FAE9FC]">
        <div className="header-content flex items-center w-full h-full text-textColor">
          <div className="w-full flex items-center justify-between">
            <div className="">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="UseBridge Inc. logo"
                  priority
                  width={120}
                  height={45}
                />
              </Link>
            </div>
            <div className="hidden sm:block">
              <ul className="flex space-x-10 text-lg font-bold">
                <Link href="/">
                  <li className="">Home</li>
                </Link>
                <Link href="/aboutus">
                  <li className="">About us</li>
                </Link>
                <Link href="/blog" onClick={handleScroll}>
                  <li className="">Blog</li>
                </Link>
              </ul>
            </div>
            <div className="hidden sm:block">
              {homepageData?.isWaitlist ? (
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
                  className="text-sm bg-transparent text-success px-8 py-3 rounded-lg border border-success flex justify-center items-center"
                >
                  Contact Us
                </a>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={() => router.push("/seller/login")}
                    border
                    borderColor="border-success"
                    fontSize="text-sm"
                    bgColor="bg-transparent"
                    textColor="text-success"
                    paddingX="px-8"
                    paddingY="py-3"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => router.push("/seller/create-account")}
                    paddingX="px-8"
                    paddingY="py-3"
                  >
                    Create account
                  </Button>
                </div>
              )}
            </div>
            <div className="sm:hidden">
              <HiOutlineMenu
                className="w-8 h-auto cursor-pointer"
                onClick={() => setShowMenu(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`header-side-menu ${
          showMenu || false ? "show overlay" : ""
        } fixed z-40 top-0 left-0 w-full h-screen bg-black bg-opacity-40`}
      >
        <div className="bg-white w-full absolute right-0 top-0 h-full overflow-y-auto">
          <div className="w-full relative">
            <div className="flex justify-between px-5 py-8">
              <div className="logo">
                <Link href="/" onClick={handleScroll}>
                  <Image
                    src={Logo}
                    priority
                    width={120}
                    height={45}
                    alt="Bridge by UseBridge Inc. logo"
                  />
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
              <ul className="w-full text-sm text-center">
                <Link href="/">
                  <li className="">Home</li>
                </Link>
                <Link href="/aboutus">
                  <li className="">About us</li>
                </Link>
                <Link href="/blog">
                  <li className="">Blog</li>
                </Link>
              </ul>
              <div className="w-full border-t py-10 mt-5">
                <div className="flex justify-center space-x-2">
                  {homepageData?.isWaitlist ? (
                    <Button
                      onClick={() => router.push("/")}
                      border
                      borderColor="border-success"
                      fontSize="text-sm"
                      bgColor="bg-transparent"
                      textColor="text-success"
                      paddingX="px-8"
                      paddingY="py-3"
                    >
                      Contact Us
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => router.push("/seller/login")}
                        border
                        borderColor="border-success"
                        fontSize="text-sm"
                        bgColor="bg-transparent"
                        textColor="text-success"
                        paddingX="px-8"
                        paddingY="py-3"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => router.push("/seller/create-account")}
                        paddingX="px-8"
                        paddingY="py-3"
                      >
                        Create account
                      </Button>
                    </div>
                  )}
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
