import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';

import statesJson from '../../../../data/states.json';

import { ResidentialInfoProps } from '../../../../types/kyc';
import Button from '../../../inputs/Button';

import SelectInput, { SelectOptionType } from '../../../inputs/Select';
import TextInput from '../../../inputs/Text';
import { useKycContext } from '../../../../context/Kyc';
import notification from '../../../../utilities/notification';
import handleFetch from '../../../../services/api/handleFetch';
import Loading from '../../../common/Loading';
import useFormStage from '../../../../hooks/useFormStage';

function ResidentialInfoForm() {
  const router = useRouter();
  const { kycData } = useKycContext();
  const formStage = useFormStage();
  const [form, setForm] = useState<ResidentialInfoProps>();
  const [states, setStates] = useState<SelectOptionType[]>();
  const [lgas, setLgas] = useState<SelectOptionType[]>();

  const initialLoad = useRef(false);

  const { residentialAddress } = kycData || {};

  useEffect(() => {
    const list = statesJson?.map((item) => ({ label: item?.name, value: item?.name }));
    setStates(list);
  }, []);

  useEffect(() => {
    const getLgas = statesJson.filter((item) => item?.name === form?.state?.value)?.[0]?.lgas;
    const list = getLgas?.map((item) => ({ label: item, value: item }));
    if (initialLoad.current) {
      setForm((prev) => ({ ...prev, lga: { label: residentialAddress?.lga, value: residentialAddress?.lga } }));
      initialLoad.current = false;
    } else {
      setForm((prev) => ({ ...prev, lga: { label: '', value: '' } }));
    }
    setLgas(list);
  }, [form?.state, residentialAddress?.lga]);

  useEffect(() => {
    initialLoad.current = true;
    setForm((prev) => ({
      ...prev,
      ...residentialAddress,
      country: residentialAddress?.country
        ? { label: residentialAddress?.country, value: residentialAddress?.country }
        : { label: 'Nigeria', value: 'Nigeria' },
      state: residentialAddress?.state
        ? { label: residentialAddress?.state, value: residentialAddress?.state } : undefined,
      lga: residentialAddress?.lga
        ? { label: residentialAddress?.lga, value: residentialAddress?.lga } : undefined
    }));
  }, [residentialAddress]);

  const queryClient = useQueryClient();
  const residentialMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries(['user-information']);
      router.push('/get-started/kyc?step=nin-details');
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
    if (!form?.fullAddress) return 'Please, enter your full address.';
    if (!form?.apartmentNo) return 'Please, enter your apartment number.';
    if (!form?.street) return 'Please, enter your street name.';
    if (!form?.town) return 'Please, enter your town.';
    if (!form?.country) return 'Please, enter your country.';
    if (!form?.state) return 'Please, enter your state.';
    if (!form?.lga) return 'Please, enter your LGA.';
    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }

    const body = {
      ...form,
      country: form?.country?.value,
      state: form?.state?.value,
      lga: form?.lga?.value
    };

    residentialMutation.mutate({
      endpoint: 'user', extra: 'add-user-residential-address', method: 'POST', body, auth: true
    });
  };

  const isCompleted = formStage?.kycStatus === 'Completed';
  const { isLoading } = residentialMutation;

  return (
    <div className="w-full max-w-md mx-auto">
      {isLoading && <Loading />}
      <div className="w-full bg-white rounded-xl px-8 py-7 shadow">
        <div className="w-full">
          <div className="flex justify-between items-start">
            <h2 className="font-bold text-xl mb-5">Residential Information</h2>
          </div>

          <div className="w-full">
            <TextInput
              name="fullAddress"
              disabled={isCompleted}
              onChange={handleChange}
              value={form?.fullAddress || ''}
              className="w-full mb-4"
              label="Full Address"
            />
            <div className="flex -mx-2">
              <div className="w-1/2 px-2">
                <TextInput
                  name="apartmentNo"
                  disabled={isCompleted}
                  onChange={handleChange}
                  value={form?.apartmentNo || ''}
                  className="w-full mb-4"
                  label="Building/Apartment No."
                />
              </div>
              <div className="w-1/2 px-2">
                <TextInput
                  name="street"
                  disabled={isCompleted}
                  onChange={handleChange}
                  value={form?.street || ''}
                  className="w-full mb-4"
                  label="Street Name"
                />
              </div>
            </div>
            <TextInput
              name="landMark"
              disabled={isCompleted}
              onChange={handleChange}
              value={form?.landMark || ''}
              className="w-full mb-4"
              label="Landmark (Optional)"
            />
            <TextInput
              name="town"
              disabled={isCompleted}
              onChange={handleChange}
              value={form?.town || ''}
              className="w-full mb-4"
              label="Town"
            />
            <SelectInput
              label="Country"
              disabled={isCompleted}
              value={form?.country || undefined}
              onChange={(val) => handleChange(val, 'select', 'country')}
              options={[{ label: 'Nigeria', value: 'Nigeria' }, { label: 'Others', value: 'Others' }]}
              className="mb-4"
            />
            {form?.country?.value === 'Nigeria' ? (
              <div className="flex -mx-2">
                <div className="w-1/2 px-2">
                  <SelectInput
                    label="State"
                    value={form?.state || undefined}
                    disabled={isCompleted}
                    onChange={(val) => handleChange(val, 'select', 'state')}
                    options={states || []}
                    className="mb-4"
                  />
                </div>
                <div className="w-1/2 px-2">
                  <SelectInput
                    label="LGA"
                    value={form?.lga || undefined}
                    disabled={isCompleted}
                    onChange={(val) => handleChange(val, 'select', 'lga')}
                    options={lgas || []}
                    className="mb-4"
                  />
                </div>
              </div>
            ) : (
              <TextInput
                name="otherCountry"
                disabled={isCompleted}
                onChange={handleChange}
                value={form?.otherCountry || ''}
                className="w-full mb-4"
                label="Specify Country"
              />
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
            onClick={() => router.push('/get-started/kyc?step=personal-info')}
          >
            Back
          </Button>
        </div>
        {(isCompleted || formStage?.kycStatus === 'Pending') && (
          <div className="w-1/2 px-2">
            <Button
              border
              borderColor="border-gray-300"
              bgColor="bg-white"
              textColor="text-black"
              className="w-full"
              paddingY="py-3"
              onClick={() => router.push('/get-started/kyc?step=nin-details')}
            >
              Next
            </Button>
          </div>
        )}
        {!isCompleted && (
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

export default ResidentialInfoForm;
