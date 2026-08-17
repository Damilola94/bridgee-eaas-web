import React, { useState } from 'react';
import { BsBell } from 'react-icons/bs';

import SendInvite from './SendInvite';
import AdminProfile from './AdminProfile';

type HeaderProps = {
  pageName: string;
  adminName: string;
  greetingName: string;
  avatarInitial: string;
  companyImg?: string;
  hasUnreadNotifications?: boolean;
};

function Header({
  pageName,
  adminName,
  greetingName,
  avatarInitial,
  companyImg,
  hasUnreadNotifications,
}: HeaderProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <header className="fixed z-20 w-full h-20 bg-white border-b border-primary-500/30 lg:pl-72">
        <div className="px-6 w-full h-full flex items-center justify-between !pl-20 lg:!pl-6">
          <h1 className="text-xl font-semibold text-textColor truncate ff-bold">
            {pageName}
          </h1>

          <div className="flex items-center space-x-5">
            

            <button
              type="button"
              className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 shrink-0"
            >
              <BsBell className="h-4 w-4 text-gray-500" />
              {hasUnreadNotifications && (
                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
              )}
            </button>

            <AdminProfile
              adminName={adminName}
              greetingName={greetingName}
              avatarInitial={avatarInitial}
              companyImg={companyImg}
            />

          </div>
        </div>
      </header>

      {showInviteModal && (
        <SendInvite onClose={() => setShowInviteModal(false)} />
      )}
    </>
  );
}

export default Header;