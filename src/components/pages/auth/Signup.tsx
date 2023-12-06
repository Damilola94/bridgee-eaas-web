import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';
import moment from 'moment-timezone';
import Link from 'next/link';

import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import RadioInput from '../../inputs/Radio';

import { SignupFormProps } from '../../../types/auth';
import SelectInput from '../../inputs/Select';

import { MIN_AGE } from '../../../data/constants';

import ClickableLogo from './ClickableLogo';

function Signup({ gotoNextForm }: any) {
  const [cookie, setCookie] = useCookies(['data', 'form']);
  const [form, setForm] = useState<SignupFormProps>({ isBusiness: 'false' });

  useEffect(() => {
    if (cookie?.form?.email) {
      setForm(cookie?.form);
    }
  }, [cookie]);

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [inputName]: val }));
    }
  };

  const signupMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        message: res?.message || 'Verify your email address',
        type: 'success'
      });
      setCookie('form', form);
      gotoNextForm();
    },
    onError: (err: any) => {
      notification({
        title: 'Error',
        message: err?.toString() || 'Something went wrong.',
        type: 'danger'
      });
    }
  });

  const validateForm = () => {
    const errors = [];
    if (form?.isBusiness === 'true') {
      if (!form?.businessName) errors.unshift('Business name is required');
      if (!form?.businessType?.value) errors.unshift('Business type is required');
    }
    if (!form?.firstName) errors.unshift('First name is required');
    if (!form?.lastName) errors.unshift('Last name is required');
    if (!form?.phoneNumber) errors.unshift('Phone number is required');
    if (form?.phoneNumber?.length !== 11) errors.unshift('Phone number is not valid');
    if (!form?.email) errors.unshift('Email address is required');
    if (!/^([a-zA-Z0-9_\-.&]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(form?.email || '')) {
      errors.unshift('Please enter a valid email');
    }
    if (!form?.dateOfBirth) errors.unshift('Date of birth is required');
    if (form?.dateOfBirth && moment().diff(moment(form?.dateOfBirth), 'years') < MIN_AGE) {
      errors.unshift('Date of birth must not be less than 18 years');
    }
    if (!form?.password) errors.unshift('Password is required');
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&~`'"])[A-Za-z\d@$#!%*?&~`'"]{8,}$/.test(form?.password || '')) {
      errors.unshift('Your password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one digit and one special character (@$#!%*?&~`\'")');
    }
    if (form?.termsAccepted !== 'true') errors.unshift('Please, accept terms and condition to proceed');
    return errors;
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      errors.forEach((item) => notification({ title: 'Form Error', message: item, type: 'danger' }));
      return;
    }

    const body = {
      ...form,
      isBusiness: form?.isBusiness === 'true',
      businessType: form?.businessType?.value,
      termsAccepted: form?.termsAccepted === 'true'
    };

    signupMutation.mutate({
      endpoint: 'auth', extra: 'register', method: 'POST', body
    });
  };

  const { isLoading } = signupMutation;

  return (
    <div className="flex w-full min-h-screen items-center">
      <form className="w-[35rem] px-8 my-20 mx-auto" onSubmit={handleSignup}>
        {isLoading && <Loading />}

        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor ff-bold text-xl mb-5">
          Create an account
        </h1>

        <div className="mb-5">
          <p className="flex items-start">
            Account type
          </p>

          <div className="flex space-x-6">
            <RadioInput
              name="isBusiness"
              label="Business"
              value="true"
              onChange={handleChange}
              checked={form?.isBusiness === 'true'}
            />
            <RadioInput
              name="isBusiness"
              label="Personal"
              value="false"
              onChange={handleChange}
              checked={form?.isBusiness === 'false'}
            />
          </div>
        </div>

        {form?.isBusiness === 'true' && (
          <>
            <TextInput
              className="w-full mb-7"
              onChange={handleChange}
              value={form?.businessName || ''}
              label="Business Name"
              name="businessName"
              placeholder="Business Name"
            />
            <SelectInput
              className="w-full mb-7"
              onChange={(val) => handleChange(val, 'select', 'businessType')}
              value={form?.businessType}
              label="Business Type"
              options={[
                { label: 'Registered Business', value: 'Registered' },
                { label: 'Unregistered Business', value: 'UnRegistered' }
              ]}
              placeholder="Business Type"
            />
          </>
        )}

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

          <TextInput
            className="w-full mb-7"
            onChange={handleChange}
            value={form?.dateOfBirth || ''}
            type="date"
            label="Date of birth"
            name="dateOfBirth"
          />

          <TextInput
            className="w-full mb-3"
            onChange={handleChange}
            value={form?.password || ''}
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
          />

          <label className="my-5 inline-flex items-center space-x-3">
            <input
              type="checkbox"
              value={form?.termsAccepted}
              checked={form?.termsAccepted === 'true'}
              onChange={() => handleChange(form?.termsAccepted === 'true' ? 'false' : 'true', 'check', 'termsAccepted')}
              style={{ accentColor: '#683AB7' }}
              className="w-5 h-5"
            />
            <span>I accept the Terms and Conditions</span>
          </label>

          <Button
            className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Create Account
          </Button>
        </div>

        <p className="mt-5 text-center">
          Already have an account?&nbsp;
          <Link href="/login"><span className="text-success cursor-pointer">Login here</span></Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
