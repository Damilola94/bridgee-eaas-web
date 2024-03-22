import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { PersonalInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';
import { useKycContext } from '../../../../context/Kyc';

import TextInput from '../../../inputs/Text';
import notification from '../../../../utilities/notification';
import Loading from '../../../common/Loading';
import handleFetch from '../../../../services/api/handleFetch';
import useFormStage from '../../../../hooks/useFormStage';

import FaceCaptureModal from './FaceCaptureModal';

function BvnForm({ setBvn, showCapModal, setShowCapModal }: any) {
  const router = useRouter();
  const { kycData } = useKycContext();
  const formStage = useFormStage();
  const [form, setForm] = useState<PersonalInfoProps>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { personalInformation } = kycData || {};

  useEffect(() => {
    setForm({ bvn: personalInformation?.bvn });
  }, [personalInformation]);

  const queryClient = useQueryClient();
  const personalMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setShowSuccessMessage(!showSuccessMessage);
      setBvn(form?.bvn);
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
    if (!form?.bvn) return 'Please, enter your BVN.';
    if (form?.bvn?.length !== 11) return 'Please, enter a valid BVN.';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const body = { bvn: form?.bvn };

    personalMutation.mutate({
      endpoint: 'user', extra: 'add-and-validate-bvn', method: 'POST', body, auth: true
    });
  };

  const handleOpenFaceCapturing = () => {
    setShowCapModal(!showCapModal);
    router.push('/get-started/kyc?step=take-a-selfie');
    queryClient.invalidateQueries(['user-information']);
  };

  const isCompleted = formStage?.kycStatus === 'Completed';
  const { isLoading } = personalMutation;

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      {showSuccessMessage && <FaceCaptureModal onClose={handleOpenFaceCapturing} />}
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">BVN Validation</h2>
          </div>
          <div className="w-full">
            <TextInput
              name="bvn"
              disabled={isCompleted}
              onChange={(e) => /^\d{0,12}$/g.test(e.target.value) && handleChange(e)}
              value={form?.bvn || ''}
              className="w-full mb-1"
              label="BVN"
            />
            <p className="text-lightText text-sm">
              To get your BVN dial *565*0# on your registered number.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-5 -mx-2">
        <div className="w-1/2 px-2">

        </div>
        {isCompleted ? (
          <div className="w-1/2 px-2">
            <Button
              border
              borderColor="border-gray-300"
              bgColor="bg-white"
              textColor="text-black"
              className="w-full"
              paddingY="py-3"
              onClick={() => router.push('/get-started/kyc?step=take-a-selfie')}
            >
              Next
            </Button>
          </div>
        ) : (
          <div className="w-1/2 px-2">
            <Button
              className="w-full whitespace-nowrap"
              paddingY="py-3"
              onClick={handleSubmit}
            >
              Save and Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BvnForm;
