import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { PersonalInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import TextInput from '../../../inputs/Text';

function BvnForm() {
  const router = useRouter();
  const [form, setForm] = useState<PersonalInfoProps>({});

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const handleSubmit = () => {
    router.push('/get-started/kyc?step=residential-info');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">BVN Validation</h2>
          </div>

          <div className="w-full">
            <TextInput
              name="bvn"
              onChange={handleChange}
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
        <div className="w-1/2 p-2">
          <Button
            border
            borderColor="border-gray-300"
            bgColor="bg-white"
            textColor="text-black"
            className="w-full"
            paddingY="py-3"
            onClick={() => router.push('/get-started/kyc?step=personal-info')}
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

export default BvnForm;
