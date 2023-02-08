export type SignupFormProps = {
  isBusiness?: string
  businessName?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  password?: string
  confirmPassword?: string
};

export type ResetPasswordProps = {
  gotoNextForm?: () => void
  gotoPrevForm?: () => void
  message?: string
};
