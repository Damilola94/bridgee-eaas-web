export type SignupFormProps = {
  isBusiness?: string
  businessName?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  password?: string
  termsAccepted?: string
};

export type ResetPasswordProps = {
  gotoNextForm?: () => void
  gotoPrevForm?: () => void
  message?: string
};
