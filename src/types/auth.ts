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

export type UserType = 'Buyer' | 'Seller';

export interface OnboardingStepData {
  bvnValidationTicketId?: string;
  bvn: string;
  livenessSelfie?: File | null;
  personalInfo: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    businessName: string;
    password: string;
    partnerCode?: string;
  };
  bankAccount?: {
    bank: string;
    accountNumber: string;
    bankCode?: string;
    accountName?: string;
  };
  otpValidationTicket?: string;
  userType?: UserType;
}

export interface RegisterRequest {
  bvnValidationTicketId?: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  businessName?: string;
  password: string;
  otpValidationTicket?: string;
  partnerCode?: string;
  userType: UserType; 
  accountDetail?: {
    bankCode: string;
    accountNumber: string;
    accountName: string;
  };
}


