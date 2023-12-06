import React, { useState, useEffect } from 'react';

import { GoX } from 'react-icons/go';
import { HiFilter } from 'react-icons/hi';
import { CgClose, CgChevronDown } from 'react-icons/cg';

import TextInput from '../../../inputs/Text';
import Button from '../../../inputs/Button';
import Modal from '../../../common/Modal';
import Accordion from '../../../common/Accordion';
import RadioInput from '../../../inputs/Radio';
import DatePicker from '../../../inputs/DatePicker';

export type valueProps = {
  filter: any,
  onChange: React.Dispatch<React.SetStateAction<any>>
};

const transactionTypes = [
  { label: 'All', value: '' },
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' }
];

const transactionChannels = [
  { label: 'All', value: '' },
  { label: 'Escrow', value: 'escrow' },
  { label: 'Transfer', value: 'transfer' },
  { label: 'Virtual Account', value: 'virtualAccount' }
];

function Filter({ filter, onChange }: valueProps) {
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

  return (
    <div className="relative">
      <div
        className="bg-white max-w-min flex items-center space-x-2 p-1.5 border-2 rounded-md cursor-pointer"
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        {filter
          ? <GoX onClick={handleClear} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-primary/50 hover:text-white" />
          : <HiFilter className="w-5 h-5 text-lightText" />}
        <p className="text-sm ff-bold mt-1">Filter</p>
        <CgChevronDown className="w-5 h-5" />
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} maxWidth="max-w-[350px]">
        <div className="relative w-full">
          <h3 className="text-base ff-bold mb-5">Filter</h3>
          <div className="w-full">
            <Accordion className="mb-5" header="Date Range">
              <div className="flex -mx-2">
                <div className="w-1/2 px-2">
                  <DatePicker
                    value={data?.startDate || null}
                    maxDate={data?.endDate}
                    placeholder="Start Date"
                    onChange={(val) => setData((state: any) => ({ ...state, startDate: val }))}
                  />
                </div>
                <div className="w-1/2 px-2">
                  <DatePicker
                    value={data?.endDate || null}
                    minDate={data?.startDate}
                    placeholder="End Date"
                    onChange={(val) => setData((state: any) => ({ ...state, endDate: val }))}
                  />
                </div>
              </div>
            </Accordion>
            <Accordion className="mb-5" header="Amount Range">
              <div className="flex -mx-2">
                <div className="w-1/2 px-2">
                  <TextInput
                    placeholder="Min Amount"
                    type="number"
                    height="h-[38px]"
                    value={data?.minAmount || ''}
                    onChange={(e) => setData((state: any) => ({ ...state, minAmount: e.target.value }))}
                  />
                </div>
                <div className="w-1/2 px-2">
                  <TextInput
                    placeholder="Max Amount"
                    type="number"
                    height="h-[38px]"
                    minValue={data?.minAmount || 0}
                    value={data?.maxAmount || ''}
                    onChange={(e) => setData((state: any) => ({ ...state, maxAmount: e.target.value }))}
                  />
                </div>
              </div>
            </Accordion>
            <Accordion className="mb-5" header="Transaction Type">
              <div className="w-full">
                {transactionTypes.map((item) => (
                  <RadioInput
                    {...item}
                    name="type"
                    key={item?.label}
                    className="mb-1"
                    checked={data?.type === item?.value}
                    onChange={(e) => setData((state: any) => ({ ...state, type: e.target.value }))}
                  />
                ))}
              </div>
            </Accordion>
            <Accordion className="mb-5" header="Transaction Channels">
              <div className="w-full">
                {transactionChannels.map((item) => (
                  <RadioInput
                    {...item}
                    name="channel"
                    key={item?.label}
                    className="mb-1"
                    checked={data?.channel === item?.value}
                    onChange={(e) => setData((state: any) => ({ ...state, channel: e.target.value }))}
                  />
                ))}
              </div>
            </Accordion>

            <div className="w-full flex justify-between">
              <Button
                paddingY="py-1.5"
                paddingX="px-1"
                bgColor="bg-transparent"
                textColor="text-gray-400 ff-bold"
                onClick={handleClear}
              >
                <CgClose className="w-4 h-4 mb-0.5 mr-1" />
                Clear all
              </Button>
              <Button paddingY="py-1.5" paddingX="px-4" onClick={handleApply}>Apply</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Filter;
