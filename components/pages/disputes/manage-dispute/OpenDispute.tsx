import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import Button from '../../../inputs/Button';
import TextInput from '../../../inputs/Text';

const requestOptions = [
  {
    value: 'refund',
    header: 'Refund',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  },
  {
    value: 'return-goods',
    header: 'Return Goods',
    desc: 'An escrow transaction involving just two parties/entities (buyer and seller).'
  }
];

function OpenDispute({ onNext = () => {} }: { onNext?: () => void }) {
  const [request, setRequest] = useState('');
  const [reason, setReason] = useState('');

  return (
    <div>
      <div className="w-full bg-white px-10 py-8 rounded-lg shadow-md">
        <div className="w-full mb-6">
          <h3 className="font-bold text-xl ff-bold mb-2">Open Dispute</h3>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-base ff-bold font-bold mb-1">Dispute Request</h3>

          <div className="w-full">
            <div className="flex flex-wrap -mx-2">
              {requestOptions.map((item) => (
                <div className="w-full sm:w-1/2 p-2" key={item?.value}>
                  <div
                    role="presentation"
                    onClick={() => setRequest(item?.value)}
                    className={`w-full h-full rounded-lg ${request === item?.value
                      ? 'border-success border-2' : 'border'} bg-secondary p-5 cursor-pointer`}
                  >
                    <div className="w-full relative">
                      <span
                        className={`rounded-full inline-block ${request === item?.value
                          ? 'bg-primary' : 'bg-gray-400'} p-1 w-5 h-5 absolute right-0`}
                      >
                        <FaCheck className="text-white w-3 h-3" />
                      </span>
                      <h3 className="text-base ff-bold font-bold mb-2 pr-6">{item?.header}</h3>
                      <p className="">{item?.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full mb-10">
          <TextInput
            name="reason"
            value={reason}
            onChange={(e) => setReason(e?.target?.value)}
            label="Dispute Reason"
            className=""
          />
        </div>

        <div className="w-full mb-3">
          <Button paddingY="py-3" className="w-full" onClick={onNext}>Open Duspute</Button>
        </div>
      </div>
    </div>
  );
}

export default OpenDispute;
