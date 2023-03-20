import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';

import Button from '../inputs/Button';
import Notifications from './Notifications';

import ProfileDropdown from './ProfileDropdown';
import SendInvite from './SendInvite';

function Header() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <header className="fixed z-20 w-full h-20 bg-white border-b lg:pl-72">
        <div className="content w-full h-full flex items-center justify-end !pl-20 lg:!pl-4">
          <div className="flex items-center space-x-5">
            <Button paddingX="px-2" paddingY="pt-1.5 pb-1" onClick={() => setShowInviteModal(true)}>
              <BiPlus className="mr-1 mb-1" />
              Invite
            </Button>
            <div className="flex items-start space-x-5 text-textColor mr-5">
              <Notifications />
              <ProfileDropdown />
            </div>

          </div>
        </div>
      </header>

      {showInviteModal && <SendInvite onClose={() => setShowInviteModal(false)} />}
    </>
  );
}

export default Header;
