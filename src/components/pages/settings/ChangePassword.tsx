import { useState } from 'react';
import { useMutation } from 'react-query';

import Image from 'next/image';

import Button from '../../inputs/Button';
import TextInput from '../../inputs/Text';

import notification from '../../../utilities/notification';
import Loading from '../../common/Loading';
import { changePassword } from '../../../services/api/password';
import { ChangePasswordData } from '../../../types/password';
import Modal from '../../common/Modal';
import CheckIncompleteCircle from "../../../assets/svgs/check-incomplete-circle.svg";

type FormProps = {
  oldPassword?: string;
  newPassword?: string;
  comparePassword?: string;
};

function ChangePassword() {
  const [body, setBody] = useState<FormProps>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setBody((state) => ({ ...state, [name]: value }));
  };

  const passwordMutation = useMutation(changePassword, {
    onSuccess: (res: any) => {
      if (res.isSuccess) {
        setBody({});
        setShowSuccessModal(true);
        notification({
          title: 'Successful Update',
          message: res.message || 'You have successfully changed your password',
          type: 'success'
        });
      }
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
    if (!body?.newPassword) return 'Your new password is required';
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&~`'"])[A-Za-z\d@$#!%*?&~`'"]{8,}$/.test(body?.newPassword || '')) {
      return 'Your new password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character (@$#!%*?&~`\'")';
    }
    if (!body?.comparePassword) return 'Your new password confirmation is required';
    if (body?.newPassword !== body?.comparePassword) return 'Password mismatch';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const apiData: ChangePasswordData = {
      currentPassword: body.oldPassword!,
      newPassword: body.newPassword!,
      confirmNewPassword: body.comparePassword!
    };

    passwordMutation.mutate(apiData);
  };

  const isFormValid = () => {
    const error = validateForm();
    return !error;
  };

  const { isLoading } = passwordMutation;

  return (
    <>
      {isLoading && <Loading />}

      <div className="w-full bg-white rounded-xl px-10 py-7 shadow">
        <div className="w-full">
          <h2 className="font-bold text-xl mb-9">Update Password</h2>

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
            <Button paddingX="px-10" paddingY="py-3" className="w-full" disabled={!isFormValid() || passwordMutation.isLoading} onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        isCenter={true}
        maxWidth="max-w-md"
        isCloseOnOverlayClick={false}
        isShowCloseIcon={false}
      >
        <div className="text-center p-6">
          <div className='flex justify-center'>
            <Image src={CheckIncompleteCircle} alt="success icon" />
          </div>

          <p className='text-xl font-bold text-textColor py-4'>Password update successful</p>

          <p className="mb-6 text-grey2">Your password has been updated successfully.</p>
          <Button
            onClick={() => setShowSuccessModal(false)}
            className="bg-success text-white px-6 py-2 rounded w-full"
          >
            Go back to security settings
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default ChangePassword;
