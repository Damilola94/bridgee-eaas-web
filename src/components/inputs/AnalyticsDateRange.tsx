import React, { useState, useRef } from 'react';

import Image from 'next/image';
import { GoX } from 'react-icons/go';
import Calendar from 'react-calendar';

import useClickOutsideBox from '../../hooks/useClickOutsideBox';
import { valueProps } from '../../context/ListFilter';

import CalendarIcon from '../../assets/svgs/calendar.svg';
import { formatDate } from '../../utilities/dateTime';

function AnalyticsDateRange({ filter, setFilter }: valueProps) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);
  useClickOutsideBox(wrapperRef, () => setOpen(false));

  const clearValue = (e: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    setFilter((state: any) => ({ ...state, flowchartFilter: null }));
  };

  const handleChange = (val: any) => {
    setFilter((state: any) => ({ ...state, flowchartFilter: { dateRange: val } }));
    setOpen(false);
  };

  const handlePredefined = (analysisType: string, value: number) => {
    setFilter((state: any) => ({ ...state, flowchartFilter: { analysisType, value } }));
    setOpen(false);
  };

  let value = '';

  if (filter?.dateRange) {
    const range = filter?.dateRange;
    value = Array.isArray(range)
      ? `${formatDate(range[0].toString(), false)} - ${formatDate(range[1].toString(), false)}`
      : range && formatDate(range.toString(), false);
  } else if (filter?.analysisType && filter?.value) {
    value = `Last ${filter?.value} ${filter?.analysisType}`;
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="min-w-max flex items-center py-1"
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        <span className="text-sm">{value || 'Current Year'}</span>
        {filter && <GoX onClick={clearValue} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-primary/50 hover:text-white" />}
        <div className="w-10 h-10 flex justify-center items-center rounded-full transition-all bg-gray-100 ml-2 cursor-pointer hover:bg-primary/10">
          <Image src={CalendarIcon} alt="calendar" />
        </div>
      </div>

      {open && (
        <div className="absolute bg-white right-0 shadow-box rounded-lg p-5">
          <div className="flex relative">
            <GoX className="absolute -right-2 -top-2 w-7 h-auto cursor-pointer" onClick={() => setOpen(false)} />
            <Calendar
              selectRange
              value={filter?.dateRange || null}
              className="mr-5"
              onChange={handleChange}
              minDate={new Date('2020, 1, 1')}
              maxDate={new Date()}
            />
            <div className="pt-8">
              <h3 className="min-w-max text-xs mb-5">Predefined dates</h3>
              <button type="button" className="predefined-date-btn" onClick={() => handlePredefined('days', 7)}>Last 7 days</button>
              <button type="button" className="predefined-date-btn" onClick={() => handlePredefined('days', 30)}>Last 30 days</button>
              <button type="button" className="predefined-date-btn" onClick={() => handlePredefined('days', 60)}>Last 60 days</button>
              <button type="button" className="predefined-date-btn" onClick={() => handlePredefined('months', 6)}>Last 6 months</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsDateRange;
