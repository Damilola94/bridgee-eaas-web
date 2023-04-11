import React, { useState } from 'react';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import notification from '../../../utilities/notification';
import { ProfileProps } from '../../../types/profile';

function ChangePassword() {
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
    <div className="w-full max-w-3xl bg-white rounded-xl px-10 py-7 shadow">
      <div className="w-full">
        <h2 className="font-bold text-xl mb-5">Update Password</h2>

        <div className="w-full">
          <TextInput
            name="firstName"
            value={form?.firstName || ''}
            onChange={handleChange}
            className="w-full mb-5"
            label="Current password"
            placeholder="Current password"
          />
          <TextInput
            name="lastName"
            value={form?.lastName || ''}
            onChange={handleChange}
            className="w-full mb-5"
            label="New password"
            placeholder="New password"
          />
          <TextInput
            name="lastName"
            value={form?.lastName || ''}
            onChange={handleChange}
            className="w-full mb-5"
            label="Confirm new password"
            placeholder="Confirm new password"
          />
        </div>

        <div className="w-full mt-10">
          <Button paddingX="px-10" paddingY="py-3" className="w-full" onClick={handleAddItem}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
