export type SignupFormProps = {
  isBusiness?: string
  businessName?: string
  businessType?: { label: string, value: string }
  firstName?: string
  lastName?: string
  phoneNumber?: string
  dateOfBirth?: string
  email?: string
  referralCode?: string
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

export type WaitlistProps = {
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  termsAccepted?: string
};

export interface OtpVerifyResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: string;
  metaData: null;
}

export interface OtpSendResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: boolean;
  metaData: null;
}
