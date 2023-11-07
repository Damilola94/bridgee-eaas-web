import React from 'react';
import Select, { MultiValue, SingleValue, ActionMeta } from 'react-select';

export type SelectOptionType = { label: string, value: string | number }

type SelectProps = {
  className?: string,
  name?: string,
  label?: string,
  height?: string,
  value?: SelectOptionType,
  options?: SelectOptionType[],
  placeholder?: string,
  multiple?: boolean,
  disabled?: boolean,
  isClearable?: boolean,
  onChange?: (val: MultiValue<SelectOptionType> | SingleValue<SelectOptionType>, actionMeta: ActionMeta<SelectOptionType> | null) => void,
};

function SelectInput({
  className = '', name = '', label, height = 'h-[43.2px]', value, onChange, disabled, options,
  multiple, placeholder, isClearable
}: SelectProps) {
  return (
    <div className={`${className || ''} relative select`}>
      {label && <label className="flex mb-1">{label}</label>}

      <Select
        classNames={{
          singleValue: () => '!text-textColor',
          control: () => `${height} px-2 !outline-none w-full !rounded-[10px] ${
            disabled ? '!bg-gray-200' : '!bg-inputBg'} border !border-borderColor`
        }}
        name={name}
        id={name}
        instanceId={name}
        value={value}
        isMulti={multiple}
        isClearable={isClearable}
        classNamePrefix="react-select"
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

export default SelectInput;
