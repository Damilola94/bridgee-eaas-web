export const steps = [
  { title: 'Personal Information', step: 'personal-info', stage: 'PersonalInformation' },
  { title: 'BVN Validation', step: 'bvn-validation', stage: 'BvnValidation' },
  { title: 'Residential Information', step: 'residential-info', stage: 'ResidentialInformation' },
  { title: 'ID Card Details', step: 'id-details', stage: 'IdCardDetails' }
];

export const stepsByStep = {
  'personal-info': 'PersonalInformation',
  'bvn-validation': 'BvnValidation',
  'residential-info': 'ResidentialInformation',
  'id-details': 'IdCardDetails'
};

export const idTypes = [
  { label: 'National Identity Card', value: 'NationalIdentityCard' },
  { label: 'International Passport', value: 'InternationalPassPort' },
  { label: 'Driver License', value: 'DriverLicense' },
  { label: 'Permanent Voters Card', value: 'PermanentVotersCard' }
];
