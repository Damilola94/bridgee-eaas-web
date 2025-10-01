import React from 'react';
import TextInput, { Props as TextInputProps } from "./Text";
import { CountryFlagSelector } from './CountryFlagSelector';
import { countriesWithFlags } from '../../data/countries';

type BaseTextInputProps = Omit<TextInputProps, 'value' | 'onChange' | 'name' | 'type' | 'leftAddon'>;

type PhoneNumberInputProps = BaseTextInputProps & {
  countryCode: string;
  onCountryCodeChange?: (value: string) => void;
  phoneNumber: string | number;
  onPhoneNumberChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryCode,
  onCountryCodeChange = () => {},
  phoneNumber,
  onPhoneNumberChange,
  disabled,
  ...rest
}) => {
  const CountrySelectorComponent = (
    <div className="flex items-center">
      <CountryFlagSelector
        countries={countriesWithFlags}
        value={countryCode}
        onChange={onCountryCodeChange}
        disabled={disabled}
      />
      <div className="h-6 bg-borderColor"></div>
    </div>
  );

  return (
    <TextInput
      type="tel"
      name="phoneNumber"
      value={phoneNumber}
      onChange={onPhoneNumberChange}
      leftAddon={CountrySelectorComponent}
      disabled={disabled}
      {...rest}
    />
  );
};

export default PhoneNumberInput;
