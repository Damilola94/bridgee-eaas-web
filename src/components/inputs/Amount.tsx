import React from 'react';

type Props = {
  className?: string,
  type?: string,
  value?: string | number,
  name?: string,
  label?: string,
  placeholder?: string,
  height?: string
  currency?: string
  readOnly?: boolean,
  disabled?: boolean,
  minValue?: number,
  maxValue?: number,
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
};

function AmountInput({
  className, value, name, readOnly, onBlur, disabled, onKeyPress, onKeyDown,
  minValue, maxValue, onChange, label, placeholder, error, height, currency = 'NGN'
}: Props) {
  return (
    <div className={`${className} relative`}>
      {label && <label htmlFor={name} className="flex mb-1">{label}</label>}

      <div className={`w-full ${height} flex items-center bg-inputBg rounded-lg border overflow-hidden`}>
        <div className="font-lg px-3 py-2 font-semibold border-r">{currency}</div>
        <div className="w-full">
          <input
            type="number"
            className="w-full block bg-transparent px-3 py-2.5 outline-none text-lg ff-heavy"
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
          />
        </div>
      </div>

      {error ? <p className="error-msg" data-testid="error-msg">{error}</p> : null}
    </div>
  );
}

AmountInput.defaultProps = {
  className: '',
  type: 'text',
  value: '',
  name: '',
  height: 'h-12',
  label: '',
  placeholder: ''
};

export default AmountInput;
