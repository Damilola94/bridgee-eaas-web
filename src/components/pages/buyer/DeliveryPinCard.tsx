import Image from "next/image";
import React from "react";

import CheckIncomplete from "../../../assets/svgs/check-incomplete-circle.svg";
import Button from "../../inputs/Button";

interface Props {
  pin: string | null ;
  onConfirmClick: () => void;
}

const DeliveryPinCard: React.FC<Props> = ({ pin, onConfirmClick }) => {
  const digits = pin?.split("");
  return (
    <div className="bg-white text-center  rounded-lg p-6 shadow">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Image src={CheckIncomplete} alt="Success Icon" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900">
        Payment made successfully
      </h2>

      <p className="text-gray-600 text-sm mt-3 max-w-md mx-auto">
        Your payment is confirmed. Please use the code below to confirm delivery.
      </p>

      <div className="mt-6 border border-success rounded-xl p-6 text-center">
        <p className="text-success font-semibold mb-4">
          Delivery Code
        </p>
        <div className="flex justify-center items-center  text-2xl font-bold sm:tracking-[3em] sm:gap-4 sm:ml-20 tracking-[.5em]">
          {digits?.map((digit, index) => (
            <span key={index}>{digit}</span>
          ))}
        </div>
      </div>
      <Button
        onClick={onConfirmClick}
        className="w-full text-lg ff-bold !rounded-md mdx2:!rounded-xl mt-10"
        paddingY="p-3.5"
        type="submit"
      >
        Confirm Delivery
      </Button>
    </div>
  );
};

export default DeliveryPinCard;
