import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiEllipsisVertical } from 'react-icons/hi2';

type Props = { options?: OptionProps[], position?: string };
type OptionProps = { title: string, action: () => void, disabled?: boolean };

export default function MenuOptions({ options = [], position = 'top' }: Props) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <>
            <Menu.Button className="focus:outline-none">
              <HiEllipsisVertical className={`${open ? 'shadow' : ''
              } h-auto w-8 p-1 text-black rounded hover:shadow`}
              />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className={`absolute ${position === 'top' ? 'top-0' : 'bottom-2'
              } right-9 z-10 bg-white border w-32 shadow-md`}
              >
                {options?.map((item: OptionProps) => (
                  <Menu.Item key={item?.title}>
                    <button
                      type="button"
                      disabled={item?.disabled}
                      onClick={item?.action}
                      className="w-full font-semibold text-left px-2 py-2 hover:bg-gray-50 disabled:text-lightText hover:disabled:bg-white"
                    >
                      {item?.title}
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
