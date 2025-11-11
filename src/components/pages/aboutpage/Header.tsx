"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { MdClose } from "react-icons/md";

import Logo from "../../../assets/svgs/logos/red-full.svg";

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
      <header className="fixed z-20 w-full h-24 border-b bg-[#FAE6F0]">
        <div className="header-content flex items-center w-full h-full text-textColor px-6 md:px-10">
          <div className="w-full flex items-center justify-between">
            {/* Logo */}
            <div>
              <Link href="/#top" onClick={handleScroll}>
                <Image
                  src={Logo}
                  alt="UseBridgee Inc. logo"
                  priority
                  width={120}
                  height={45}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:block">
              <ul className="flex space-x-10 text-lg font-bold">
                <Link
                  href="/"
                  className={`${
                    router.pathname === "/"
                      ? "text-success border-b-2 border-success pb-1"
                      : "text-textColor"
                  } hover:text-success transition-colors`}
                >
                  <li>Home</li>
                </Link>

                <Link
                  href="/aboutus"
                  className={`${
                    router.pathname === "/aboutus"
                      ? "text-success border-b-2 border-success pb-1"
                      : "text-textColor"
                  } hover:text-success transition-colors`}
                >
                  <li>About us</li>
                </Link>

                <Link
                  href="/blog"
                  className={`${
                    router.pathname === "/blog"
                      ? "text-success border-b-2 border-success pb-1"
                      : "text-textColor"
                  } hover:text-success transition-colors`}
                >
                  <li>Blog</li>
                </Link>
              </ul>
            </div>

            {/* Desktop Buttons */}
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

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <HiOutlineMenu
                className="w-8 h-auto cursor-pointer"
                onClick={() => setShowMenu(true)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`header-side-menu ${
          showMenu ? "show overlay" : ""
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
                    alt="Bridgee by UseBridgee Inc. logo"
                  />
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setShowMenu(false)}
                  className="font-bold flex items-center hover:bg-opacity-20 hover:bg-primary"
                >
                  <MdClose className="w-10 h-auto" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="w-full px-10 py-8">
              <ul className="w-full text-sm text-center space-y-6 font-medium">
                <Link
                  href="/"
                  className={`block ${
                    router.pathname === "/"
                      ? "text-success font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  <li>Home</li>
                </Link>
                <Link
                  href="/aboutus"
                  className={`block ${
                    router.pathname === "/aboutus"
                      ? "text-success font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  <li>About us</li>
                </Link>
                <Link
                  href="/blog"
                  className={`block ${
                    router.pathname === "/blog"
                      ? "text-success font-semibold"
                      : "text-gray-800"
                  }`}
                >
                  <li>Blog</li>
                </Link>
              </ul>

              {/* Mobile Buttons */}
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
