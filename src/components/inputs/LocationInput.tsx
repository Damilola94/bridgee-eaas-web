import React from 'react';
import Autocomplete from "react-google-autocomplete";

type Props = {
  label?: string;
  value?: string;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

function LocationInput({ label = '', value = '', onChange = () => {} }: Props) {
  return (
    <div className="w-full">
      <label className="flex mb-1">{label}</label>
      <Autocomplete
        className='text-input'
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={(place) => onChange(place)}
      />
    </div>
  );
}

export default LocationInput;
