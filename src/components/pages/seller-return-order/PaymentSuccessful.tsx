import Image from "next/image";

import CheckIncomplete from "../../../assets/svgs/check-incomplete-circle.svg";
import Button from "../../inputs/Button";

interface PaymentSuccessfulProps {
  onPaymentSuccessful?: () => void;
}

export default function PaymentSuccessful({ onPaymentSuccessful }: PaymentSuccessfulProps) {
  return (
    <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Image src={CheckIncomplete} alt="Success Icon" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-textColor mb-4">
          Payment Made Successfully!
        </h2>

        <p className="text-grey2 text-base font-medium mb-6">
          Your payment has been processed successfully. You will be redirected
          to view your order status shortly.
        </p>

        <div className="flex justify-center">
          <Button onClick={onPaymentSuccessful} className="mt-6 bg-primary py-4 px-8">
            Back to Order Page
          </Button>
        </div>
      </div>
    </div>
  );
}
