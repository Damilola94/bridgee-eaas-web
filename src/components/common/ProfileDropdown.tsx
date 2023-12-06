import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';
import { Menu, Transition, Popover } from '@headlessui/react';
import {
  BsPerson, BsChevronRight, BsPlus, BsPersonAdd
} from 'react-icons/bs';
import { FiSettings, FiRefreshCcw } from 'react-icons/fi';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineSecurity } from 'react-icons/md';

import BusinessPix from '../../assets/svgs/business-avatar.svg';
import ProfilePix from '../../assets/svgs/personal-avatar.svg';

import { logout } from '../../services/auth';
import { formatFileUrl } from '../../utilities/general';
import { useAccountsContext } from '../../context/Accounts';
import handleFetch from '../../services/api/handleFetch';
import notification from '../../utilities/notification';

import AddBusiness from './AddBusiness';
import Loading from './Loading';
import SendInvite from './SendInvite';

const options = (badge = 'Personal') => [
  {
    title: 'Profile', icon: <BsPerson className="w-5 h-auto mr-2" />, link: '/settings?tab=personal-details', badge
  },
  { title: 'Settings', icon: <FiSettings className="w-5 h-auto mr-2" />, link: 'settings' },
  { title: 'Security', icon: <MdOutlineSecurity className="w-5 h-auto mr-2" />, link: 'settings?tab=security-settings' }
];

export default function ProfileDropdown({ className }: { className: string }) {
  const { push } = useRouter();
  const [cookie] = useCookies(['data']);
  const { accounts } = useAccountsContext();

  const [userPix, setUserPix] = useState<string | undefined>(undefined);
  const [imgHasError, setImgHasError] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    if (!imgHasError) setUserPix(formatFileUrl(cookie?.data?.user?.imagePath));
  }, [imgHasError, cookie]);

  const handleImgError = () => {
    setUserPix('');
    setImgHasError(true);
  };

  const queryClient = useQueryClient();
  const businessMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      push('/dashboard');
      queryClient.invalidateQueries(['accounts-context']);
      notification({
        message: res?.message || 'You have successfully added a new business account',
        type: 'success'
      });
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

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
      endpoint: 'auth', extra: 'logout', method: 'POST', auth: true
    });
  };

  const handleSwitch = (switchType = 'personal', merchantId = null) => {
    businessMutation.mutate({
      endpoint: 'user',
      extra: 'switch-account',
      method: 'POST',
      body: { merchantId },
      auth: true,
      pQuery: { switchType }
    });
  };

  const { isLoading } = businessMutation;
  const { isLoading: isLoggingOut, isSuccess } = logoutMutation;

  return (
    <>
      {isLoading && <Loading message={accounts?.user?.isActive ? 'Switching account...' : 'Activating account...'} />}
      {(isLoggingOut || isSuccess) && <Loading message="Logging out..." />}

      <div className={`${className} text-right`}>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex space-x-3 items-center">
            <div className="flex space-x-3 items-center min-w-max">
              <Image
                onError={handleImgError}
                src={userPix || (accounts?.defaultMerchant ? BusinessPix : ProfilePix)}
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full mr-1 w-auto h-auto"
              />
              <span className="text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                {accounts?.defaultMerchant?.name || accounts?.user?.firstName || '---'}
              </span>
            </div>
            <Menu.Button className="text-sm font-medium text-black">
              <IoIosArrowDown
                className="h-8 w-8 p-1 rounded-lg hover:bg-gray-200"
                aria-hidden="true"
              />
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
            <Menu.Items className="flex flex-col absolute right-0 -mt-1.5 w-[170px] origin-top-right rounded-b-lg overflow-visible bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="border-b">
                {options(accounts?.defaultMerchant?.id ? 'Business' : 'Personal')?.map((item) => (
                  <Menu.Item key={item.title}>
                    {({ active, close }) => (
                      <span>
                        <Link href={item?.link} onClick={close}>
                          <div className={`${active ? 'bg-primary bg-opacity-5' : 'bg-white'} flex justify-between items-center px-4 py-2`}>
                            <div className="flex text-black items-center">
                              {item.icon}
                              <span className="mt-1.5 font-bold">{item.title}</span>
                            </div>
                            {item?.badge && (
                              <span className="text-primary text-xs font-bold px-2 py-0.5 rounded bg-primary/10">
                                {item?.badge}
                              </span>
                            )}
                          </div>
                        </Link>
                      </span>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div>
                <Menu.Item>
                  {({ active }) => (
                    <Popover className="relative">
                      <Popover.Button className={`${active ? 'bg-primary/5' : 'bg-white'} w-full text-black flex justify-between items-center px-4 py-2`}>
                        <div className="flex items-center">
                          <FiRefreshCcw className="w-5 h-auto mr-2" />
                          <span className="mt-1.5 font-bold">Switch Account</span>
                        </div>
                        <BsChevronRight className="w-4 h-auto ml-1" />
                      </Popover.Button>
                      <Popover.Panel className="absolute top-0 right-[101%] rounded-lg overflow-hidden bg-white shadow-lg">
                        <div className="w-56 border-b">
                          {accounts?.defaultMerchant?.id ? (
                            <button
                              type="button"
                              onClick={() => handleSwitch()}
                              className="w-full flex justify-between px-4 py-3 hover:bg-gray-50 disabled:bg-gray-50"
                              disabled={!accounts?.defaultMerchant?.id}
                            >
                              {accounts?.user?.isActive
                                ? (
                                  <>
                                    <span>{accounts?.user?.firstName}</span>
                                    <span className="text-primary text-xs font-bold px-2 py-0.5 rounded bg-primary/10">
                                      Personal
                                    </span>
                                  </>
                                )
                                : (
                                  <>
                                    <BsPlus className="w-5 h-auto" />
                                    <span className="mt-0.5">Activate Personal Account</span>
                                  </>
                                )}
                            </button>
                          ) : null}
                          {accounts?.merchants?.map((item: any) => (
                            item?.id !== accounts?.defaultMerchant?.id
                              ? (
                                <button
                                  key={item?.id}
                                  type="button"
                                  onClick={() => handleSwitch('merchant', item?.id)}
                                  disabled={item?.id === accounts?.defaultMerchant?.id}
                                  className="w-full flex px-4 py-3 hover:bg-gray-50 disabled:bg-gray-50"
                                >
                                  {item?.name}
                                </button>
                              )
                              : null
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowBusinessForm(true)}
                          className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-success/5"
                        >
                          <BsPlus className="w-5 h-auto" />
                          <span className="mt-0.5">Add Business Account</span>
                        </button>
                      </Popover.Panel>
                    </Popover>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => setShowInviteModal(true)}
                      className={`${active ? 'bg-primary bg-opacity-5' : 'bg-white'} w-full flex items-center px-4 py-2`}
                    >
                      <BsPersonAdd className="w-5 h-auto mr-2" />
                      <span className="mt-1.5 font-bold">Send Invite</span>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`${active ? 'bg-error/5' : 'bg-white'} rounded-b-lg w-full text-error flex items-center px-4 py-2`}
                    >
                      <HiOutlineLogout className="w-5 h-auto mr-2" />
                      <span className="mt-1.5 font-bold">Sign Out</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <AddBusiness isOpen={showBusinessForm} onClose={() => setShowBusinessForm(false)} />
      {showInviteModal && <SendInvite onClose={() => setShowInviteModal(false)} />}

    </>
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
