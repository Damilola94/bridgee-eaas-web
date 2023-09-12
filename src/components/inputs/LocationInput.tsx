import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { MultiValue, SingleValue, ActionMeta } from 'react-select';

import { SelectOptionType } from './Select';

type Props = {
  label?: string;
  value?: SelectOptionType | undefined;
  placeholder?: string;
  height?: string,
  onChange?: (val: MultiValue<SelectOptionType> | SingleValue<SelectOptionType>,
    actionMeta: ActionMeta<SelectOptionType> | null) => void;
};

function LocationInput({
  label, value, onChange, height = 'h-[43.2px]', placeholder = 'Enter address'
}: Props) {
  return (
    <div className="w-full select">
      <label className="flex mb-1">{label}</label>
      <GooglePlacesAutocomplete
        debounce={1000}
        selectProps={{
          value,
          onChange,
          placeholder,
          isClearable: true,
          classNamePrefix: "react-select",
          components: { DropdownIndicator: null },
          noOptionsMessage: () => 'Enter a valid address',
          classNames: {
            control: () => `${height} !bg-inputBg !text-textColor px-2 !outline-none w-full !rounded-[10px] border !border-borderColor disabled:!bg-gray-200`
          }
        }}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      />
    </div>
  );
}

export default LocationInput;
