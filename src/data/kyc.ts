export const steps = [
  { title: 'BVN Validation', step: 'bvn-validation', stage: 'BvnValidation' },
  { title: 'Take a Selfie  for BVN', step: 'take-a-selfie', stage: 'BvnValidation' },
  { title: 'Personal Information', step: 'personal-info', stage: 'PersonalInformation' },
  { title: 'NIN Details', step: 'nin-details', stage: 'NinValidation' },
  { title: 'Take a Selfie for NIN', step: 'take-a-selfie-nin', stage: 'NinValidation' },
  { title: 'Residential Information', step: 'residential-info', stage: 'ResidentialInformation' }
];

export const stepsByStep = {
  'bvn-validation': 'BvnValidation',
  'take-a-selfie': 'BvnValidation',
  'personal-info': 'PersonalInformation',
  'residential-info': 'ResidentialInformation',
  'nin-details': 'NinValidation',
  'take-a-selfie-nin': 'NinValidation'
};

export const idTypes = [
  { label: 'National Identity Card', value: 'NationalIdentityCard' },
  { label: 'International Passport', value: 'InternationalPassPort' },
  { label: 'Driver License', value: 'DriverLicense' },
  { label: 'Permanent Voters Card', value: 'PermanentVotersCard' }
];
