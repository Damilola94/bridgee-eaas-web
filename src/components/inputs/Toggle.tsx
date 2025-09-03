import React from 'react';
import { Switch } from '@headlessui/react';

type Props = {
  label?: string;
  value?: boolean;
  onChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

function ToggleInput({ label = '', value = false, onChange = () => {} }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-textColor">{label}</span>
      <Switch
        checked={value}
        onChange={onChange}
        className={`${value ? 'bg-primary' : 'bg-gray-400'}
          relative inline-flex h-[25px] w-[46px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
}

export default ToggleInput;
