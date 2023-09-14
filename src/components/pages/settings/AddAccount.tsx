import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import handleFetch from '../../../services/api/handleFetch';
import notification from '../../../utilities/notification';
import Button from '../../inputs/Button';
import SelectInput from '../../inputs/Select';
import TextInput from '../../inputs/Text';
import Modal from '../../common/Modal';
import Loading from '../../common/Loading';

type Props = {
  onClose: () => void
};

type FormProps = {
  bank?: { label: string, value: string };
  accountNumber?: string;
  accountName?: string;
}

function AddAccount({ onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const queryClient = useQueryClient();
  const businessMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      router.push('/dashboard');
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
    if (!form?.bank?.value) errors.unshift('Bank name is required');
    if (!form?.accountNumber) errors.unshift('Account number is required');
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
      bank: form?.bank?.value
    };

    businessMutation.mutate({
      endpoint: 'accounts', extra: '', method: 'POST', body, auth: true
    });
  };

  const { isLoading } = businessMutation;

  return (
    <Modal isOpen onClose={onClose} isCenter maxWidth='max-w-[400px]'>
      {isLoading && <Loading />}

      <form className="w-full py-5" onSubmit={handleAddBusiness}>
        <div className="mb-7">
          <h1 className="w-full text-textColor ff-bold text-xl mb-2">Account Details</h1>
        </div>

        <div className="w-full">
          <SelectInput
            className="w-full mb-5"
            onChange={(val) => handleChange(val, 'select', 'bank')}
            value={form?.bank}
            label="Bank name"
            options={[
              { label: 'Registered Business', value: 'Registered' },
              { label: 'Unregistered Business', value: 'UnRegistered' }
            ]}
            placeholder="Bank name"
          />

          <TextInput
            className="w-full mb-5"
            onChange={handleChange}
            value={form?.accountNumber || ''}
            name="accountNumber"
            label="Account number"
            placeholder="Account number"
          />

          <TextInput
            readOnly
            className="w-full mb-10"
            onChange={handleChange}
            value={form?.accountName || ''}
            label="Account Name"
            placeholder="Account Name"
          />

          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAccount;
