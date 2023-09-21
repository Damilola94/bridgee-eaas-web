import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import { IdFormProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import TextInput from '../../../inputs/Text';
import SelectInput from '../../../inputs/Select';
import { idTypes } from '../../../../data/kyc';
import { useKycContext } from '../../../../context/Kyc';
import handleFetch from '../../../../services/api/handleFetch';
import notification from '../../../../utilities/notification';
import Loading from '../../../common/Loading';
import FileInput from '../../../inputs/File';
import { formatFileUrl, formatIDTypeLabel } from '../../../../utilities/general';
import SuccessMessage from './SuccessMessage';

function IdInfoForm() {
  const router = useRouter();
  const { kycData } = useKycContext();
  const [form, setForm] = useState<IdFormProps>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { idCardInformation } = kycData || {};

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...idCardInformation,
      personalAccountDocumentType: idCardInformation?.personalAccountDocumentType
        ? {
          label: formatIDTypeLabel(idCardInformation?.personalAccountDocumentType),
          value: idCardInformation?.personalAccountDocumentType
        } : undefined
    }));
  }, [idCardInformation]);

  const queryClient = useQueryClient();
  const idMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setShowSuccessMessage(true);
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

  const handleChange = (val: any, inputType = 'input', inputName = '') => {
    if (inputType === 'input') {
      const {
        value, name, type, files
      } = val.target;
      if (type === 'file') {
        setForm((state) => ({ ...state, [name]: files?.[0] }));
      } else {
        setForm((state) => ({ ...state, [name]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.personalAccountDocumentType?.value) return 'Please, select your identification type';
    if (!form?.identificationNumber) return 'Please, enter your identification number.';
    if (!form?.front) return 'Please, upload the front of your identification document';
    if (!form?.back) return 'Please, upload the back of your identification document';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const body = new FormData();
    body.append('personalAccountDocumentType', String(form?.personalAccountDocumentType?.value));
    body.append('identificationNumber', form.identificationNumber!);
    body.append('front', form.front!);
    body.append('back', form.back!);

    idMutation.mutate({
      endpoint: 'user', extra: 'add-user-identification-card', method: 'POST', body, auth: true, multipart: true
    });
  };

  const handleCloseSuccessMsg = () => {
    setShowSuccessMessage(false);
    queryClient.invalidateQueries(['user-information']);
    router.push('/get-started/kyc?step=kyc-completed');
  };

  const { isLoading } = idMutation;

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="mb-5">
            <h2 className="font-bold text-xl mb-2">ID Card Details</h2>
            <p className="text-lightText text-sm">
              Please upload any of the following means of identification:
              National Identification, international passport, Voter’s card, Driver’s License.
            </p>
          </div>

          <div className="w-full">
            <SelectInput
              label="Identification Type"
              className="mb-4"
              value={form?.personalAccountDocumentType || undefined}
              onChange={(val) => handleChange(val, 'select', 'personalAccountDocumentType')}
              options={idTypes || []}
            />
            <TextInput
              name="identificationNumber"
              onChange={handleChange}
              value={form?.identificationNumber || ''}
              className="w-full mb-4"
              label="Identification number"
            />
            <FileInput
              preview
              name="front"
              value={form?.front}
              onChange={handleChange}
              label="Upload ID document (Front)"
              className="file-input w-full mb-4"
            />
            {!form?.front && form?.frontPath && (
              <div className="mb-4 px-10">
                <picture>
                  <img src={formatFileUrl(form.frontPath)} alt="" className="w-full h-auto" />
                </picture>
              </div>
            )}
            <FileInput
              preview
              name="back"
              value={form?.back}
              onChange={handleChange}
              label="Upload ID document (Back)"
              className="file-input w-full mb-4"
            />
            {!form?.back && form?.backPath && (
              <div className="mb-4 px-10">
                <picture>
                  <img src={formatFileUrl(form.backPath)} alt="" className="w-full h-auto" />
                </picture>
              </div>
            )}
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
            onClick={() => router.push('/get-started/kyc?step=residential-info')}
          >
            Back
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <Button
            border
            borderColor="border-gray-300"
            bgColor="bg-white"
            textColor="text-black"
            className="w-full"
            paddingY="py-3"
            onClick={() => router.push('/get-started/kyc?step=kyc-completed')}
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

      {showSuccessMessage && <SuccessMessage onClose={handleCloseSuccessMsg} />}
    </div>
  );
}

export default IdInfoForm;
