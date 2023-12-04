import React from 'react';

type Props = {
  className?: string,
  type?: string,
  value?: string | number,
  name?: string,
  label?: string,
  placeholder?: string,
  height?: string
  readOnly?: boolean,
  disabled?: boolean,
  rows?: number,
  maxValue?: number,
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
};

function TextareaInput({
  className, value, name, readOnly, onBlur, disabled,
  onChange, label, placeholder, rows = 5, error
}: Props) {
  return (
    <div className={`${className} relative`}>
      {label && <label htmlFor={name} className="flex mb-1">{label}</label>}

      <textarea
        className={`${error ? 'error-field' : ''
        } bg-inputBg px-5 py-2 outline-none w-full rounded-[10px] border border-borderColor disabled:bg-gray-200`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        onBlur={onBlur}
        disabled={disabled}
        rows={rows}
      />

      {error ? <p className="error-msg" data-testid="error-msg">{error}</p> : null}
    </div>
  );
}

TextareaInput.defaultProps = {
  className: '',
  value: '',
  name: '',
  label: '',
  placeholder: ''
};

export default TextareaInput;
