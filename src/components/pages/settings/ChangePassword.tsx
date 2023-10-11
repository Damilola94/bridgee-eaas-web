import React, { useState } from 'react';
import { useMutation } from 'react-query';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import Loading from '../../common/Loading';

type FormProps = {
  oldPassword?: string;
  newPassword?: string;
  comparePassword?: string;
};

function ChangePassword() {
  const [body, setBody] = useState<FormProps>({});

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setBody((state) => ({ ...state, [name]: value }));
  };

  const passwordMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setBody({});
      notification({
        title: 'Successful Update',
        message: res?.message || 'You have successfully changed your password',
        type: 'success'
      });
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
    if (!body?.oldPassword) return 'Your current password is required';
    if (!body?.newPassword) return 'Your current password is required';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/.test(body?.newPassword || '')) {
      return 'Your new password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character';
    }
    if (!body?.comparePassword) return 'Your current password is required';
    if (body?.newPassword !== body?.comparePassword) return 'Password mismatch';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    passwordMutation.mutate({
      endpoint: 'user', extra: 'change-password', method: 'PUT', body, auth: true
    });
  };

  const { isLoading } = passwordMutation;

  return (
    <>
      {isLoading && <Loading />}

      <div className="w-full bg-white rounded-xl px-10 py-7 shadow">
        <div className="w-full">
          <h2 className="font-bold text-xl mb-5">Update Password</h2>

          <div className="w-full">
            <TextInput
              name="oldPassword"
              value={body?.oldPassword || ''}
              onChange={handleChange}
              type="password"
              className="w-full mb-5"
              label="Current password"
              placeholder="Current password"
            />
            <TextInput
              name="newPassword"
              value={body?.newPassword || ''}
              onChange={handleChange}
              type="password"
              className="w-full mb-5"
              label="New password"
              placeholder="New password"
            />
            <TextInput
              name="comparePassword"
              value={body?.comparePassword || ''}
              onChange={handleChange}
              type="password"
              className="w-full mb-5"
              label="Confirm new password"
              placeholder="Confirm new password"
            />
          </div>

          <div className="w-full mt-10">
            <Button paddingX="px-10" paddingY="py-3" className="w-full" onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
