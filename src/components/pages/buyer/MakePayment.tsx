/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

import Image from "next/image";

import { useQuery, useQueryClient } from "react-query";

import Skeleton from "react-loading-skeleton";

import { useRouter } from "next/router";

import Button from "../../inputs/Button";
import TextInput from "../../inputs/Text";
import CopyIcon from "../../../assets/svgs/copy.svg";
import CancelIcon from "../../../assets/svgs/cancel.svg";

import notification from "../../../utilities/notification";
import { QUERY_KEYS } from "../../../configs/constants";
import {
  getPaymentDetails,
  getTransactionStatus
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
  initialIsPaymentInitiated?: boolean;
  onCancelPayment?: () => void;
}

export default function MakePayment({
  formData,
  onInputChange,
  orderReference,
  onPaymentSuccess,
  onPaymentPending,
  initialIsPaymentInitiated = false,
  onCancelPayment,
}: MakePaymentProps) {
  const router = useRouter();

  const [isPaymentInitiated, setIsPaymentInitiated] = useState(initialIsPaymentInitiated || false);
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
      enabled: Boolean(orderReference && formData.email && isPaymentInitiated)
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
        type: "error"
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
            metaData: null
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
        type: "success"
      });

      queryClient.invalidateQueries([QUERY_KEYS.ORDER_STATUS, orderReference]);

      onPaymentSuccess?.();

      router.push(`/buyer/order/${orderReference}`);
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
        type: "info"
      });

      onPaymentPending?.();
    } else {
      notification({
        title: "Payment Status",
        message: response.message || "Unable to determine payment status.",
        type: "warning"
      });
    }

    setSendingPayment(false);
  };

  const handleCancelPayment = () => {
    setIsPaymentInitiated(false);
    setTimeLeft(600);
    onCancelPayment?.();
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

  const SkeletonPaymentForm = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton width={150} height={24} />
          <Skeleton width={120} height={18} />
          <Skeleton width={140} height={18} />
        </div>
        <Skeleton width={100} height={24} />
      </div>
      <Skeleton width="100%" height={2} />
      <div className="space-y-4">
        <Skeleton width={200} height={28} />
        <section className="bg-secondary rounded-[10px] px-4 py-10 space-y-9">
          <div className="space-y-2">
            <Skeleton width={100} height={16} />
            <Skeleton width={150} height={24} />
          </div>
          <div className="space-y-2">
            <Skeleton width={120} height={16} />
            <Skeleton width={180} height={24} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton width={140} height={16} />
              <Skeleton width={120} height={24} />
            </div>
            <Skeleton width={20} height={20} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton width={100} height={16} />
              <Skeleton width={80} height={24} />
            </div>
            <Skeleton width={20} height={20} />
          </div>
        </section>
      </div>
      <Skeleton width="100%" height={1} />
      <div className="text-center">
        <Skeleton width={300} height={20} />
      </div>
      <div className="space-y-4">
        <Skeleton width="100%" height={48} />
        <Skeleton width="100%" height={48} />
      </div>
    </div>
  );

  return (
    <div className="w-full lg:max-w-[492px] bg-white rounded-[10px] p-8">
      {paymentLoading ? (
        <SkeletonPaymentForm />
      ) : (
        <div className="mx-auto">
          <section className="block lg:flex items-center justify-between">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-textColor mb-2">
                {formData.fullName}
              </h2>
              <p className="text-grey2 text-lg font-normal mb-1">
                {formData.phone}
              </p>
              <p className="text-grey2 text-lg font-medium">
                {formData.email}
              </p>
            </div>

            <div className="mb-8">
              <div className="text-lg font-bold text-textColor">
                  Pay <span className="text-[#00A980]"> {amount}</span>
              </div>
            </div>
          </section>

          <div className="border-b-[0.8px] border-[#696969] mb-10"></div>

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

                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          navigator.clipboard.writeText(accountNumber);
                          handleCopy("account");
                        }}
                      >
                        {copiedField === "account" ? (
                          <svg
                            className="w-5 h-5 text-[#00A980]"
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

                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          navigator.clipboard.writeText(amount);
                          handleCopy("amount");
                        }}
                      >
                        {copiedField === "amount" ? (
                          <svg
                            className="w-5 h-5 text-[#00A980]"
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
                    </div>
                  </section>
                </div>
              </div>

              <div className="h-[1px] w-full bg-dashed-line-dynamic"></div>

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
      )}
    </div>
  );
}
