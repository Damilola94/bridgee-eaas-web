import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PropTypes from 'prop-types';

import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { FiMenu } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';

import Logo from '../../assets/svgs/logo.svg';

import menuList from '../../configs/sidebarMenu';
import useClickOutsideBox from '../../hooks/useClickOutsideBox';
import { logout } from '../../services/auth';
import { BsDot } from 'react-icons/bs';

function Sidebar() {
  const wrapperRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  useClickOutsideBox(wrapperRef, () => setShowMenu(false));

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div ref={wrapperRef}>
      <div className={`${showMenu ? 'hidden' : ''} fixed cursor-pointer top-5 left-6 z-30 lg:hidden`}>
        <FiMenu
          onClick={toggleMenu}
          className="transition bg-white w-10 h-auto p-1.5 border rounded-md text-primary hover:bg-primary/20"
        />
      </div>

      <nav className={`z-30 page-sidebar fixed w-72 bg-white overflow-auto h-screen hide-scroll ${
        showMenu ? 'show' : ''} shadow-box lg:shadow-none`}>
        <div className="fixed cursor-pointer top-5 right-5 lg:hidden">
          <IoClose
            onClick={toggleMenu}
            className="transition w-10 h-auto p-1.5 rounded-md border text-primary hover:bg-primary/20"
          />
        </div>
        <div className="sidebar-menu text-primary text-sm flex flex-col justify-between h-side-menu px-5 pt-4 pb-10">
          <div className="px-6 pt-6 text-center">
            <Image src={Logo} alt="ALAT Logo" layout="fixed" priority width={70} height={75.1} />
          </div>
          <ul className="menu-items pt-6">
            {menuList?.map((item: any) => (
              <MenuItem props={item} toggleMenu={toggleMenu} key={item.title} />
            ))}
            <li className="cursor-pointer" onClick={handleLogout} role="presentation">
              <HiOutlineLogout className="icon" />
              <span className="title">Logout</span>
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
  }, toggleMenu
}: any) {
  const { pathname } = useRouter();
  const [isShowingSub, setIsShowingSub] = useState(false);

  useEffect(() => {
    if (!!children && pathname?.includes(link)) {
      setIsShowingSub(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="relative">
      {children ? (
        <li
          className={`${pathname?.includes(link) ? 'bg-primary/10' : ''} justify-between`}
          onClick={() => setIsShowingSub(!isShowingSub)}
          role="presentation"
        >
          <span className="flex">
            {icon}
            <span
              className={children ? 'has-sub-menu pointer' : ''}
            >
              <span className="title">{title}</span>
            </span>
          </span>
          {isShowingSub
            ? <IoIosArrowDown className="w-5 h-auto mr-2" />
            : <IoIosArrowBack className="w-5 h-auto mr-2" />}
        </li>
      ) : (
        <>
          {href && (
            <a href={href} target="_blank" rel="noreferrer">
              <li>
                {icon}
                <span className="title">{title}</span>
              </li>
            </a>
          )}
          {link && (
            <Link href={link}>
              <li className={`${pathname === link ? 'active' : ''}`} onClick={toggleMenu}>
                {icon}
                <span className="title">{title}</span>
              </li>
            </Link>
          )}
        </>
      )}

      {children && isShowingSub && (
        <ul className={`${isShowingSub ? 'show' : ''} sub-menu text-[12px] pl-4`}>
          {children?.map((child: any) => (
            <Link href={child?.link} key={child?.title}>
              <li className={`${pathname === child?.link ? 'active' : ''} !py-1 !pl-3`} onClick={toggleMenu}>
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
    icon: PropTypes.node,
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
    children: [
      { title: '', link: '' }
    ]
  },
  toggleMenu: () => { }
};

export default Sidebar;
