import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useCookies } from 'react-cookie';

import ClickableLogo from './ClickableLogo';
import TextInput from '../../inputs/Text';
import Button from '../../inputs/Button';
import Loading from '../../common/Loading';

import notification from '../../../utilities/notification';
import handleFetch from '../../../services/api/handleFetch';
import Link from 'next/link';
import RadioInput from '../../inputs/Radio';

import { SignupFormProps } from '../../../types/auth';

function Signup({ gotoNextForm }: any) {
  const [, setCookie] = useCookies(['data']);
  const [form, setForm] = useState<SignupFormProps>({ isBusiness: 'false' });

  const handleChange = (val: any, type = 'input', inputName = '') => {
    if (type === 'input') {
      const { value, name } = val.target;
      setForm((state) => ({ ...state, [name]: value }));
    } else {
      setForm((state) => ({ ...state, [inputName]: val }));
    }
  };

  const signupMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setCookie('data', res?.data);
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
    return null;
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    const error = validateForm();

    if (error) {
      notification({
        title: 'Form Error',
        message: error,
        type: 'danger'
      });
      return;
    }
    gotoNextForm();
    return;

    signupMutation.mutate({
      endpoint: 'auth', extra: 'signup', method: 'POST', body: form
    });
  };

  const { isLoading } = signupMutation;

  return (
    <div className="flex w-full min-h-screen items-center">
      <form className="w-[35rem] px-8 my-20 mx-auto" onSubmit={handleSignup}>
        {isLoading && <Loading />}

        <ClickableLogo className="mb-10" />

        <h1 className="w-full text-textColor font-bold text-xl mb-5">
          Create an account
        </h1>

        <div className="mb-5">
          <p className="flex items-start mb-2">
            Are you a business?
          </p>

          <div className="flex space-x-6">
            <RadioInput
              name="isBusiness"
              label="Yes"
              value="true"
              onChange={handleChange}
              checked={form?.isBusiness === 'true'}
            />
            <RadioInput
              name="isBusiness"
              label="No"
              value="false"
              onChange={handleChange}
              checked={form?.isBusiness === 'false'}
            />
          </div>
        </div>

        {form?.isBusiness === 'true' && (
          <TextInput
            className="w-full mb-7"
            onChange={handleChange}
            value={form?.businessName || ''}
            label="Business Name"
            name="businessName"
            placeholder="Business Name"
          />
        )}

        <div className="w-full">
          <div className="flex -mx-2">
            <div className="w-1/2 px-2">
              <TextInput
                className="w-full mb-7"
                onChange={handleChange}
                value={form?.firstName || ''}
                label="First Name"
                name="firstName"
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2 px-2">
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
            value={form?.phone || ''}
            type="tel"
            label="Phone Number"
            name="phone"
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
            className="w-full mb-3"
            onChange={handleChange}
            value={form?.password || ''}
            type="password"
            label="Password"
            name="password"
            placeholder="Password"
          />

          <label className="my-5 inline-block">
            <input type="checkbox" />
            &nbsp;I accept the Terms and Conditions
          </label>

          <Button
            className="w-full text-lg font-bold !rounded-md md-2:!rounded-xl"
            paddingY="p-3.5"
            type="submit"
          >
            Create Account
          </Button>
        </div>

        <p className="mt-5 text-center">
          Already have an account?&nbsp;
          <Link href="/login"><span className='text-success cursor-pointer'>Login here</span></Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
