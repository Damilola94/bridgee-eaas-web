import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import handleFetch from '../../services/api/handleFetch';
import { BusinessFormProps } from '../../types/auth';
import notification from '../../utilities/notification';
import Button from '../inputs/Button';
import SelectInput from '../inputs/Select';
import TextInput from '../inputs/Text';
import Loading from './Loading';

import Modal from './Modal';

type Props = {
  isOpen: boolean,
  onClose: () => void
};

function AddBusiness({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<BusinessFormProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const queryClient = useQueryClient();
  const businessMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['accounts-context']);
      notification({
        message: res?.message || 'You have successfully added a new business account',
        type: 'success'
      });
      onClose();
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const validateForm = () => {
    const errors = [];
    if (!form?.name) errors.unshift('Business name is required');
    if (!form?.email) errors.unshift('Email address is required');
    if (!/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(form?.email || '')) {
      errors.unshift('Please enter a valid email');
    }
    if (!form?.businessType?.value) errors.unshift('Business type is required');
    return errors;
  };

  const handleAddBusiness = (e: any) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      errors.forEach((item) => notification({ title: 'Form Error', message: item, type: 'danger' }));
      return;
    }

    const body = {
      ...form,
      businessType: form?.businessType?.value
    };

    businessMutation.mutate({
      endpoint: 'merchant', extra: 'create-merchant', method: 'POST', body, auth: true
    });
  };

  const { isLoading } = businessMutation;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCenter maxWidth='max-w-[450px]'>
      {isLoading && <Loading message="Creating Business..." />}

      <form className="w-full py-5" onSubmit={handleAddBusiness}>
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">New Business Information</h1>
          <p className="text-sm text-lightText">Tell us more about your new business</p>
        </div>

        <div className="w-full">
          <TextInput
            className="w-full mb-5"
            onChange={handleChange}
            value={form?.name || ''}
            name="name"
            label="Business Name"
            placeholder="Business Name"
          />

          <TextInput
            className="w-full mb-5"
            onChange={handleChange}
            value={form?.email || ''}
            name="email"
            type="email"
            label="Business Email"
            placeholder="Business Email"
          />

          <SelectInput
            className="w-full mb-10"
            onChange={(val) => handleChange(val, 'select', 'businessType')}
            value={form?.businessType}
            label="Business Type"
            options={[
              { label: 'Registered Business', value: 'Registered' },
              { label: 'Unregistered Business', value: 'UnRegistered' }
            ]}
            placeholder="Business Type"
          />

          <Button
            className="w-full text-lg ff-bold !rounded-md md-2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Done
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddBusiness;
