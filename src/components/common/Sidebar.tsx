import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";

import {
  LayoutGrid,
  MessageSquareWarning,
  Settings as SettingsIcon,
  LogOut,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { BsDot } from "react-icons/bs";

import Logo from "../../assets/svgs/logos/full-white.svg";

import menuList from "../../configs/sidebarMenu";
import useClickOutsideBox from "../../hooks/useClickOutsideBox";
import { logout } from "../../services/auth";
import handleFetch from "../../services/api/handleFetch";
import notification from "../../utilities/notification";

import Button from "../inputs/Button";

import Loading from "./Loading";
import Modal from "./Modal";

function Sidebar() {
  const wrapperRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [cookie] = useCookies(["data"]);

  const userRole = cookie?.data?.activeRole || cookie?.data?.roles?.[0];

  const buyerMenu = [
    { title: "Dashboard", link: "/dashboard", icon: LayoutGrid },
    { title: "Disputes", link: "/buyer-disputes", icon: MessageSquareWarning },
    { title: "Settings", link: "/settings", icon: SettingsIcon, matchPrefix: "/settings" },
  ];

  const displayMenu = userRole === "Buyer" ? buyerMenu : menuList;

  useClickOutsideBox(wrapperRef, () => setShowMenu(false));

  const toggleMenu = () => setShowMenu(!showMenu);

  const logoutMutation = useMutation(handleFetch, {
    retry: 3,
    onSuccess: () => logout(),
    onError: (err: unknown) => {
      notification({
        title: "Logout Failed",
        message: String(err) || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate({
      service: "identity-service/api/v1",
      endpoint: "auth",
      extra: "logout",
      method: "POST",
      auth: true,
    });
  };

  const { isLoading, isSuccess } = logoutMutation;

  return (
    <div ref={wrapperRef}>
      {(isLoading || isSuccess) && <Loading message="Logging out..." />}

      <Modal
        maxWidth="max-w-[400px]"
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
      >
        <div>
          <h3 className="ff-bold text-xl font-bold text-textColor">
            Confirm Logout
          </h3>
          <p className="text-sm pt-2">
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => setShowLogoutConfirm(false)}
            paddingX="px-4"
            textColor="text-primary"
            bgColor="bg-primary/0"
            className="w-full text-base ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            paddingX="px-4"
            className="w-full text-base ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-2"
          >
            Logout
          </Button>
        </div>
      </Modal>

      <div
        className={`${showMenu ? "hidden" : ""} fixed cursor-pointer top-5 left-6 z-30 lg:hidden`}
      >
        <FiMenu
          onClick={toggleMenu}
          className="transition bg-white w-10 h-auto p-1.5 border rounded-md text-primary hover:bg-primary/20"
        />
      </div>

      <nav
        className={`z-30 page-sidebar fixed w-72 bg-[#1B1660] overflow-auto h-screen hide-scroll ${
          showMenu ? "show" : ""
        } shadow-box lg:shadow-none`}
      >
        <div className="fixed cursor-pointer top-5 right-5 lg:hidden">
          <IoClose
            onClick={toggleMenu}
            className="transition w-10 h-auto p-1.5 rounded-md bg-white text-primary hover:bg-white/20"
          />
        </div>

        <div className="sidebar-menu text-white text-sm flex flex-col justify-between h-side-menu px-5 pb-10">
          <div className="px-6 py-8 h-20">
            <Image
              src={Logo}
              alt="UseBridgee Inc. logo"
              priority
              width={130}
              height={45}
            />
          </div>

          <ul className="menu-items pt-6 flex-1 space-y-5 ">
            {displayMenu?.map((item: any) => (
              <MenuItem props={item} toggleMenu={toggleMenu} key={item.title} />
            ))}
          </ul>

          <li
            className="relative flex items-center gap-2.5 px-4 py-3 cursor-pointer text-white/90 hover:text-white mt-2 ml-2"
            onClick={() => setShowLogoutConfirm(true)}
            role="presentation"
          >
            <LogOut size={18} strokeWidth={1.75} />
            <span className="title">Logout</span>
          </li>
        </div>
      </nav>
    </div>
  );
}

function MenuItem({
  props: { title, href, link, matchPrefix, icon: Icon, children },
  toggleMenu,
}: any) {
  const { pathname } = useRouter();
  const [isShowingSub, setIsShowingSub] = useState(false);

  const isActive = matchPrefix
    ? pathname?.startsWith(matchPrefix)
    : pathname === link;

  useEffect(() => {
    if (!!children && isActive) {
      setIsShowingSub(true);
    }
  }, [pathname, children, link]);

  return (
    <div className="relative">
      {isActive && (
        <span className="absolute -left-5 top-1/2 -translate-y-1/2 h-8 w-1.5 rounded-r-full bg-[#A3195B]" />
      )}

      {children ? (
        <li
          className={`flex items-center justify-between gap-2.5 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
            isActive ? "bg-white/10" : ""
          }`}
          onClick={() => setIsShowingSub(!isShowingSub)}
          role="presentation"
        >
          <span className="flex items-center gap-2.5">
            {Icon && <Icon size={18} strokeWidth={1.75} />}
            <span className="title font-medium">{title}</span>
          </span>
          {isShowingSub ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronLeft size={16} className="rotate-180" />
          )}
        </li>
      ) : (
        <>
          {href && (
            <a href={href} target="_blank" rel="noreferrer">
              <li className="flex items-center gap-2.5 px-4 py-3 rounded-xl">
                {Icon && <Icon size={18} strokeWidth={1.75} />}
                <span className="title">{title}</span>
              </li>
            </a>
          )}
          {link && (
            <Link href={link}>
              <li
                className={`flex items-center gap-3 px-4 py-5 rounded-xl cursor-pointer transition-colors ${
                  isActive
                    ? "bg-white/10 font-semibold"
                    : "text-white/90 hover:text-white"
                }`}
                onClick={toggleMenu}
              >
                {Icon && <Icon size={18} strokeWidth={1.75} />}
                <span className="title">{title}</span>
              </li>
            </Link>
          )}
        </>
      )}

      {children && isShowingSub && (
        <ul
          className={`${isShowingSub ? "show" : ""} sub-menu text-[12px] pl-4`}
        >
          {children?.map((child: any) => (
            <Link href={child?.link} key={child?.title}>
              <li
                className={`${pathname === child?.link ? "active" : ""} !py-1 !pl-3`}
                onClick={toggleMenu}
              >
                <BsDot className="w-7 h-auto" />
                {child?.title}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

MenuItem.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    link: PropTypes.string,
    matchPrefix: PropTypes.string,
    icon: PropTypes.any,
    children: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string, link: PropTypes.string }),
    ),
  }),
  toggleMenu: PropTypes.func,
};

MenuItem.defaultProps = {
  props: {
    title: "",
    href: "",
    link: "",
    matchPrefix: "",
    icon: "",
    children: [{ title: "", link: "" }],
  },
  toggleMenu: () => {},
};

export default Sidebar;