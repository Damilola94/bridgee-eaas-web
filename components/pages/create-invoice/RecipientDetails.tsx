import React, { useState } from 'react';

import TextInput from '../../inputs/Text';
import ToggleInput from '../../inputs/Toggle';
// import LocationInput from '../../inputs/LocationInput';
import Button from '../../inputs/Button';
import { useCreateInvoiceContext } from '../../../context/CreateInvoice';

function RecipientDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useCreateInvoiceContext();
  const [useDelivery, setUsepDelivery] = useState(false);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  return (
    <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
      <div className="w-full mb-10">
        <h3 className="font-bold text-xl ff-bold mb-2">Recipient&apos;s Details</h3>
        <p className="text-lightText">
          Fill the form below to create an invoice for the product/service you are willing to sell
        </p>
      </div>

      <div className="w-full mb-5">
        <div className="w-full">
          <TextInput
            name="recipientName"
            value={form?.recipientName || ''}
            onChange={handleChange}
            label="Recipient’s Full Name"
            className="w-full mb-4"
            placeholder="Recipient’s Name"
          />
        </div>
        <div className="w-full">
          <div className="flex -mx-2">
            <div className="w-1/2 px-2">
              <TextInput
                name="recipientPhone"
                value={form?.recipientPhone || ''}
                onChange={handleChange}
                type="tel"
                label="Recipient's Phone Number *"
                className="w-full mb-4"
                placeholder="Recipient's Phone Number"
              />
            </div>
            <div className="w-1/2 px-2">
              <TextInput
                name="recipientEmail"
                value={form?.recipientEmail || ''}
                onChange={handleChange}
                className="w-full mb-4"
                label="Recipient’s Email"
                type="email"
                placeholder="Recipient’s Email"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <TextInput
            name="recipientAddress"
            value={form?.recipientAddress || ''}
            onChange={handleChange}
            type="tel"
            label="Recipient's Address *"
            className="w-full mb-4"
            placeholder="Recipient's Address"
          />
        </div>
      </div>

      <div className="w-full mb-5">
        <div className="flex items-center space-x-2 pb-5">
          <ToggleInput label='Delivery' value={useDelivery} onChange={setUsepDelivery} />
          <span className="text-[#E08700] font-bold">Powered by Terminal</span>
        </div>

        {useDelivery && (
          <div className="w-full">
            <div className="w-full">
              <div className="mb-5">
                {/* <LocationInput
                  label="Pickup Address".
                  value={form?.pickupAddress || "}
                  onChange={(val) => handleChange(val, "location", "pickupAddress")}
                /> */}
                <TextInput
                  name="pickupAddress"
                  value={form?.pickupAddress || ''}
                  onChange={handleChange}
                  label="Pickup Address"
                  className="w-full"
                  placeholder="Enter location"
                />
              </div>
              <div className="flex flex-wrap -mx-2">
                <div className="w-full sm:w-1/2 px-2 mb-5">
                  <TextInput
                    name="weight"
                    value={form?.weight || ''}
                    onChange={handleChange}
                    type="number"
                    label="Weight of goods (KG)"
                    className="w-full"
                    placeholder="Weight of goods"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}

export default RecipientDetails;
