import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { Menu, Transition } from '@headlessui/react';
import { BsPerson } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineSecurity } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';

import ProfilePix from '../../assets/svgs/personal-avatar.svg';

import { logout } from '../../services/auth';
import { formatFileUrl } from '../../utilities/general';

const options = [
  { title: 'Profile', icon: <BsPerson className="mr-2" />, link: '/profile' },
  { title: 'Settings', icon: <FiSettings className="mr-2" />, link: '/profile/settings' },
  { title: 'Security', icon: <MdOutlineSecurity className="mr-2" />, link: '/profile/security' }
];

export default function ProfileDropdown({ className }: { className: string }) {
  const [cookie] = useCookies(['data']);
  const { pathname } = useRouter();
  const [userPix, setUserPix] = useState<string | null>(null);
  const [imgHasError, setImgHasError] = useState(false);

  useEffect(() => {
    if (!imgHasError) setUserPix(formatFileUrl(cookie?.data?.user?.imagePath));
  }, [imgHasError, cookie]);

  const handleImgError = () => {
    setUserPix('');
    setImgHasError(true);
  };

  return (
    <div className={`${className} text-right`}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="text-sm font-medium text-black">
            <div className="flex space-x-3 items-center">
              <Image
                onError={handleImgError}
                src={userPix || ProfilePix}
                alt="user avater"
                width={40}
                height={40}
                className="rounded-full mr-1"
              />
              <span className="text-primary font-bold px-2 py-0.5 rounded bg-primary/10">{cookie.data?.firstName}</span>
              <IoIosArrowDown
                className="ml-1.5 h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="flex flex-col absolute right-0 mt-1 w-40 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options?.map((item) => (
              <Menu.Item key={item.title}>
                {({ active }) => (
                  <span>
                    <Link href={item?.link}>
                      <div className={`${active || pathname === item.link ? 'bg-primary text-white'
                        : 'bg-white text-black'} ${active ? 'bg-opacity-20' : ''} flex items-center px-4 py-2`}>
                        {item.icon}
                        {item.title}
                      </div>
                    </Link>
                  </span>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={() => logout()}
                  className={`${active ? 'bg-primary opacity-20 text-white' : 'bg-white text-black'} flex items-center px-4 py-2`}
                >
                  <HiOutlineLogout className="mr-2" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

ProfileDropdown.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    firstName: PropTypes.string
  })
};

ProfileDropdown.defaultProps = {
  className: '',
  data: {}
};
