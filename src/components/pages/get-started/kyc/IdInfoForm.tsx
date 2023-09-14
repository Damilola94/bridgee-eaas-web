import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { IdFormProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import TextInput from '../../../inputs/Text';
import SelectInput from '../../../inputs/Select';

function IdInfoForm() {
  const router = useRouter();
  const [form, setForm] = useState<IdFormProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const handleSubmit = () => {
    router.push('/get-started/kyc?tab=id-details');
  };

  return (
    <div className="w-full max-w-md mx-auto">
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
              value={form?.idType || undefined}
              onChange={(val) => handleChange(val, 'idType')}
              options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
            />
            <TextInput
              name="idNumber"
              onChange={handleChange}
              value={form?.idNumber || ''}
              className="w-full mb-4"
              label="Identification number"
            />
          </div>
        </div>
      </div>

      <div className="flex mt-5 -mx-2">
        <div className="w-1/2 p-2">
          <Button
            border
            borderColor="border-gray-300"
            bgColor="bg-white"
            textColor="text-black"
            className="w-full"
            paddingY="py-3"
            onClick={() => router.push('/get-started/kyc?tab=residential-info')}
          >
            Back
          </Button>
        </div>
        <div className="w-1/2 p-2">
          <Button
            className="w-full"
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

export default IdInfoForm;
