import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import { GoX } from 'react-icons/go';

import useClickOutsideBox from '../../hooks/useClickOutsideBox';

import FilterIcon from '../../assets/svgs/filter.svg';
import TextInput from '../inputs/Text';
import SelectInput from '../inputs/Select';
import Button from '../inputs/Button';
import DateRangePicker from '../inputs/DateRangePicker';
import { valueProps } from '../../context/ListFilter';
import useGetQuery from '../../hooks/useGetQuery';

function TransactionFilter({ filter, setFilter }: valueProps) {
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { asPath } = useRouter();

  const wrapperRef = useRef(null);
  useClickOutsideBox(wrapperRef, () => setOpen(false));

  const { data: categories } = useGetQuery({
    endpoint: 'category', enabled: asPath === '/pfm/budget/expenses', queryKey: 'category'
  });

  useEffect(() => {
    setData(filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClear = (e: any) => {
    e && e.preventDefault();
    e && e.stopPropagation();
    setFilter((state: any) => ({ ...state, transactionFilter: null }));
    setData(null);
    setOpen(false);
  };

  const handleApply = () => {
    setFilter((state: any) => ({ ...state, transactionFilter: data }));
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="min-w-max flex items-center py-1"
        onClick={() => setOpen(!open)}
        role="presentation"
      >
        {!!filter && <GoX onClick={handleClear} className="cursor-pointer ml-2 w-6 h-6 p-1 rounded hover:bg-primary/50 hover:text-white" />}
        <div className="w-10 h-10 flex justify-center items-center rounded-full transition-all bg-gray-100 ml-2 cursor-pointer hover:bg-primary/10">
          <Image src={FilterIcon} alt="calendar" />
        </div>
      </div>

      {open && (
        <div className="absolute bg-white right-0 shadow-box rounded-lg p-5">
          <div className="relative w-80">
            <GoX className="absolute -right-2 -top-2 w-7 h-auto cursor-pointer" onClick={() => setOpen(false)} />
            <h3 className="text-lg ff-bold mb-5">Filter List</h3>
            <div className="w-full">
              <DateRangePicker
                className="mb-5"
                value={data?.dateRange || null}
                onChange={(val) => setData((state: any) => ({ ...state, dateRange: val }))}
              />
              {asPath === '/pfm/budget/expenses' ? (
                <SelectInput
                  className="mb-7"
                  placeholder="Category"
                  value={data?.category || null}
                  options={[{ label: '-All categories-', value: '' }, ...categories?.data?.map((item: any) => ({ label: item.name, value: item.id }))]}
                  onChange={(val) => setData((state: any) => ({ ...state, category: val }))}
                />
              ) : (
                <>
                  <TextInput
                    placeholder="Amount"
                    className="mb-5"
                    type='number'
                    height='h-[38px]'
                    value={data?.amount || ''}
                    onChange={(e) => setData((state: any) => ({ ...state, amount: e.target.value }))}
                  />
                  <SelectInput
                    className="mb-7"
                    placeholder="Transaction Type"
                    value={data?.type || null}
                    options={[{ label: '-All transactions-', value: '' }, { label: 'Credit', value: 'credit' }, { label: 'Debit', value: 'debit' }]}
                    onChange={(val) => setData((state: any) => ({ ...state, type: val }))}
                  />
                </>
              )}

              <div className="w-full flex space-x-2">
                <Button
                  paddingY="py-2.5"
                  bgColor="bg-gray-100"
                  textColor="text-gray-600"
                  className="w-1/2"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <Button paddingY="py-2.5" className="w-1/2" onClick={handleApply}>Apply</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionFilter;
