import React from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

type SelectOptionType = {
  readonly label: string;
  readonly value: string | number;
};

type SelectProps = {
  className: string,
  name: string,
  label?: string,
  value?: SelectOptionType | null | undefined,
  options?: SelectOptionType[],
  placeholder?: string,
  multiple?: boolean,
  isDisabled?: boolean,
  isClearable?: boolean,
  isLoading?: boolean,
  onCreateOption?: (val: string) => void
  onChange?: (val: OnChangeValue<SelectOptionType, false | true>, actionMeta: ActionMeta<SelectOptionType> | null) => void,
};

function CreatableSelectInput({
  className, name, label, value, onChange, isDisabled, options,
  multiple, placeholder, isClearable, isLoading, onCreateOption
}: SelectProps) {
  return (
    <div className={`${className || ''}`}>
      {label && <label htmlFor={name} className="flex text-labelColor mb-1">{label}</label>}

      <CreatableSelect
        className="select"
        classNamePrefix="react-select"
        name={name}
        id={name}
        instanceId={name}
        value={value}
        isMulti={multiple}
        isClearable={isClearable}
        isLoading={isLoading}
        isSearchable
        maxMenuHeight={150}
        onChange={onChange}
        onCreateOption={onCreateOption}
        menuPlacement="auto"
        isDisabled={isDisabled}
        options={options || []}
        placeholder={placeholder}
      />
    </div>
  );
}

CreatableSelectInput.defaultProps = {
  className: '',
  name: ''
};

export default CreatableSelectInput;
