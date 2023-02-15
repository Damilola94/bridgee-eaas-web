import React from 'react';
import Notifications from './Notifications';

import ProfileDropdown from './ProfileDropdown';

function Header() {
  return (
    <>
      <header className="fixed z-20 w-full h-20 bg-white border-b lg:pl-72">
        <div className="content w-full h-full flex items-center justify-end !pl-20 lg:!pl-4">
          <div className="flex items-center space-x-5 text-textColor mr-5">
            <Notifications />
            <ProfileDropdown />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
