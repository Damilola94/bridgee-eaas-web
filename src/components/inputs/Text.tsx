import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

type Props = {
  className?: string,
  type?: string,
  value?: string | number,
  name?: string,
  label?: string,
  placeholder?: string,
  height?: string,
  accept?: string,
  readOnly?: boolean,
  disabled?: boolean,
  minValue?: number,
  maxValue?: number,
  error?: string,
  ref?: React.Ref<HTMLInputElement>,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
};

function TextInput({
  className, value, name, readOnly, onBlur, disabled, onKeyPress, onKeyDown,
  minValue, maxValue, ref, type, onChange, label, placeholder, error, height, accept
}: Props) {
  const [inputType, setInputType] = useState(type);

  return (
    <div className={`${className} relative`}>
      {label && <label htmlFor={name} className="flex mb-1">{label}</label>}

      <input
        ref={ref}
        className={`${error ? 'error-field' : ''} ${height
        } ${disabled && 'cursor-not-allowed'} bg-inputBg px-5 outline-none w-full rounded-[10px] border border-borderColor disabled:bg-gray-200`}
        type={inputType}
        accept={accept}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        min={minValue}
        max={maxValue}
        maxLength={maxValue}
      />

      {error ? <p className="error-msg" data-testid="error-msg">{error}</p> : null}

      {type === 'password' && (
        <span data-testid="toggle-password" className="absolute right-4 bottom-3 items-center text-gray-700">
          {inputType === 'password' ? (
            <BsEyeSlash
              data-testid="eye-closed"
              className="w-5 h-auto cursor-pointer items-center text-[#B5B6B6]"
              onClick={() => setInputType('text')}
            />
          ) : (
            <BsEye
              data-testid="eye-open"
              className="w-5 h-auto cursor-pointer"
              onClick={() => setInputType('password')}
            />
          )}
        </span>
      )}
    </div>
  );
}

TextInput.defaultProps = {
  className: '',
  type: 'text',
  value: '',
  name: '',
  height: 'h-12',
  label: '',
  placeholder: ''
};

export default TextInput;
