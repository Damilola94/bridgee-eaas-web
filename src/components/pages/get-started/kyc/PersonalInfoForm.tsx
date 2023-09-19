import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { PersonalInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import SelectInput from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';
import { useKycContext } from '../../../../context/Kyc';
import handleFetch from '../../../../services/api/handleFetch';
import notification from '../../../../utilities/notification';
import { formatApiDate } from '../../../../utilities/dateTime';
import Loading from '../../../common/Loading';

function PersonalInfoForm() {
  const router = useRouter();
  const { kycData } = useKycContext();
  const [form, setForm] = useState<PersonalInfoProps>({});

  const { personalInformation } = kycData || {};

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...personalInformation,
      gender: personalInformation?.gender
        ? { label: personalInformation?.gender, value: personalInformation?.gender }
        : undefined
    }));
  }, [personalInformation]);

  const queryClient = useQueryClient();
  const personalMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['user-information']);
      router.push('/get-started/kyc?step=bvn-validation');
      notification({
        message: res?.message || 'You have successfully created an invoice',
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

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.dateOfBirth) return 'Please, enter your date of birth.';
    if (!form?.gender?.value) return 'Please, select your gender.';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const body = new FormData();
    body.append('dateOfBirth', form.dateOfBirth!);
    body.append('gender', String(form?.gender?.value));

    personalMutation.mutate({
      endpoint: 'user', extra: 'update-user-info-kyc', method: 'PUT', body, multipart: true, auth: true
    });
  };

  const { isLoading } = personalMutation;

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">Personal Information</h2>
          </div>

          <div className="w-full">
            <div className="flex -mx-2">
              <div className="w-1/2 px-2">
                <TextInput
                  readOnly
                  onChange={handleChange}
                  value={form?.firstName || ''}
                  className="w-full mb-4"
                  label="First name"
                />
              </div>
              <div className="w-1/2 px-2">
                <TextInput
                  readOnly
                  onChange={handleChange}
                  value={form?.lastName || ''}
                  className="w-full mb-4"
                  label="Last name"
                />
              </div>
            </div>
            <TextInput
              readOnly
              onChange={handleChange}
              value={form?.otherName || ''}
              className="w-full mb-4"
              label="Middle Name (Optional)"
            />
            <TextInput
              readOnly
              onChange={handleChange}
              value={form?.phoneNumber || ''}
              className="w-full mb-4"
              label="Phone number"
            />
            <TextInput
              readOnly
              onChange={handleChange}
              value={form?.email || ''}
              className="w-full mb-4"
              label="Email Address"
            />
            <TextInput
              type="date"
              name="dob"
              onChange={(val) => handleChange(formatApiDate(val.target.value), 'date', 'dateOfBirth')}
              value={form?.dateOfBirth || ''}
              className="w-full mb-4"
              label="Date of Birth"
            />
            <SelectInput
              label="Gender"
              className="mb-4"
              value={form?.gender || undefined}
              onChange={(val) => handleChange(val, 'select', 'gender')}
              options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]}
            />
          </div>
        </div>
      </div>

      <div className="flex mt-5 -mx-2">
        <div className="w-1/2 px-2">
          <Button
            border
            borderColor="border-gray-300"
            bgColor="bg-white"
            textColor="text-black"
            className="w-full"
            paddingY="py-3"
            onClick={() => router.push('/get-started/kyc?step=bvn-validation')}
          >
            Next
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Button
            className="w-full whitespace-nowrap"
            paddingY="py-3"
            onClick={handleSubmit}
          >
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
