import React, { useState } from 'react';
import Image from 'next/image';

import { RiErrorWarningLine } from 'react-icons/ri';

import EditIcon from '../../../assets/svgs/edit.svg';
import AlatLogo from '../../../assets/images/alat-logo.png';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import notification from '../../../utilities/notification';
import { BusinessProps } from '../../../types/profile';

function BusinessDetails() {
  const [form, setForm] = useState<BusinessProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.businessName) return 'Item name is required';
    return null;
  };

  const handleAddItem = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl px-10 py-7 shadow">
      <div className="w-full">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl mb-5">Business Details</h2>
          <button className="flex items-end font-bold text-success">
            <Image src={EditIcon} alt="icon" className="w-6 h-6 mr-1" />
            Edit
          </button>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap items-end -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <div className="mb-7">
                <Image
                  src={AlatLogo}
                  alt="business logo"
                  className="w-[100px] h-[100px] bg-gray-300 rounded-full object-cover object-center"
                />
                <input hidden type="file" id="logo-file" />
                <div className="flex items-end mt-3">
                  Business Logo
                  <button
                    type="button"
                    className="ml-2"
                  >
                    <Image src={EditIcon} alt="icon" className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <TextInput
                name="businessName"
                value={form?.businessName || ''}
                onChange={handleChange}
                className="w-full mb-5"
                label="Business name"
                placeholder="Business name"
              />
              <TextInput
                name="phoneNumber"
                value={form?.phoneNumber || ''}
                onChange={handleChange}
                className="w-full mb-5"
                label="Phone Number"
                placeholder="Phone Number"
              />
              <TextInput
                name="email"
                value={form?.email || ''}
                onChange={handleChange}
                className="w-full mb-5"
                label="Business email"
                placeholder="Business email"
              />
              <TextInput
                name="address"
                value={form?.address || ''}
                onChange={handleChange}
                className="w-full mb-5"
                label="Business address"
                placeholder="Business address"
              />
            </div>

            <div className="w-full sm:w-1/2 px-2 pt-10">
              <div className="w-full">
                <h3 className="font-black text-lg mb-5">Social Media Details</h3>
                <TextInput
                  name="instagram"
                  value={form?.instagram || ''}
                  onChange={handleChange}
                  className="w-full mb-5"
                  label="Instagram"
                  placeholder="Instagram"
                />
                <TextInput
                  name="facebook"
                  value={form?.facebook || ''}
                  onChange={handleChange}
                  className="w-full mb-5"
                  label="Facebook"
                  placeholder="Facebook"
                />
                <TextInput
                  name="whatsapp"
                  value={form?.whatsapp || ''}
                  onChange={handleChange}
                  className="w-full mb-5"
                  label="Whatsapp number"
                  placeholder="Whatsapp number"
                />
              </div>
              <div className="w-full mt-10">
                <h3 className="font-black text-lg mb-4">Referral</h3>

                <TextInput
                  readOnly
                  name="referral"
                  value={form?.referral || ''}
                  onChange={handleChange}
                  className="w-full mb-5"
                  label="Referral Code"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <Button paddingX="px-10" paddingY="py-3" onClick={handleAddItem}>Save</Button>
          <p className="text-lightText mt-3">
            <RiErrorWarningLine className="w-5 h-5 mr-1 inline" />
            Kindly ensure the information you provide is accurate and precise
          </p>
        </div>
      </div>
    </div>
  );
}

export default BusinessDetails;
