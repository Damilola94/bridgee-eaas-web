import React from 'react';

type Props = {
  className?: string,
  checked?: boolean,
  onChange: (e: any) => void
  children: React.ReactNode,
}

const Checkbox = ({ checked, onChange, children }: Props) => (
  <label className="flex items-center space-x-2 cursor-pointer py-1">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
    />
    <span className="text-sm">{children}</span>
  </label>
);

export default Checkbox;
