/* eslint-disable no-duplicate-imports */
import React, { useState, useEffect } from 'react';

import { X, Filter, ChevronDown } from 'lucide-react';

import Modal from '../../common/Modal';
import Accordion from '../../common/Accordion';

import Button from '../../inputs/Button';
import Checkbox from '../../common/CheckBox';
import SearchInput from '../../inputs/Search';
import TextInput from '../../inputs/Text';

type AmountInputProps = {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
};

const AmountInput = ({ placeholder, value, onChange }: AmountInputProps) => (
  <TextInput
    type="text"
    placeholder={placeholder}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    className="w-full"
  />
);

export type valueProps = {
  filter: any,
  onChange: React.Dispatch<React.SetStateAction<any>>
};

function FilterDropdown({ filter, onChange }: valueProps) {
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setData(filter);
  }, [filter, open]);

  const handleClear = (e: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    onChange(null);
    setData(null);
    setOpen(false);
  };

  const handleApply = () => {
    onChange(data);
    setOpen(false);
  };

  const updateStatus = (status: string, checked: boolean) => {
    setData((state: any) => {
      const currentStatuses = state?.status || [];
      if (checked) {
        return { ...state, status: [...currentStatuses, status] };
      } else {
        return { ...state, status: currentStatuses.filter((s: string) => s !== status) };
      }
    });
  };

  const updateTransaction = (transaction: string, checked: boolean) => {
    setData((state: any) => {
      const currentTransactions = state?.transaction || [];
      if (checked) {
        return { ...state, transaction: [...currentTransactions, transaction] };
      } else {
        return { ...state, transaction: currentTransactions.filter((t: string) => t !== transaction) };
      }
    });
  };

  return (
    <div className="relative">
      <div
        className="bg-white max-w-min flex items-center space-x-2 p-1.5 border-2 rounded-md cursor-pointer hover:border-blue-300 transition-colors"
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        {filter
          ? <X onClick={handleClear} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-blue-500 hover:text-white" />
          : <Filter className="w-5 h-5 text-gray-500" />}
        <p className="text-sm font-bold mt-1">Filters</p>
        <ChevronDown className="w-5 h-5" />
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} maxWidth="max-w-[400px]">
        <div className="relative w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Filters</h3>
            <div className="flex space-x-2">
              <Button
                paddingY="py-1.5"
                paddingX="px-1"
                bgColor="bg-transparent"
                textColor="text-gray-400 ff-bold"
                onClick={handleApply}
              >

                Save view
              </Button>
              <Button
                paddingY="py-1.5"
                paddingX="px-1"
                bgColor="bg-transparent"
                textColor="text-gray-400 ff-bold"
                onClick={handleClear}
              >
                Clear all
              </Button>
            </div>
          </div>

          <div className="relative mb-6">

            <SearchInput
              value={data?.search || ''}
              onChange={(e) => setData((state: any) => ({ ...state, search: e.target.value }))}
              className="w-full"
              height="h-[35.6px]"
            />

          </div>

          <div className="w-full space-y-4">
            <Accordion className="border-b pb-4" header="Amount">
              <div className="flex space-x-2">
                <AmountInput
                  placeholder="From"
                  value={data?.amountFrom}
                  onChange={(val) => setData((state: any) => ({ ...state, amountFrom: val }))}
                />
                <AmountInput
                  placeholder="To"
                  value={data?.amountTo}
                  onChange={(val) => setData((state: any) => ({ ...state, amountTo: val }))}
                />
              </div>
            </Accordion>

            <Accordion className="border-b pb-4" header="Status">
              <div className="space-y-2">
                <Checkbox
                  checked={data?.status?.includes('Successful') || false}
                  onChange={(e) => updateStatus('Successful', e.target.checked)}
                >
                  Successful
                </Checkbox>
                <Checkbox
                  checked={data?.status?.includes('Pending') || false}
                  onChange={(e) => updateStatus('Pending', e.target.checked)}
                >
                  Pending
                </Checkbox>
                <Checkbox
                  checked={data?.status?.includes('Failed') || false}
                  onChange={(e) => updateStatus('Failed', e.target.checked)}
                >
                  Failed
                </Checkbox>
              </div>
            </Accordion>

            <Accordion className="pb-4" header="Transaction">
              <div className="space-y-2">
                <Checkbox
                  checked={data?.transaction?.includes('Bridgee for Inflows') || false}
                  onChange={(e) => updateTransaction('Bridgee for Inflows', e.target.checked)}
                >
                  Bridgee for Inflows
                </Checkbox>
                <Checkbox
                  checked={data?.transaction?.includes('Bank Transfer') || false}
                  onChange={(e) => updateTransaction('Bank Transfer', e.target.checked)}
                >
                  Bank Transfer
                </Checkbox>
              </div>
            </Accordion>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FilterDropdown;