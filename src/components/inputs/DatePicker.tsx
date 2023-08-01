import React, { useState, useRef } from 'react';

import Calendar from 'react-calendar';
import { CgClose } from 'react-icons/cg';
import { HiCalendar } from 'react-icons/hi';

import useClickOutsideBox from '../../hooks/useClickOutsideBox';

import { formatDate } from '../../utilities/dateTime';

type Props = {
  className?: string,
  placeholder?: string,
  value?: Date | null,
  minDate?: Date | undefined,
  maxDate?: Date | undefined,
  onChange?: (val: Date | null) => void
};

function DatePicker({
  className = '', value = null, onChange = () => {},
  placeholder = 'Select Date', minDate = new Date('2020, 1, 1'), maxDate = new Date()
}: Props) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutsideBox(wrapperRef, () => setOpen(false));

  const clearValue = (e: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onChange(null);
  };

  const handleChange = (val: any) => {
    onChange(val);
    setOpen(false);
  };

  const stringValue = value && formatDate(value.toString(), false);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`${className} min-w-max w-full min-h-[38px] flex relative items-center pt-1.5 bg-inputBg rounded-[10px] px-3 border border-borderColor`}
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        <span className={`text-sm ${value ? 'text-textColor' : 'text-labelColor'}`}>{stringValue || placeholder}</span>
        {value && <CgClose onClick={clearValue} className="cursor-pointer ml-2 w-6 h-6 mb-1 px-1 rounded hover:bg-primary/50 hover:text-white" />}
        <HiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-auto cursor-pointer" />
      </div>

      {open && (
        <div className="absolute z-10 bg-white border right-0 top-[45px] shadow-box rounded-lg px-5 pt-5 pb-5">
          <h3 className="ff-bold">Select Date</h3>
          <div className="flex relative">
            <CgClose className="absolute -right-3 -top-8 w-7 h-7 p-1 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => setOpen(false)} />
            <Calendar
              value={value}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
