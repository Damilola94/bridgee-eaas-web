import Button from "../../inputs/Button";

interface PaymentPendingProps {
  onPaymentPending?: () => void;
}

export default function PaymentPending({ onPaymentPending }: PaymentPendingProps) {
  return (
    <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-textColor mb-4">
          Payment Being Processed
        </h2>

        <p className="text-grey2 mb-6">
          Your payment is currently being processed. Please wait while we verify
          the transaction.
        </p>

        <div className="flex justify-center">
          <Button onClick={onPaymentPending} className="mt-6 bg-primary py-4 px-8">
            Back to Order Page
          </Button>
        </div>
      </div>
    </div>
  );
}
