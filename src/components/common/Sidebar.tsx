import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { BsDot } from 'react-icons/bs';

import Logo from '../../assets/svgs/logos/full-white.svg';
import LogoutIcon from '../../assets/svgs/logout.svg';
import DashboardIcon from '../../assets/svgs/dashboard.svg';
import SettingsIcon from '../../assets/svgs/settings.svg';

import menuList from '../../configs/sidebarMenu';
import useClickOutsideBox from '../../hooks/useClickOutsideBox';
import { logout } from '../../services/auth';
import handleFetch from '../../services/api/handleFetch';
import notification from '../../utilities/notification';

import Button from '../inputs/Button';

import Loading from './Loading';
import Modal from './Modal';

function Sidebar() {
  const wrapperRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [cookie] = useCookies(["data"])

  const userRole = cookie?.data?.activeRole || cookie?.data?.roles?.[0];

  const buyerMenu = [
    {
      title: 'Dashboard',
      link: '/dashboard',
      icon: DashboardIcon
    },
    {
      title: 'Settings',
      link: '/settings',
      icon: SettingsIcon
    }
  ]

  const displayMenu = userRole === 'Buyer' ? buyerMenu : menuList;

  useClickOutsideBox(wrapperRef, () => setShowMenu(false));

  const toggleMenu = () => setShowMenu(!showMenu);

  const logoutMutation = useMutation(handleFetch, {
    retry: 3,
    onSuccess: () => logout(),
    onError: (err: unknown) => {
      notification({
        title: 'Logout Failed',
        message: String(err) || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate({
      service: 'identity-service/api/v1',
      endpoint: 'auth',
      extra: 'logout',
      method: 'POST',
      auth: true
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
          <h3 className="ff-bold text-xl font-bold text-textColor">Confirm Logout</h3>
          <p className="text-sm pt-2">
            Are you sure you want to log out? You will need to sign in again to access your account.
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

      <div className={`${showMenu ? 'hidden' : ''} fixed cursor-pointer top-5 left-6 z-30 lg:hidden`}>
        <FiMenu
          onClick={toggleMenu}
          className="transition bg-white w-10 h-auto p-1.5 border rounded-md text-primary hover:bg-primary/20"
        />
      </div>

      <nav
        className={`z-30 page-sidebar fixed w-72 bg-primary overflow-auto h-screen hide-scroll ${showMenu ? 'show' : ''
          } shadow-box lg:shadow-none`}
      >
        <div className="fixed cursor-pointer top-5 right-5 lg:hidden">
          <IoClose
            onClick={toggleMenu}
            className="transition w-10 h-auto p-1.5 rounded-md bg-white text-primary hover:bg-white/20"
          />
        </div>

        <div className="sidebar-menu text-white text-sm flex flex-col justify-between h-side-menu px-5 pb-10">
          <div className="px-6 py-5 h-20">
            <Image src={Logo} alt="UseBridgee Inc. logo" priority width={120} height={45} />
          </div>

          <ul className="menu-items pt-5">
            {displayMenu?.map((item: any) => (
              <MenuItem props={item} toggleMenu={toggleMenu} key={item.title} />
            ))}

            <li
              className="cursor-pointer"
              onClick={() => setShowLogoutConfirm(true)}
              role="presentation"
            >
              <Image src={LogoutIcon} alt="logout" width={18} className="w-auto h-auto" />
              <span className="title ml-2.5 mt-[5px]">Logout</span>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

function MenuItem({
  props: {
    title, href, link, icon, children
  },
  toggleMenu
}: any) {
  const { pathname } = useRouter();
  const [isShowingSub, setIsShowingSub] = useState(false);

  useEffect(() => {
    if (!!children && pathname?.includes(link)) {
      setIsShowingSub(true);
    }
  }, [pathname, children, link]);

  return (
    <div className="relative">
      {children ? (
        <li
          className={`${pathname?.includes(link) ? 'bg-primary/10' : ''} justify-between`}
          onClick={() => setIsShowingSub(!isShowingSub)}
          role="presentation"
        >
          <span className="flex">
            <Image src={icon} alt={title} width={18} className="w-auto h-auto" />
            <span className={children ? 'has-sub-menu pointer' : ''}>
              <span className="title ml-2.5 mt-[5px]">{"title"}</span>
            </span>
          </span>
          {isShowingSub ? (
            <IoIosArrowDown className="w-5 h-auto mr-2" />
          ) : (
            <IoIosArrowBack className="w-5 h-auto mr-2" />
          )}
        </li>
      ) : (
        <>
          {href && (
            <a href={href} target="_blank" rel="noreferrer">
              <li>
                <Image src={icon} alt={title} width={18} className="w-auto h-auto" />
                <span className="title ml-2.5 mt-[5px]">{title}</span>
              </li>
            </a>
          )}
          {link && (
            <Link href={link}>
              <li className={`${pathname?.includes(link) ? 'active' : ''}`} onClick={toggleMenu}>
                <Image src={icon} alt={title} width={18} className="w-auto h-auto" />
                <span className="title ml-2.5 mt-[5px]">{title}</span>
              </li>
            </Link>
          )}
        </>
      )}

      {children && isShowingSub && (
        <ul className={`${isShowingSub ? 'show' : ''} sub-menu text-[12px] pl-4`}>
          {children?.map((child: any) => (
            <Link href={child?.link} key={child?.title}>
              <li
                className={`${pathname === child?.link ? 'active' : ''} !py-1 !pl-3`}
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
    icon: PropTypes.any,
    children: PropTypes.arrayOf(
      PropTypes.shape({ title: PropTypes.string, link: PropTypes.string })
    )
  }),
  toggleMenu: PropTypes.func
};

MenuItem.defaultProps = {
  props: {
    title: '',
    href: '',
    link: '',
    icon: '',
    children: [{ title: '', link: '' }]
  },
  toggleMenu: () => { }
};

export default Sidebar;
