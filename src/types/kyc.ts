import { SelectOptionType } from "../components/inputs/Select";

export type PersonalInfoProps = {
  firstName?: string;
  lastName?: string;
  otherName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  bvn?: string;
  selfiePict?: string,
  gender?: SelectOptionType;
  id?: string;
};

export type ResidentialInfoProps = {
  fullAddress?: string;
  apartmentNo?: string;
  street?: string;
  landMark?: string;
  town?: string;
  city?: string;
  country?: SelectOptionType;
  state?: SelectOptionType;
  otherCountry?: string;
  lga?: SelectOptionType;
};

export type IdFormProps = {
  personalAccountDocumentType?: SelectOptionType;
  identificationNumber?: string;
  front?: File;
  back?: File;
  frontPath?: string;
  backPath?: string;
};
