import { useEffect, useState } from "react";
import Button from "../../inputs/Button";
import TextInput from "../../inputs/Text";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyIcon from "../../../assets/svgs/copy.svg";
import CancelIcon from "../../../assets/svgs/cancel.svg";
import Image from "next/image";
import { useQuery, useQueryClient } from "react-query";
import notification from "../../../utilities/notification";
import { QUERY_KEYS } from "../../../configs/constants";
import {
  getPaymentDetails,
  getTransactionStatus,
} from "../../../services/api/escrow";
import PaymentSuccessful from "./PaymentSuccessful";
import PaymentPending from "./PaymentPending";

interface MakePaymentProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  orderReference?: string;
  onPaymentSuccess?: () => void;
  onPaymentPending?: () => void;
}

export default function MakePayment({
  formData,
  onInputChange,
  orderReference,
  onPaymentSuccess,
  onPaymentPending,
}: MakePaymentProps) {
  const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const [sendingPayment, setSendingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "success" | null
  >(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data: paymentDetailsData, isLoading: paymentLoading } = useQuery(
    [QUERY_KEYS.PAYMENT_DETAILS, orderReference, formData.email],
    () => getPaymentDetails(orderReference || "", formData.email || ""),
    {
      enabled: Boolean(orderReference && formData.email && isPaymentInitiated),
    }
  );

  useEffect(() => {
    if (paymentDetailsData?.data?.walletTransactionId) {
      setTransactionId(paymentDetailsData.data.walletTransactionId);
    }
  }, [paymentDetailsData]);

  useEffect(() => {
    if (!isPaymentInitiated || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaymentInitiated, timeLeft]);

  const handleCopy = (field: string) => {
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isFormValid = () => {
    const { fullName, email, phone } = formData;
    return (
      fullName.trim().length > 0 &&
      email.trim().length > 0 &&
      phone.trim().length > 0
    );
  };

  const handleMakePayment = () => {
    if (isFormValid()) {
      setIsPaymentInitiated(true);
    }
  };

  const handleSentMoney = async () => {
    if (!transactionId) {
      notification({
        title: "Error",
        message: "Transaction ID not available. Please try again.",
        type: "error",
      });
      return;
    }

    setSendingPayment(true);

    const response = await getTransactionStatus(transactionId).catch(
      async (error) => {
        // Handle the specific "pending" case where API returns 400 with valid data
        if (
          error.message &&
          error.message.includes("Transaction status is Pending.")
        ) {
          return {
            isSuccess: false,
            statusCode: "400",
            message: "Transaction status is Pending.",
            data: null,
            metaData: null,
          };
        }
        throw error; // Re-throw actual network errors
      }
    );

    if (response.statusCode === "200" && response.isSuccess) {
      setPaymentStatus("success");
      notification({
        title: "Payment Successful",
        message:
          response.message || "Your payment has been processed successfully!",
        type: "success",
      });
      queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, orderReference]);

      onPaymentSuccess?.();
    } else if (
      response.statusCode === "400" &&
      response.message?.includes("Pending")
    ) {
      setPaymentStatus("pending");
      notification({
        title: "Payment Processing",
        message:
          response.message ||
          "Your payment is being processed. We'll notify you once it's complete.",
        type: "info",
      });

      onPaymentPending?.();
    } else {
      notification({
        title: "Payment Status",
        message: response.message || "Unable to determine payment status.",
        type: "warning",
      });
    }

    setSendingPayment(false);
  };

  const handleCancelPayment = () => {
    setIsPaymentInitiated(false);
    setTimeLeft(600);
  };

  const resetPaymentState = () => {
    setPaymentStatus(null);
    setIsPaymentInitiated(false);
    setTimeLeft(600);
    setSendingPayment(false);
  };

  const amount = paymentDetailsData?.data?.amount || "";
  const accountNumber = paymentDetailsData?.data?.accountNumber || "";
  const bankName = paymentDetailsData?.data?.bankName || "";
  const accountName = paymentDetailsData?.data?.accountName || "";

  if (isPaymentInitiated) {
    return (
      <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
        <div className="mx-auto">
          <section className="block lg:flex items-center justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-textColor mb-2">
                {formData.fullName}
              </h2>
              <p className="text-grey2 text-lg font-normal mb-1">
                {formData.phone}
              </p>
              <p className="text-grey2 text-lg font-medium">{formData.email}</p>
            </div>

            <div className="mb-8">
              <div className="text-lg font-bold text-textColor">
                Pay <span className="text-[#00A980]">NGN {amount}</span>
              </div>
            </div>
          </section>

          <div className="border-b-[0.8px] border-[#696969] mb-10"></div>

          {/* Payment Feedback */}

          {paymentStatus === "pending" ? (
            <PaymentPending onPaymentPending={resetPaymentState} />
          ) : paymentStatus === "success" ? (
            <PaymentSuccessful onPaymentSuccessful={resetPaymentState} />
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-textColor mb-6">
                  Transfer NGN {amount} to the Collection Account Below
                </h3>

                {/* Bank Details */}
                <div className="space-y-4 mb-10">
                  <section className="bg-secondary rounded-[10px] px-4 py-10 space-y-9">
                    <div className="space-y-2">
                      <label className="text-base font-medium text-grey2 mb-1">
                        BANK NAME
                      </label>
                      <div className="text-textColor font-semibold text-lg">
                        {bankName}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-base font-medium text-grey2 mb-1">
                        ACCOUNT NAME
                      </label>
                      <div className="text-textColor font-semibold text-lg">
                        {accountName}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <label className="text-base font-medium text-grey2 mb-1">
                          ACCOUNT NUMBER
                        </label>
                        <div className="text-textColor font-semibold text-lg">
                          {accountNumber}
                        </div>
                      </div>

                      <CopyToClipboard
                        text={accountNumber}
                        onCopy={() => handleCopy("account")}
                      >
                        <button className="text-gray-500 hover:text-gray-700">
                          {copiedField === "account" ? (
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <Image src={CopyIcon} alt="Copy Icon" />
                          )}
                        </button>
                      </CopyToClipboard>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <label className="text-base font-medium text-grey2 mb-1">
                          AMOUNT
                        </label>
                        <div className="text-textColor font-semibold text-lg">
                          {amount}
                        </div>
                      </div>

                      <CopyToClipboard
                        text={amount}
                        onCopy={() => handleCopy("amount")}
                      >
                        <button className="text-gray-500 hover:text-gray-700">
                          {copiedField === "amount" ? (
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <Image src={CopyIcon} alt="Copy Icon" />
                          )}
                        </button>
                      </CopyToClipboard>
                    </div>
                  </section>
                </div>
              </div>

              <div className="h-[1px] w-full bg-dashed-line-dynamic"></div>

              {/* Timer Warning */}
              <div className="my-10 w-[90%] mx-auto">
                <p className="text-lg font-medium text-textColor text-center">
                  The account is for this transaction only and expires in{" "}
                  <span className="text-[#00A980] font-bold">
                    {formatTime(timeLeft)}
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleSentMoney}
                  className="bg-success py-4 w-full text-lg font-bold"
                  disabled={sendingPayment}
                >
                  {sendingPayment
                    ? "Verifying Payment..."
                    : "I've sent the money"}
                </Button>

                <Button
                  onClick={handleCancelPayment}
                  className="bg-transparent border border-grey2 py-4 w-full text-textColor "
                >
                  <span className="flex items-center justify-center">
                    <Image
                      src={CancelIcon}
                      alt="Cancel Icon"
                      className="h-8 w-8"
                    />
                    <p className="text-lg font-bold text-textColor">
                      Cancel Payment
                    </p>
                  </span>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
      <h1 className="text-2xl font-bold text-textColor mb-2">Welcome,</h1>
      <p className="text-black/40 mb-8 font-medium">
        Kindly fill the information below to complete your order process.
      </p>

      <form className="space-y-6">
        <TextInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          placeholder="Toluwalase Obasun"
        />

        <TextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={onInputChange}
        />

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <div className="flex">
            <div className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
              <span className="text-green-600 mr-2">🇳🇬</span>
              <span className="text-sm text-gray-600">+234</span>
            </div>

            <TextInput
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={onInputChange}
              className="w-full"
            />
          </div>
        </div>

        <Button
          className="w-full bg-success py-4 !mt-10"
          onClick={handleMakePayment}
          disabled={!isFormValid()}
        >
          Make Payment
        </Button>
      </form>
    </div>
  );
}
