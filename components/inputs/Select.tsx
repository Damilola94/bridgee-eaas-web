import React from 'react';
import Select, { MultiValue, SingleValue, ActionMeta } from 'react-select';

type SelectOptionType = { label: string, value: string | number }

type SelectProps = {
  className: string,
  name: string,
  label?: string,
  value?: SelectOptionType,
  options?: SelectOptionType[],
  placeholder?: string,
  multiple?: boolean,
  disabled?: boolean,
  isClearable?: boolean,
  onChange?: (val: MultiValue<SelectOptionType> | SingleValue<SelectOptionType>, actionMeta: ActionMeta<SelectOptionType> | null) => void,
};

function SelectInput({
  className, name, label, value, onChange, disabled, options,
  multiple, placeholder, isClearable
}: SelectProps) {
  return (
    <div className={`${className || ''}`}>
      {label && <label htmlFor={name} className="flex mb-1">{label}</label>}

      <Select
        className="select"
        classNamePrefix="react-select"
        name={name}
        id={name}
        instanceId={name}
        value={value}
        isMulti={multiple}
        isClearable={isClearable}
        isSearchable
        onChange={onChange}
        menuPlacement="auto"
        isDisabled={disabled}
        options={options || []}
        placeholder={placeholder}
      />
    </div>
  );
}

SelectInput.defaultProps = {
  className: '',
  name: ''
};

export default SelectInput;
