import React from 'react';

import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import { useCreateInvoiceContext } from '../../../context/CreateInvoice';

function RecipientDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useCreateInvoiceContext();

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
          <div className="flex -mx-2">
            <div className="w-1/2 px-2">
              <TextInput
                name="recipientName"
                value={form?.recipientName || ''}
                onChange={handleChange}
                label="Recipient’s Name"
                className="w-full mb-4"
                placeholder="Recipient’s Name"
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
        </div>
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}

export default RecipientDetails;
