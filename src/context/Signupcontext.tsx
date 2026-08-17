// context/SignupContext.tsx
import React, { createContext, useContext, useState, useMemo } from "react";

export type SignupData = {
  isRegistered?: boolean;
  cacNumber?: string;
  companyName?: string;
  businessType?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  tin?: string;
  cacFile?: File | null;
  utilityBill?: File | null;
  bvn?: string;
  bvnVerifiedName?: string;
  selfie?: File | null;
  fullName?: string;
  contactPhoneNumber?: string;
  contactEmail?: string;
  designation?: string;
  password?: string;
};

type SignupContextValue = {
  data: SignupData;
  updateSignupData: (partial: Partial<SignupData>) => void;
  resetSignupData: () => void;
};

const SignupContext = createContext<SignupContextValue | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SignupData>({});

  const updateSignupData = (partial: Partial<SignupData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const resetSignupData = () => setData({});

  const value = useMemo(
    () => ({ data, updateSignupData, resetSignupData }),
    [data]
  );

  return (
    <SignupContext.Provider value={value}>{children}</SignupContext.Provider>
  );
}

export function useSignupContext() {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return ctx;
}