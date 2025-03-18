import React, { useState } from 'react';
import type { NextPage } from 'next';

import AuthWrapper from '../components/wrappers/Auth';
import ValidateOTP from '../components/pages/auth/ValidateOTP';
import ValidateEmail from '../components/pages/auth/ValidateEmail';
import SetNewPassword from '../components/pages/auth/SetNewPassword';
import SuccessMessage from '../components/pages/auth/SuccessMessage';
import ValidatePIN from '../components/pages/auth/ValidatePIN';

const ResetPassword: NextPage = () => {
  const [formIndex, setFormIndex] = useState(0);

  return (
    <AuthWrapper title="UseBridge Escrow - Reset Password">
      {formIndex === 0 && <ValidateEmail gotoNextForm={() => setFormIndex(1)} />}
      {formIndex === 1 && (
        <ValidateOTP
          endpointExtra="validate-reset-password-otp"
          gotoPrevForm={() => setFormIndex(0)}
          gotoNextForm={() => setFormIndex(2)}
        />
      )}
      {formIndex === 2 && (
        <ValidatePIN
          gotoPrevForm={() => setFormIndex(1)}
          gotoNextForm={() => setFormIndex(3)}
        />
      )}
      {formIndex === 3 && (
        <SetNewPassword
          gotoPrevForm={() => setFormIndex(2)}
          gotoNextForm={() => setFormIndex(4)}
        />
      )}
      {formIndex === 4 && (
        <SuccessMessage
          message="Password reset successful"
        />
      )}
    </AuthWrapper>
  );
};

export default ResetPassword;
