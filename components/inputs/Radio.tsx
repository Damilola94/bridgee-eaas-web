import React from 'react';

type RadioInputProps = {
  className?: string,
  value?: string,
  name?: string,
  readOnly?: boolean,
  disabled?: boolean,
  label?: string,
  checked?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

function RadioInput({
  className, value, name, onBlur, disabled, onChange, label, checked
}: RadioInputProps) {
  return (
    <div className={`${className || ''} flex items-center space-x-2`}>
      <input
        style={{ accentColor: '#683AB7' }}
        className="w-5 h-5"
        type="radio"
        name={name}
        onBlur={onBlur}
        id={`${name}-${value}`}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`${name}-${value}`} className="cursor-pointer">
        {label || ''}
      </label>
    </div>
  );
}

export default RadioInput;
