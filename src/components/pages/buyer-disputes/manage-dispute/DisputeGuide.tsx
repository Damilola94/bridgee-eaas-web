import React from 'react';

const data = [
  { step: 'First Step', desc: "You can choose between two options: Return Goods - this means that you want to return the item and apply for a full refund, or Refund Only - this means that either you did not receive the item and you're applying for a full refund or you did receive the item and you want a partial refund (without having to send the item back)." },
  { step: 'Second Step', desc: "You can choose between two options: Return Goods - this means that you want to return the item and apply for a full refund, or Refund Only - this means that either you did not receive the item and you're applying for a full refund or you did receive the item and you want a partial refund (without having to send the item back)." },
  { step: 'Third Step', desc: "You can choose between two options: Return Goods - this means that you want to return the item and apply for a full refund, or Refund Only - this means that either you did not receive the item and you're applying for a full refund or you did receive the item and you want a partial refund (without having to send the item back)." }
];

function DisputeGuide() {
  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="w-full px-10 py-8 border-b">
        <h3 className="font-bold text-xl ff-bold mb-5">How to handle a dispute</h3>

        <div className="w-full">
          <ul className="p">
            {data?.map((item) => (
              <li
                key={item?.step}
                className="relative w-full pl-5 pb-5
                before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary
                before:absolute before:-left-1.5 before:top-2"
              >
                <p className="font-bold text-base mb-2">{item?.step}</p>
                <p className="text-lightText">{item?.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DisputeGuide;
