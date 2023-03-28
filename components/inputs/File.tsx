import React from 'react';

import TextInput from './Text';

type Props = {
  className?: string;
  name?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  value?: File;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({
  value, onChange, name, disabled, readOnly, label
}: Props) {
  const onClick = () => {
    document.getElementById(name || '')?.click();
  };
  return (
    <div className="relative">
      <TextInput
        type="file"
        name={name}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        label={label}
        className="file-input"
      />
      {value?.name && (
        <p
          onClick={onClick}
          className="absolute bottom-1 w-[calc(100%-110px)] left-[105px] py-2.5 bg-inputBg h-10 cursor-default"
        >
          {value?.name}
        </p>
      )}
    </div>
  );
}

export default FileInput;
