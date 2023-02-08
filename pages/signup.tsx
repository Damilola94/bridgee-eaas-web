import React, { useState } from 'react';
import type { NextPage } from 'next';

import AuthWrapper from '../components/wrappers/Auth';
import SignupForm from '../components/layouts/authForms/Signup';
import ValidateOTP from '../components/layouts/authForms/ValidateOTP';

const Signup: NextPage = () => {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <AuthWrapper title='Personal Finance Management - Signup'>
      {formIndex === 0 && <SignupForm gotoNextForm={() => setFormIndex(1)} />}
      {formIndex === 1 && <ValidateOTP gotoPrevForm={() => setFormIndex(0)} />}
    </AuthWrapper>
  );
};

export default Signup;
