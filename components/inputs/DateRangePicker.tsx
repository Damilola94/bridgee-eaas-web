import React, { useState, useRef } from 'react';

import Image from 'next/image';
import Calendar from 'react-calendar';
import { GoX } from 'react-icons/go';

import useClickOutsideBox from '../../hooks/useClickOutsideBox';

import CalendarIcon from '../../assets/svgs/calendar.svg';
import { formatDate } from '../../utilities/dateTime';

type Props = {
  className?: string,
  value?: Date | null,
  onChange?: (val: Date | null) => void
};

function DateRangePicker({ className = '', value = null, onChange = () => {} }: Props) {
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

  const stringValue = Array.isArray(value)
    ? `${formatDate(value[0].toString(), false)} - ${formatDate(value[1].toString(), false)}`
    : value && formatDate(value.toString(), false);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className={`${className} min-w-max w-full min-h-[38px] flex relative items-center py-1 bg-inputBg rounded-[10px] px-3 border border-borderColor`}
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        <span className={`text-sm ${value ? 'text-textColor' : 'text-labelColor'}`}>{stringValue || 'Date Range'}</span>
        {value && <GoX onClick={clearValue} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-primary/50 hover:text-white" />}
        <div className="absolute right-2 w-14 h-14 flex justify-center items-center rounded-full transition-all bg-gray-100 ml-2 cursor-pointer hover:bg-primary/10">
          <Image src={CalendarIcon} alt="calendar" />
        </div>
      </div>

      {open && (
        <div className="absolute z-10 bg-white right-0 top-[45px] shadow-box rounded-lg p-5">
          <div className="flex relative">
            <GoX className="absolute -right-5 -top-5 w-7 h-auto cursor-pointer" onClick={() => setOpen(false)} />
            <Calendar
              selectRange
              value={value}
              onChange={handleChange}
              minDate={new Date('2020, 1, 1')}
              maxDate={new Date()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
