import React, { useEffect, useState } from 'react';

import TextInput from './Text';

type Props = {
  className?: string;
  name?: string;
  label?: string;
  readOnly?: boolean;
  disabled?: boolean;
  preview?: boolean;
  value?: File;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({
  value, onChange, name, disabled, readOnly, label, className = '', preview
}: Props) {
  const [filePreview, setFilePreview] = useState('');

  useEffect(() => {
    if (preview && value) {
      setFilePreview(URL.createObjectURL(value));
    }
  }, [preview, value]);

  const onClick = () => {
    document.getElementById(name || '')?.click();
  };

  return (
    <div className={`${className}`}>
      <div className="w-full relative">
        <TextInput
          type="file"
          accept="image/png, image/jpeg"
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
            className="absolute bottom-1 w-[calc(100%-110px)] left-[105px] py-2.5 bg-inputBg h-10 line-clamp-1 whitespace-nowrap cursor-default"
          >
            {value?.name}
          </p>
        )}
      </div>
      {preview && value && (
        <div className="mt-2 px-10">
          <picture>
            <img src={filePreview} alt="" className="w-full h-auto" />
          </picture>
        </div>
      )}
    </div>
  );
}

export default FileInput;
