import React from 'react';
import Autocomplete from "react-google-autocomplete";

type Props = {
  label?: string;
  value?: string;
  className?: string;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

function LocationInput({
  label = '', value = '', onChange = () => {}, className = ''
}: Props) {
  return (
    <div className="w-full">
      <label className="flex mb-1">{label}</label>
      <Autocomplete
        className='text-input'
        defaultValue={value}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={(place) => onChange(place)}
      />
    </div>
  );
}

export default LocationInput;
