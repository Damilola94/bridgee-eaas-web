import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { personalInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import SelectInput from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';

function PersonalInfoForm() {
  const router = useRouter();
  const [form, setForm] = useState<personalInfoProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const handleSubmit = () => {
    router.push('/get-started/kyc?tab=bvn-validation');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">Personal Information</h2>
          </div>

          <div className="w-full">
            <div className="flex -mx-2">
              <div className="w-1/2 p-2">
                <TextInput
                  name="firstName"
                  onChange={handleChange}
                  value={form?.firstName || ''}
                  className="w-full mb-4"
                  label="First name"
                />
              </div>
              <div className="w-1/2 p-2">
                <TextInput
                  name="lastName"
                  onChange={handleChange}
                  value={form?.lastName || ''}
                  className="w-full mb-4"
                  label="Last name"
                />
              </div>
            </div>
            <TextInput
              name="middleName"
              onChange={handleChange}
              value={form?.middleName || ''}
              className="w-full mb-4"
              label="Middle Name (Optional)"
            />
            <TextInput
              type="tel"
              name="phoneNumber"
              onChange={handleChange}
              value={form?.phoneNumber || ''}
              className="w-full mb-4"
              label="Phone number"
            />
            <TextInput
              type="email"
              name="email"
              onChange={handleChange}
              value={form?.email || ''}
              className="w-full mb-4"
              label="Email Address"
            />
            <TextInput
              type="date"
              name="dob"
              onChange={handleChange}
              value={form?.dob || ''}
              className="w-full mb-4"
              label="Date of Birth"
            />
            <SelectInput
              label="Gender"
              className="mb-4"
              value={form?.gender || undefined}
              onChange={(val) => handleChange(val, 'gender')}
              options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end mt-5">
        <Button paddingY="py-2.5" onClick={handleSubmit}>Save and Continue</Button>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
