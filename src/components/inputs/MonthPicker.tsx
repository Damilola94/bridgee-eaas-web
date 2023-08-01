import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { GoX } from 'react-icons/go';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

import useClickOutsideBox from '../../hooks/useClickOutsideBox';

import Calendar from '../../assets/svgs/calendar.svg';

type MonthPickerProps = {
  className: string,
  value: [number, number] | null,
  label: string,
  onChange: (val: [number, number] | null) => void,
  yearsRange: [number, number],
  max: [number, number]
};

const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function MonthPicker({
  className, value, label, onChange, yearsRange, max
}: MonthPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [displayedValue, setDisplayedValue] = useState('Select Month');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(-1);

  const wrapperRef = useRef(null);
  useClickOutsideBox(wrapperRef, () => setShowPicker(false));

  useEffect(() => {
    if (value) {
      // value format: [m (0 - 11), yyyy]
      if (value[0] >= 0 && value[0] < 12) {
        setCurrentMonth(value[0]);
      }
      if (value[1] >= yearsRange[0] && value[1] <= yearsRange[1]) {
        setCurrentYear(value[1]);
      }

      if (value?.[0] >= 0 && value?.[1]) {
        setDisplayedValue((value && `${months[value[0]]}, ${value[1]}`) || label);
      }
    } else {
      setCurrentMonth(-1);
      setCurrentYear(new Date().getFullYear());
      setDisplayedValue(label || 'Select Month');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, label, showPicker]);

  const selectable = (num: number) => {
    if (max) {
      if (currentYear === max[1] && num > max[0]) return false;
    }
    return true;
  };

  const selectMonth = (num: number) => {
    if (!selectable(num)) return;
    setCurrentMonth(num);
    setShowPicker(false);
    onChange([num, currentYear]);
  };

  const clearValue = (e: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onChange(null);
  };

  const selectYear = (dir: number) => {
    const newYear = currentYear + dir;
    if (newYear >= yearsRange[0] && newYear <= yearsRange[1]) {
      setCurrentYear(newYear);
    }
  };

  const isSelectedMonth = (index: number): boolean => {
    return currentMonth === index && value?.[1] === currentYear;
  };

  return (
    <div className={`${className || ''} relative z-10`} ref={wrapperRef}>
      <div
        className="min-w-max flex items-center py-1"
        onClick={() => setShowPicker(!showPicker)}
        role="presentation"
      >
        <span className="text-sm">{displayedValue}</span>
        {value && <GoX onClick={clearValue} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-primary/50 hover:text-white" />}
        <div className="w-10 h-10 flex justify-center items-center rounded-full transition-all bg-gray-100 ml-2 cursor-pointer hover:bg-primary/10">
          <Image src={Calendar} alt="calendar" />
        </div>
      </div>

      {showPicker && (
        <div className="absolute right-0 bg-white w-[300px] rounded-md shadow-box border-borderColo p-4 pb-6">
          <div className="flex justify-center items-center mb-4 pb-1 space-x-3 border-b">
            <button
              type="button"
              className="rounded hover:enabled:cursor-pointer hover:enabled:bg-primary/10"
              disabled={currentYear <= yearsRange[0]}
              onClick={() => selectYear(-1)}
            >
              <IoMdArrowDropleft className={`p-1 w-8 h-auto ${currentYear <= yearsRange[0] ? 'text-gray-300' : ''}`} />
            </button>
            <span>{currentYear}</span>
            <button
              type="button"
              className="rounded hover:enabled:cursor-pointer hover:enabled:bg-primary/10"
              disabled={currentYear >= yearsRange[1]}
              onClick={() => selectYear(1)}
            >
              <IoMdArrowDropright className={`p-1 w-8 h-auto ${currentYear >= yearsRange[1] ? 'text-gray-300' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap -m-1">
            {months?.map((item, i) => (
              <div className="w-1/3 p-1" key={item}>
                <div
                  className={`w-full p-2 text-center text-sm rounded ${
                    isSelectedMonth(i) ? 'bg-primary text-white' : 'bg-gray-100'} ${selectable(i)
                    ? 'hover:bg-primary/20 cursor-pointer' : 'cursor-default text-labelColor bg-secondary'}`}
                  onClick={() => selectMonth(i)}
                  role="presentation"
                >
                  {item}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

MonthPicker.defaultProps = {
  className: '',
  value: null,
  label: '',
  onChange: () => {},
  yearsRange: [1900, 2100],
  max: null
};

export default MonthPicker;
