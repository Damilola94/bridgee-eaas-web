import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { ResidentialInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import SelectInput from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';

function ResidentialInfoForm() {
  const router = useRouter();
  const [form, setForm] = useState<ResidentialInfoProps>({});

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
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">Residential Information</h2>
          </div>

          <div className="w-full">
            <TextInput
              name="fullAddress"
              onChange={handleChange}
              value={form?.fullAddress || ''}
              className="w-full mb-4"
              label="Full Address"
            />
            <div className="flex -mx-2">
              <div className="w-1/2 p-2">
                <TextInput
                  name="buildingNo"
                  onChange={handleChange}
                  value={form?.buildingNo || ''}
                  className="w-full mb-4"
                  label="Building/Apartment No."
                />
              </div>
              <div className="w-1/2 p-2">
                <TextInput
                  name="street"
                  onChange={handleChange}
                  value={form?.street || ''}
                  className="w-full mb-4"
                  label="Street Name"
                />
              </div>
            </div>
            <TextInput
              name="landmark"
              onChange={handleChange}
              value={form?.landmark || ''}
              className="w-full mb-4"
              label="Landmark (Optional)"
            />
            <TextInput
              name="town"
              onChange={handleChange}
              value={form?.town || ''}
              className="w-full mb-4"
              label="Town"
            />
            <TextInput
              name="town"
              onChange={handleChange}
              value={form?.city || ''}
              className="w-full mb-4"
              label="City"
            />
            <SelectInput
              label="Country"
              value={form?.country || undefined}
              onChange={(val) => handleChange(val, 'country')}
              options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
              className="mb-4"
            />
            <div className="flex -mx-2">
              <div className="w-1/2 p-2">
                <SelectInput
                  label="State"
                  value={form?.state || undefined}
                  onChange={(val) => handleChange(val, 'state')}
                  options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                  className="mb-4"
                />
              </div>
              <div className="w-1/2 p-2">
                <SelectInput
                  label="LGA"
                  value={form?.lga || undefined}
                  onChange={(val) => handleChange(val, 'lga')}
                  options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }]}
                  className="mb-4"
                />
              </div>
            </div>
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
            onClick={() => router.push('/get-started/kyc?tab=bvn-validation')}
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

export default ResidentialInfoForm;
