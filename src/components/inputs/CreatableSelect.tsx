import React from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { SelectOptionType } from './Select';

type SelectProps = {
  className?: string,
  name?: string,
  label?: string,
  height?: string,
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
  className, name, label, value, onChange, isDisabled, options, height = 'h-[43.2px]',
  multiple, placeholder, isClearable, isLoading, onCreateOption
}: SelectProps) {
  return (
    <div className={`${className || ''}`}>
      {label && <label htmlFor={name} className="flex text-labelColor mb-1">{label}</label>}

      <CreatableSelect
        classNames={{
          control: () => `${height} !bg-inputBg !text-textColor px-2 !outline-none w-full !rounded-[10px] border !border-borderColor disabled:!bg-gray-200`
        }}
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

export default CreatableSelectInput;
