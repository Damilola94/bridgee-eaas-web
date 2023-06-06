import React from 'react';
import { Disclosure } from '@headlessui/react';
import { CgChevronUp } from 'react-icons/cg';

type Props = {
  header: React.ReactNode,
  className?: string,
  children: React.ReactNode,
}

function Accordion({ header, children, className = '' }: Props) {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-white">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between py-2 text-left text-sm ff-bold border-b focus:outline-none">
                <span>{header}</span>
                <CgChevronUp className={`${open ? 'rotate-180 transform' : ''} transition-all h-5 w-5`} />
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default Accordion;
