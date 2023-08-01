import React from 'react';

import TextInput from '../../inputs/Text';

import { useAccountsContext } from '../../../context/Accounts';

function PersonalDetails() {
  const { accounts } = useAccountsContext();
  const { user } = accounts || {};

  return (
    <div className="w-full max-w-md bg-white rounded-xl px-10 py-7 shadow">
      <div className="w-full">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl mb-5">Personal Details</h2>
        </div>
        <div className="w-full">
          <TextInput
            name="firstName"
            readOnly
            value={user?.firstName || ''}
            className="w-full mb-4"
            label="First name"
            placeholder="First name"
          />
          <TextInput
            name="lastName"
            readOnly
            value={user?.lastName || ''}
            className="w-full mb-4"
            label="Last name"
            placeholder="Last name"
          />
          <TextInput
            type="tel"
            name="phoneNumber"
            readOnly
            value={user?.phoneNumber || ''}
            className="w-full mb-4"
            label="Phone number"
            placeholder="Phone number"
          />
          <TextInput
            type="email"
            name="email"
            readOnly
            value={user?.email || ''}
            className="w-full mb-4"
            label="Email Address"
            placeholder="Email Address"
          />
        </div>
      </div>
    </div>
  );
}

export default PersonalDetails;
