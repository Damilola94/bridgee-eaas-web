export type SignupFormProps = {
  isBusiness?: string
  businessName?: string
  businessType?: { label: string, value: string }
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  email?: string
  password?: string
  termsAccepted?: string
};

export type ResetPasswordProps = {
  gotoNextForm?: () => void
  gotoPrevForm?: () => void
  message?: string
};

export type BusinessFormProps = {
  name?: string
  email?: string
  businessType?: { label: string, value: string }
};
