import { SelectOptionType } from "../components/inputs/Select";

export type PersonalInfoProps = {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phoneNumber?: string;
  dob?: string;
  bvn?: string;
  gender?: SelectOptionType;
};

export type ResidentialInfoProps = {
  fullAddress?: string;
  buildingNo?: string;
  street?: string;
  landmark?: string;
  town?: string;
  city?: string;
  country?: SelectOptionType;
  state?: SelectOptionType;
  nonNigeriaState?: string;
  lga?: SelectOptionType;
};

export type IdFormProps = {
  idNumber?: string;
  idType?: SelectOptionType;
};
