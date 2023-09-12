import React, { useEffect } from 'react';

import TextInput from '../../inputs/Text';
import ToggleInput from '../../inputs/Toggle';
// import LocationInput from '../../inputs/LocationInput';
import Button from '../../inputs/Button';
import { useCreateInvoiceContext } from '../../../context/CreateInvoice';
import notification from '../../../utilities/notification';

function RecipientDetails({ onNext = () => {} }: { onNext?: () => void }) {
  const { form, setForm } = useCreateInvoiceContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else if (type === 'recipient') {
      if (inputName === 'address') {
        setForm((state) => ({
          ...state,
          recipientDetails: { ...state.recipientDetails, [inputName]: val }
        }));
      } else {
        const { value, name } = val.target;
        setForm((state) => ({
          ...state,
          recipientDetails: { ...state.recipientDetails, [name]: value }
        }));
      }
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const validateForm = () => {
    if (!form?.recipientDetails?.recipientName) return 'Recipient name is required';
    if (!form?.recipientDetails?.phoneNumber) return 'Recipient phone number is required';
    if (!form?.recipientDetails?.email) return 'Recipient email is required';
    if (!/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(form?.recipientDetails?.email || '')) {
      return 'Please enter a valid email for the recipient';
    }
    if (!form?.inspectionDuration) return 'Inspection duration is required';
    if (!form?.recipientDetails?.address) return 'Recipient address is required';

    if (form?.isDeliveryOnUs && !form?.pickUpAddress) {
      return 'Pickup address is required';
    }
    return null;
  };

  const handleNext = () => {
    const error = validateForm();
    if (error) {
      notification({ title: 'Form Error', message: error, type: 'danger' });
      return;
    }
    onNext();
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
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="recipientName"
                value={form?.recipientDetails?.recipientName || ''}
                onChange={(e) => handleChange(e, 'recipient')}
                label="Full Name"
                className="w-full mb-4"
                placeholder="Recipient’s Name"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="email"
                value={form?.recipientDetails?.email || ''}
                onChange={(e) => handleChange(e, 'recipient')}
                className="w-full mb-4"
                label="Email"
                type="email"
                placeholder="Recipient’s Email"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="phoneNumber"
                value={form?.recipientDetails?.phoneNumber || ''}
                onChange={(e) => /^\d{0,12}$/g.test(e.target.value) && handleChange(e, 'recipient')}
                type="tel"
                label="Phone Number"
                className="w-full mb-4"
                placeholder="Recipient's Phone Number"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                name="inspectionDuration"
                value={form?.inspectionDuration || ''}
                onChange={handleChange}
                className="w-full mb-4"
                label="Inspection Duration (Hours)"
                type="number"
                placeholder="Inspection Duration"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <TextInput
            name="address"
            value={form?.recipientDetails?.address || ''}
            onChange={(e) => handleChange(e, 'recipient')}
            label="Address"
            className="w-full mb-4"
            placeholder="Recipient's Address"
          />
          {/* <LocationInput
            value={form?.recipientDetails?.address || ''}
            onChange={(val) => handleChange(val, 'recipient', 'address')}
            label="Recipient Address"
          /> */}
        </div>
      </div>

      <div className="w-full mb-5">
        <div className="flex items-center space-x-2 pb-5">
          <ToggleInput
            label='Delivery'
            value={form?.isDeliveryOnUs}
            onChange={(val) => handleChange(val, 'toggle', 'isDeliveryOnUs')}
          />
          <span className="text-[#E08700] font-bold">Powered by Terminal</span>
        </div>

        {form?.isDeliveryOnUs && (
          <div className="w-full">
            <div className="w-full">
              <div className="mb-5">
                {/* <LocationInput
                  label="Pickup Address".
                  value={form?.pickUpAddress || "}
                  onChange={(val) => handleChange(val, "location", "pickUpAddress")}
                /> */}
                <TextInput
                  name="pickUpAddress"
                  value={form?.pickUpAddress || ''}
                  onChange={handleChange}
                  label="Pickup Address"
                  className="w-full"
                  placeholder="Enter location"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="w-full mb-3">
        <Button paddingY="py-3" className="w-full" onClick={handleNext}>Continue</Button>
      </div>
    </div>
  );
}

export default RecipientDetails;
