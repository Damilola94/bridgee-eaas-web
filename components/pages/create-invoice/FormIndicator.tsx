import React, { Fragment } from 'react';

const forms = [
  'Order Details',
  'Recipient’s Details',
  'Summary'
];

function FormIndicator({ formIndex }: { formIndex: number }) {
  return (
    <div className="w-full bg-white px-10 pt-3 pb-7 rounded-lg shadow-md mb-5">
      <div className="w-full flex justify-between items-center">
        {forms?.map((item, index) => (
          <Fragment key={item}>
            <div className="text-center relative">
              <span
                className={`inline-block rounded-full ${formIndex >= index ? 'bg-primary' : 'bg-lightText'
                } text-white text-xs font-bold py-1.5 w-7 h-7`}
              >
                {index + 1}
              </span>
              <p className={`absolute text-xs min-w-max mt-1 left-[50%] -translate-x-1/2 ${
                formIndex >= index ? 'text-primary' : 'text-lightText'}`}>
                {item}
              </p>
            </div>
            {index < forms.length - 1 && (
              <div className={`w-full h-0.5 ${formIndex - 1 >= index ? 'bg-primary' : 'bg-lightText'}`} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default FormIndicator;
