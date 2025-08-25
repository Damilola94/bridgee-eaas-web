import React from 'react';

import TextInput from '../../inputs/Text';
import InfoCircleIcon from "../../../assets/svgs/info-circle.svg"

import { useAccountsContext } from '../../../context/Accounts';
import Image from 'next/image';

function PersonalDetails() {
  const { accounts } = useAccountsContext();
  const { user } = accounts || {};

 return (
    <div className="">
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-xl mb-5">Personal Details</h2>
      </div>
      <div className="w-full">
        <TextInput
          name="firstName"
          readOnly
          value={""}
          className="w-full mb-4"
          label="First name"
          placeholder="First name"
        />
        <TextInput
          name="lastName"
          readOnly
          value={""}
          className="w-full mb-4"
          label="Last name"
          placeholder="Last name"
        />
        <TextInput
          type="email"
          name="email"
          readOnly
          value={""}
          className="w-full mb-4"
          label="Email Address"
          placeholder="Email Address"
        />
        <TextInput
          type="tel"
          name="phoneNumber"
          readOnly
          value={""}
          className="w-full mb-4"
          label="Phone number"
          placeholder="Phone number"
        />
      </div>

      <div className="flex items-start space-x-2 p-3 rounded-md">
        <Image src={InfoCircleIcon} alt="Information" />
        <p className="text-sm text-textColor/50">
          Kindly note the information above is not editable, this is because
          it's the information tied to your BVN.
        </p>
      </div>
    </div>
  );
}

export default PersonalDetails;
