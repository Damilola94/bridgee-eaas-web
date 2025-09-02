import React, { useState, useRef, useEffect, ReactNode } from 'react';

export interface CountryData {
  name: string;
  code: string;
  flag: ReactNode;
}

type Props = {
  countries: readonly CountryData[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const CountryFlagSelector: React.FC<Props> = ({ countries, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find(c => c.code === value) ?? countries[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: CountryData) => {
    onChange(country.code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative h-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 pl-3 pr-2 py-2.5 rounded-l-lg hover:bg-gray-50 disabled:bg-transparent ${disabled ? 'cursor-not-allowed' : ''}`}>
        {selectedCountry.flag}
        <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1 max-h-60 overflow-y-auto">
            {countries.map(country => (
              <li key={country.name}>
                <a href="#" onClick={e => { e.preventDefault(); handleSelect(country); }} className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  {country.flag}
                  <span>{country.name} ({country.code})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
