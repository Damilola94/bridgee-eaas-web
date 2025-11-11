
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

// import AuthWrapper from "../components/wrappers/Auth";
import AuthWrapper from "../components/wrappers/AuthWrapper";
import SignupForm from "../components/pages/auth/signup/index";
import ValidateOTP from "../components/pages/auth/ValidateOTP";
import SuccessMessage from "../components/pages/auth/SuccessMessage";

const Signup: NextPage = () => {
  const router = useRouter();
  const [formIndex, setFormIndex] = useState(0);

  useEffect(() => {
    if (router?.query?.stage === "validateOtp") {
      setFormIndex(1);
    }
  }, [router]);

  return (
    <AuthWrapper title="UseBridgee Inc. - Signup">
      {/* {formIndex === 0 && <SignupForm gotoNextForm={() => setFormIndex(1)} />} */}
      {formIndex === 0 && <SignupForm />}
      {formIndex === 1 && (
        <ValidateOTP
          endpointExtra="validate-otp"
          gotoPrevForm={() => setFormIndex(0)}
          gotoNextForm={() => setFormIndex(2)}
        />
      )}
      {formIndex === 2 && (
        <SuccessMessage gotoNextForm={() => {}} message="Account Verified" />
      )}
    </AuthWrapper>
  );
};

export default Signup;
