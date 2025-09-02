
import TextInput from '../../inputs/Text';
import InfoCircleIcon from "../../../assets/svgs/info-circle.svg";

import Image from 'next/image';
import { useAccountsContext } from '../../../context/Accounts';
import PhoneNumberInput from '../../inputs/PhoneNumberInput';
import { useMemo } from 'react';

function PersonalDetails() {
  const { accounts } = useAccountsContext()

  const personalDetail = accounts?.identity?.personalDetail;

  const { countryCode, localNumber } = useMemo(() => {
    const fullNumber = personalDetail?.phoneNumber || "";

    return {
      countryCode: "+234",
      localNumber: fullNumber
    };
  }, [personalDetail?.phoneNumber]);


  return (
    <div className="">
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-xl mb-5">Personal Details</h2>
      </div>
      <div className="w-full">
        <TextInput
          name="firstName"
          readOnly
          value={personalDetail?.firstName || ""}
          className="w-full mb-4"
          label="First name"
          placeholder="First name"
        />
        <TextInput
          name="lastName"
          readOnly
          value={personalDetail?.lastName || ""}
          className="w-full mb-4"
          label="Last name"
          placeholder="Last name"
        />
        <TextInput
          type="email"
          name="email"
          readOnly
          value={personalDetail?.email || ""}
          className="w-full mb-4"
          label="Email Address"
          placeholder="Email Address"
        />

        <PhoneNumberInput
          label="Phone number"
          className="w-full mb-4"
          countryCode={countryCode}
          phoneNumber={localNumber}
          disabled={true}
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
