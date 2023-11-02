import React, { useState } from 'react';

import ClickableLogo from '../auth/ClickableLogo';
import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';

import { WaitlistProps } from '../../../types/auth';

function Register({ gotoNextForm }: any) {
  const [form, setForm] = useState<WaitlistProps>();
  const [loading, setLoading] = useState(false);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!form?.firstName) errors.unshift('First name is required');
    if (!form?.lastName) errors.unshift('Last name is required');
    if (form?.phoneNumber?.length !== 11) errors.unshift('Phone number is not valid');
    if (!form?.email) errors.unshift('Email address is required');
    if (!/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(form?.email || '')) {
      errors.unshift('Please enter a valid email');
    }
    if (form?.termsAccepted !== 'true') errors.unshift('Please, accept terms and condition to proceed');
    return errors;
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      errors.forEach((item) => notification({ title: 'Form Error', message: item, type: 'danger' }));
      return;
    }

    setLoading(true);

    const body = new FormData();

    body.append('First Name', form?.firstName || '');
    body.append('Last Name', form?.lastName || '');
    body.append('Email Address', form?.email || '');
    body.append('Phone Number', form?.phoneNumber || '');

    await fetch('https://script.google.com/macros/s/AKfycbx2m1HJpH2uQ_vtKUSgtwQ3sfHao1hb5l5pOI48kOz4GJC2vbR1nU2H4j608lk_1Z3ZXQ/exec', {
      method: 'POST', body
    })
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        if (res?.error) {
          notification({
            title: 'Error',
            message: res?.error?.toString() || 'Sorry, something went wrong. Please, try again.',
            type: 'danger'
          });
        } else {
          gotoNextForm();
        }
      });
  };

  return (
    <div className="flex w-full min-h-screen items-center">
      <form className="w-[35rem] px-8 my-20 mx-auto" onSubmit={handleSignup}>
        {loading && <Loading />}

        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor ff-bold text-xl mb-5">
          Join the waiting list
        </h1>

        <div className="w-full">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                className="w-full mb-7"
                onChange={handleChange}
                value={form?.firstName || ''}
                label="First Name"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <TextInput
                className="w-full mb-7"
                onChange={handleChange}
                value={form?.lastName || ''}
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
              />
            </div>
          </div>

          <TextInput
            className="w-full mb-7"
            onChange={(e) => /^\d{0,12}$/g.test(e.target.value) && handleChange(e)}
            value={form?.phoneNumber || ''}
            type="tel"
            label="Phone Number"
            name="phoneNumber"
            placeholder="08010000000"
          />

          <TextInput
            className="w-full mb-7"
            onChange={handleChange}
            value={form?.email || ''}
            type="email"
            label="Email Address"
            name="email"
            placeholder="Email Address"
          />

          <label className="mb-10 inline-flex items-center space-x-3">
            <input
              type="checkbox"
              value={form?.termsAccepted}
              checked={form?.termsAccepted === 'true'}
              onChange={() => handleChange(form?.termsAccepted === 'true' ? 'false' : 'true', 'check', 'termsAccepted')}
              style={{ accentColor: '#683AB7' }}
              className="w-5 h-5"
            />
            <span>
              I certify that I am 18 years of age or older, and I agree to the User Agreement and Privacy Policy
            </span>
          </label>

          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Join the waiting list
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
