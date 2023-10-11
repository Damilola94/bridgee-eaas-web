import React from 'react';

import ChangePassword from './ChangePassword';
import SecurityToggles from './SecurityToggles';

function SecuritySettings() {
  return (
    <div className="w-full max-w-lg">
      <SecurityToggles />
      <ChangePassword />
    </div>
  );
}

export default SecuritySettings;
