"use client";

import { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { Menu, Transition } from "@headlessui/react";
import { BsPerson, BsPersonAdd } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { HiOutlineLogout, HiSwitchHorizontal } from "react-icons/hi";
import { IoIosArrowDown, IoIosAdd } from "react-icons/io";
import { MdOutlineSecurity } from "react-icons/md";

import BusinessPix from "../../assets/svgs/business-avatar.svg";
import ProfilePix from "../../assets/svgs/personal-avatar.svg";

import { logout } from "../../services/auth";
import { formatFileUrl } from "../../utilities/general";
import { useAccountsContext } from "../../context/Accounts";
import handleFetch from "../../services/api/handleFetch";
import notification from "../../utilities/notification";

import Button from "../inputs/Button";
import Modal from "../common/Modal";

import AddBusiness from "./AddBusiness";
import Loading from "./Loading";
import SendInvite from "./SendInvite";
import { LoginResponse } from "../../types/auth";

const options = (badge = "Personal") => [
  {
    title: "Profile",
    icon: <BsPerson className="w-5 h-auto mr-2" />,
    link: "/settings?tab=personal-details",
    badge,
  },
  {
    title: "Settings",
    icon: <FiSettings className="w-5 h-auto mr-2" />,
    link: "settings",
  },
  {
    title: "Security",
    icon: <MdOutlineSecurity className="w-5 h-auto mr-2" />,
    link: "settings?tab=security-settings",
  },
];

export default function ProfileDropdown({ className }: { className: string }) {
  const { push } = useRouter();
  const [cookie, setCookie] = useCookies(["data"]);
  const { accounts } = useAccountsContext();
  const userRole = cookie?.data?.activeRole || cookie?.data?.roles?.[0] || "Seller";
  const hasMultipleRoles = cookie?.data?.roles?.length > 1;


  const [userPix, setUserPix] = useState<string | undefined>(undefined);
  const [imgHasError, setImgHasError] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (!imgHasError) setUserPix(formatFileUrl(cookie?.data?.user?.imagePath));
  }, [imgHasError, cookie]);

  const handleImgError = () => {
    setUserPix("");
    setImgHasError(true);
  };

  const queryClient = useQueryClient();
  const businessMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      push("/dashboard");
      queryClient.invalidateQueries(["accounts-context"]);
      notification({
        message:
          res?.message || "You have successfully added a new business account",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const addRoleMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || "Account created successfully.",
        type: "success",
      });
     
      queryClient.invalidateQueries(["accounts-context"]);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.message || "Failed to add account.",
        type: "danger",
      });
    },
  });

  const switchRoleMutation = useMutation(handleFetch, {
    onSuccess: (res: LoginResponse) => {
      setCookie("data", res?.data, { secure: true, sameSite: true });

      const newRole = res?.data?.activeRole || res?.data?.roles?.[0]

      notification({
        message: `Switched to ${newRole} account successfully.`,
        type: "success",
      });

      queryClient.invalidateQueries(["accounts-context"]);

      if (newRole === "Buyer") {
        push("/buyer/dashboard");
      } else {
        push("/dashboard");
      }
    },
    onError: (err: any) => {
      notification({
        title: "Switch Failed",
        message: err?.message || "Failed to switch account.",
        type: "danger",
      });
    },
  });

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
    setShowLogoutConfirm(false);
  };

  const { isLoading } = businessMutation;
  const { isLoading: isLoggingOut, isSuccess } = logoutMutation;
  const { isLoading: isAddingRole } = addRoleMutation;
  const { isLoading: isSwitching } = switchRoleMutation;

  const addAccountOption = hasMultipleRoles
    ? {
        title: "Switch Account",
        icon: <HiSwitchHorizontal className="w-5 h-auto mr-2" />,
        onClick: () => {
          const oppositeRole = userRole === "Seller" ? "Buyer" : "Seller";
          switchRoleMutation.mutate({
            service: "identity-service/api/v1/",
            endpoint: "auth/switch-role",
            method: "POST",
            body: {
              userId: cookie?.data?.userId,
              activeRole: oppositeRole,
            },
            auth: true,
          });
        },
      }
    : userRole === "Seller"
    ? {
        title: "Add Buyer Account",
        icon: <IoIosAdd className="w-5 h-auto mr-2" />,
        onClick: () => {
          addRoleMutation.mutate({
            service: "identity-service/api/v1/",
            endpoint: "users/add-role",
            method: "POST",
            body: {
              userId: cookie?.data?.userId,
              roleToAdd: "Buyer",
            },
            auth: true,
          });
        },
      }
    : {
        title: "Add Seller Account",
        icon: <IoIosAdd className="w-5 h-auto mr-2" />,
        onClick: () => {
          addRoleMutation.mutate({
            service: "identity-service/api/v1/",
            endpoint: "users/add-role",
            method: "POST",
            body: {
              userId: cookie?.data?.userId,
              roleToAdd: "Seller",
            },
            auth: true,
          });
        },
      };

  return (
    <>
      {isLoading && (
        <Loading
          message={
            accounts?.user?.isActive
              ? "Switching account..."
              : "Activating account..."
          }
        />
      )}

      {isAddingRole && <Loading message="Adding account..." />}

      {isSwitching && <Loading message="Switching account..." />}

      {(isLoggingOut || isSuccess) && <Loading message="Logging out..." />}

      <div className={`${className} text-right`}>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex space-x-3 items-center">
            <div className="flex space-x-3 items-center min-w-max">
              <Image
                onError={handleImgError}
                src={
                  userPix ||
                  (accounts?.defaultMerchant ? BusinessPix : ProfilePix)
                }
                alt="user avatar"
                width={40}
                height={40}
                className="rounded-full mr-1 w-auto h-auto"
              />
              <span className="text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                Verified {userRole}
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
                {options(
                  accounts?.defaultMerchant?.id ? "Business" : "Personal"
                )?.map((item) => (
                  <Menu.Item key={item.title}>
                    {({ active, close }) => (
                      <span>
                        <Link href={item?.link} onClick={close}>
                          <div
                            className={`${
                              active ? "bg-primary bg-opacity-5" : "bg-white"
                            } flex justify-between items-center px-4 py-2`}
                          >
                            <div className="flex text-black items-center">
                              {item.icon}
                              <span className="mt-1.5 font-bold">
                                {item.title}
                              </span>
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

              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={addAccountOption.onClick}
                    className={`${
                      active ? "bg-primary bg-opacity-5" : "bg-white"
                    } w-full flex items-center px-4 py-2`}
                  >
                    {addAccountOption.icon}
                    <span className="font-bold">{addAccountOption.title}</span>
                  </button>
                )}
              </Menu.Item>

              <div>
                {process.env.NEXT_PUBLIC_SEND_INVITE === "true" && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setShowInviteModal(true)}
                        className={`${
                          active ? "bg-primary bg-opacity-5" : "bg-white"
                        } w-full flex items-center px-4 py-2`}
                      >
                        <BsPersonAdd className="w-5 h-auto mr-2" />
                        <span className="mt-1.5 font-bold">Send Invite</span>
                      </button>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => setShowLogoutConfirm(true)}
                      className={`${
                        active ? "bg-error/5" : "bg-white"
                      } rounded-b-lg w-full text-error flex items-center px-4 py-2`}
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

      <AddBusiness
        isOpen={showBusinessForm}
        onClose={() => setShowBusinessForm(false)}
      />
      {showInviteModal && (
        <SendInvite onClose={() => setShowInviteModal(false)} />
      )}

      <Modal
        maxWidth="max-w-[400px]"
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(!showLogoutConfirm)}
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
    </>
  );
}

ProfileDropdown.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    firstName: PropTypes.string,
  }),
};

ProfileDropdown.defaultProps = {
  className: "",
  data: {},
};
