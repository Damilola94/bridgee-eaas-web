import React, { useState } from 'react';

import { RiErrorWarningLine } from 'react-icons/ri';

import EditIcon from '../../../assets/svgs/edit.svg';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import notification from '../../../utilities/notification';
import Image from 'next/image';
import { ProfileProps } from '../../../types/profile';

function ProfileDetails() {
  const [form, setForm] = useState<ProfileProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.firstName) return 'Item name is required';
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
    <div className="w-full max-w-md bg-white rounded-xl px-10 py-7 shadow">
      <div className="w-full">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl mb-5">Personal Details</h2>
          <button className="flex items-end font-bold text-success">
            <Image src={EditIcon} alt="icon" className="w-6 h-6 mr-1" />
            Edit
          </button>
        </div>
        <div className="w-full">
          <TextInput
            name="firstName"
            value={form?.firstName || ''}
            onChange={handleChange}
            className="w-full mb-4"
            label="First name"
            placeholder="First name"
          />
          <TextInput
            name="lastName"
            value={form?.lastName || ''}
            onChange={handleChange}
            className="w-full mb-4"
            label="Last name"
            placeholder="Last name"
          />
          <TextInput
            type="tel"
            name="phoneNumber"
            value={form?.phoneNumber || ''}
            onChange={handleChange}
            className="w-full mb-4"
            label="Phone number"
            placeholder="Phone number"
          />
          <TextInput
            type="email"
            name="email"
            value={form?.email || ''}
            onChange={handleChange}
            className="w-full mb-4"
            label="Email Address"
            placeholder="Email Address"
          />
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

export default ProfileDetails;
