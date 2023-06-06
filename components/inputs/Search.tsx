import React from 'react';
import { FiSearch } from 'react-icons/fi';

type Props = {
  className?: string,
  value?: string | number,
  name?: string,
  placeholder?: string,
  height?: string
  readOnly?: boolean,
  disabled?: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

function SearchInput({
  className, value, name, readOnly, disabled,
  onChange, placeholder, height
}: Props) {
  return (
    <div className={`${className} relative`}>
      <FiSearch className="absolute w-5 h-5 text-gray-500 left-1.5 top-1/2 -translate-y-1/2" />
      <input
        className={`${height} bg-inputBg pl-8 pr-2 outline-none w-full rounded-[10px] border border-borderColor disabled:bg-gray-200`}
        type="search"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

SearchInput.defaultProps = {
  className: '',
  value: '',
  name: '',
  height: 'h-12',
  placeholder: 'Search'
};

export default SearchInput;
