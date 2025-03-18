import React, { useState } from 'react';
import type { NextPage } from 'next';

import AuthWrapper from '../components/wrappers/Auth';
import SuccessMessage from '../components/pages/waitlist/SuccessMessage';
import Register from '../components/pages/waitlist/Register';

const Signup: NextPage = () => {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <AuthWrapper title="UseBridge Escrow - Signup">
      {formIndex === 0 && <Register gotoNextForm={() => setFormIndex(1)} />}
      {formIndex === 1 && <SuccessMessage />}
    </AuthWrapper>
  );
};

export default Signup;
