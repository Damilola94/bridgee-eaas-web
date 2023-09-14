export type PersonalInfoProps = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  bvn?: string;
  gender?: { label: string, value: string };
};

export type ResidentialInfoProps = {
  fullAddress?: string;
  buildingNo?: string;
  street?: string;
  landmark?: string;
  town?: string;
  city?: string;
  country?: { label: string, value: string };
  state?: { label: string, value: string };
  lga?: { label: string, value: string };
};

export type IdFormProps = {
  idNumber?: string;
  idType?: { label: string, value: string };
};
