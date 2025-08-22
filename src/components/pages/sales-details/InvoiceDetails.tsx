import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";

import DefaultLogo from "../../../assets/images/business-logo.png";

import Button from "../../inputs/Button";
import {
  formatCurrency,
  formatDisbursementType
} from "../../../utilities/general";
import { formatDate } from "../../../utilities/dateTime";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import Loading from "../../common/Loading";
import TransactionStatus from "../../common/TransactionStatus";
import AcceptInvite from "../invites/AcceptInvite";
import ConfirmPrompt from "../../common/ConfirmPrompt";
import ToggleInput from "../../inputs/Toggle";

import PaymentModal from "./PaymentModal";
import ConfirmDelivery from "./ConfirmDelivery";
import ViewAgreement from "./ViewAgreement";
import GetDeliveryRates from "./GetDeliveryRates";
import UpdateAddressModal from "./UpdateAddressModal";
// import PickupAddress from "./CustomerAddress";

type DeliveryOption = {
  id: string;
  amount: number;
  estimatedDeliveryTime: string;
  courier?: {
    name: string;
    icon?: string;
  };
};

type DeliveryRateData = {
  quoteId: string;
  amount: number;
  currency: string;
  estimatedDeliveryTime: string;
  deliveryOptions: DeliveryOption[];
};

function InvoiceDetails({ data = {} }: { data: any }) {
  const router = useRouter();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUpdateAddModal, setShowUpdateAddModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [confirmStatusUpdate, setConfirmStatusUpdate] = useState(false);
  const [showDeliveryConfirmationModal, setShowDeliveryConfirmationModal] =
    useState(false);

  const [useDeliveryToggle, setDeliveryToggle] = useState(false);
  const [showGetDeliveryRateModal, setShowGetDeliveryRateModal] =
    useState(false);
  const [deliveryRateList, setDeliveryRateList] = useState<DeliveryRateData | null>(null);

  const [deliveryRate, setDeliveryRate] = useState<{
    rateId?: string;
    amount?: number;
  }>({});

  const deliveryPrompt = useRef<{ status?: string; message?: string }>({});

  const queryClient = useQueryClient();

  useEffect(() => {
    setDeliveryRate({});
  }, [useDeliveryToggle]);

  const acceptanceMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setShowDeclineModal(false);
      queryClient.invalidateQueries(["escrow", data?.escrowId]);
      notification({
        message: res?.message || "You have successfully rejected an invoice",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleActionAfterOTPRequest = () => {
    if (data?.deliveryStatus === "Delivered") {
      setShowDeliveryConfirmationModal(true);
    } else {
      setShowPaymentModal(true);
    }
  };

  const requestOtpMutation = useMutation(handleFetch, {
    onSuccess: () => {
      handleActionAfterOTPRequest();
    },
    onError: (err) => {
      if (String(err).includes("Error: OTP already sent")) {
        handleActionAfterOTPRequest();
      } else {
        notification({
          title: "Error",
          message:
            String(err) || "An error occurred while requesting for payment OTP",
          type: "danger"
        });
      }
    }
  });

  const deliveryStatusMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setConfirmStatusUpdate(false);
      queryClient.invalidateQueries(["escrow", data?.escrowId]);
      notification({
        message: res?.message || "You have successfully rejected an invoice",
        type: "success"
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleOtpGeneration = (otpPurpose: string) => {
    requestOtpMutation.mutate({
      endpoint: "auth",
      extra: "generate-otp",
      pQuery: { otpPurpose },
      method: "POST",
      auth: true
    });
    handleActionAfterOTPRequest();
  };

  const handleDecline = () => {
    acceptanceMutation.mutate({
      endpoint: "invitation",
      extra: `reject-invitation?referenceNumber=${router?.query?.reference}`,
      method: "PUT",
      auth: true
    });
  };

  const handleRateSelection = (rateId?: string, amount?: number) => {
    setDeliveryRate({ rateId, amount });
    setShowGetDeliveryRateModal(false);
  };

  const handleDeliveryPrompt = (escrowDeliveryStatus: string) => {
    let message = "";
    switch (escrowDeliveryStatus) {
    case "Processing": {
      message = "Are you sure you want to start processing this order?";
      break;
    }
    case "OutForDelivery": {
      message =
          "Are you sure the order item(s) have been sent out for delivery?";
      break;
    }
    case "Delivered": {
      message = "Are you sure the item(s) have been delivered?";
      break;
    }
    case "Returned": {
      message = "";
      break;
    }
    case "Cancelled": {
      message = "Are you sure you want to cancel this order?";
      break;
    }
    default: {
      return;
    }
    }
    deliveryPrompt.current = { status: escrowDeliveryStatus, message };
    setConfirmStatusUpdate(true);
  };

  const handleDeliveryStatusUpdate = () => {
    deliveryStatusMutation.mutate({
      endpoint: "escrow",
      extra: "set-escroworder-deliverystatus",
      body: { escrowId: data?.escrowId },
      pQuery: { escrowDeliveryStatus: deliveryPrompt.current?.status },
      method: "PUT",
      auth: true
    });
  };

  const deliveryRateMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      setDeliveryRateList(res?.data);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger"
      });
    }
  });

  const handleDeliveryRate = () => {
    deliveryRateMutation.mutate({
      endpoint: "logistic",
      extra: `shipment/rate/${data?.invoiceNumber}`,
      method: "POST",
      auth: true
    });
  };

  const { isLoading } = acceptanceMutation;
  const { isLoading: otpLoading } = requestOtpMutation;
  const { isLoading: deliveryLoading } = deliveryStatusMutation;
  const { isLoading: deliveryRateLoading, status } = deliveryRateMutation;

  const deliveryRateHandler = async () => {
    handleDeliveryRate();
  };

  const updateAddHandler = () => {
    setShowGetDeliveryRateModal(false);
    setShowUpdateAddModal(true);
  };

  const clodeUpdateAddHandler = () => {
    setShowGetDeliveryRateModal(true);
    setShowUpdateAddModal(false);
  };

  useEffect(() => {
    if (status === "success") {
      setShowGetDeliveryRateModal(true);
    }
  }, [status]);

  if (data?.escrowId) {
    return (
      <>
        {(isLoading || deliveryLoading) && <Loading message="Processing..." />}
        {otpLoading && <Loading message="Sending OTP..." />}
        {deliveryRateLoading && <Loading message="Loading Rate..." />}
        <div className="w-full bg-white px-5 sm:px-10 py-8 rounded-lg shadow-md">
          <div className="w-full mb-5">
            <div className="flex flex-wrap flex-col-reverse sm:flex-row w-full justify-between mb-5">
              <div className="text-left">
                <div className="flex mb-2">
                  <Image
                    src={data?.sellerDetails?.pictPath || DefaultLogo}
                    alt="Seller Logo"
                    width={80}
                    height={80}
                    className="w-20 h-20"
                  />
                </div>
                <h3 className="font-bold text-xl">
                  {data?.sellerDetails?.name}
                </h3>
                <p className="mb-1">{data?.sellerDetails?.address}</p>
                <p className="text-lightText">{formatDate(data?.createAt)}</p>
              </div>
              <div className="text-right">
                <h2 className="ff-bold font-bold text-2xl">{`Invoice #${data?.invoiceNumber}`}</h2>
                <TransactionStatus
                  status={
                    data?.status === "paymentcompleted"
                      ? data?.deliveryStatus
                      : data?.status
                  }
                />
              </div>
            </div>

            <div className="sm:flex w-full justify-between">
              <div className="text-left">
                <h3 className="font-bold ff-bold text-lg mb-2">
                  Recipient Details
                </h3>
                <p className="mb-1">{data?.recipientDetails?.name}</p>
                <div className="w-full text-lightText">
                  <p className="mb-1">{data?.recipientDetails?.email}</p>
                  <p className="mb-1">{data?.recipientDetails?.phoneNumber}</p>
                  <p className="mb-1">{data?.recipientDetails?.address}</p>
                </div>
              </div>

              <div className="text-right">
                <h3 className="font-bold ff-bold text-lg mb-2">
                  Order Details
                </h3>
                <div className="w-full">
                  <p className="mb-1">
                    <span className="text-lightText">
                      Disbursement Type:&nbsp;
                    </span>
                    {formatDisbursementType(data?.disbursementType)}
                  </p>
                  <p className="mb-1">
                    <span className="text-lightText">
                      Dispute Manager:&nbsp;
                    </span>
                    UseBridge Inc.
                  </p>
                  <p className="mb-1">
                    <span className="text-lightText">Inspection:&nbsp;</span>
                    {`${data?.inspectionDay} Hours(s)`}
                  </p>
                  {data?.disbursementType === "installment" && (
                    <p className="mb-1">
                      <span className="text-lightText">Due Date:&nbsp;</span>
                      {formatDate(data?.dueDate)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mb-5 overflow-auto">
            <table className="w-full min-w-max table-auto text-left border-b">
              <thead className="bg-secondary uppercase">
                <tr>
                  <th className="px-3 py-3">Item Name</th>
                  <th className="px-3 py-3 text-center">Quantity</th>
                  <th className="px-3 py-3 text-center">Weight</th>
                  <th className="px-3 py-3">Unit Price</th>
                  <th className="px-3 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {data?.items?.map((item: any) => (
                  <tr key={item?.id}>
                    <td className="px-3 py-3">{item?.name}</td>
                    <td className="px-3 py-3 text-center">{item?.quantity}</td>
                    <td className="px-3 py-3 text-center">{`${item?.weight}kg`}</td>
                    <td className="px-3 py-3">
                      {formatCurrency(item?.unitPrice)}
                    </td>
                    <td className="px-3 py-3 font-bold ff-bold text-right">
                      {formatCurrency(item?.totalAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end mb-5">
            <div className="w-full max-w-[280px]">
              <div className="w-full flex justify-between mb-3">
                <p className="">SUBTOTAL</p>
                <p className="font-bold ff-bold">
                  {formatCurrency(data?.totalAmount)}
                </p>
              </div>
              <div className="w-full flex justify-between mb-3">
                <p className="">Escrow fee</p>
                <p className="font-bold ff-bold">{formatCurrency(data?.fee)}</p>
              </div>
              <div className="w-full flex justify-between mb-3">
                <p className="">Delivery Fee</p>
                <p className="font-bold ff-bold">
                  {formatCurrency(deliveryRate?.amount || data?.deliveryFee)}
                </p>
              </div>
              <div className="w-full flex justify-between mb-3 text-lg">
                <p className="">TOTAL</p>
                <p className="font-bold ff-bold">
                  {formatCurrency(
                    data?.totalAmount +
                      data?.fee +
                      (deliveryRate?.amount || data?.deliveryFee)
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mb-5">
            <button
              onClick={() => setShowAgreementModal(true)}
              className="text-primary underline hover:no-underline"
            >
              View Escrow Agreement
            </button>
          </div>

          {data?.isSeller ? (
            <>
              {data?.status === "paymentcompleted" && (
                <>
                  {data?.deliveryStatus === "Pending" && (
                    <div className="w-full flex justify-end space-x-3">
                      <Button
                        bgColor="bg-error"
                        onClick={() => handleDeliveryPrompt("Cancelled")}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleDeliveryPrompt("Processing")}
                      >
                        Process Order
                      </Button>
                    </div>
                  )}
                  {data?.deliveryStatus === "Processing" && (
                    <div className="w-full flex justify-end space-x-3">
                      <Button
                        bgColor="bg-error"
                        onClick={() => handleDeliveryPrompt("Cancelled")}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => handleDeliveryPrompt("OutForDelivery")}
                      >
                        Out for Delivery
                      </Button>
                    </div>
                  )}
                  {data?.deliveryStatus === "OutForDelivery" && (
                    <div className="w-full flex justify-end space-x-3">
                      <Button
                        bgColor="bg-error"
                        onClick={() => handleDeliveryPrompt("Cancelled")}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => handleDeliveryPrompt("Delivered")}>
                        Delivered
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {data?.status === "pending" && (
                <div className="w-full flex justify-end space-x-3">
                  <Button
                    bgColor="bg-error"
                    onClick={() => setShowDeclineModal(true)}
                  >
                    Decline
                  </Button>
                  <Button onClick={() => setShowAcceptModal(true)}>
                    Accept
                  </Button>
                </div>
              )}

              {data?.status === "awaitingpayment" && (
                <div className="w-full flex flex-wrap justify-between">
                  <div className="flex items-center space-x-2 pb-5">
                    <ToggleInput
                      label="Delivery"
                      value={useDeliveryToggle}
                      onChange={(val) => setDeliveryToggle(val)}
                    />
                    <span className="text-[#E08700] font-bold">
                      Powered by Dellyman
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap -ml-2">
                      {useDeliveryToggle && (
                        <Button
                          className="ml-2 mb-2"
                          onClick={() => deliveryRateHandler()}
                        >
                          {deliveryRate.amount
                            ? "Change Delivery Rates"
                            : "Get Delivery Rates"}
                        </Button>
                      )}
                      {(!useDeliveryToggle ||
                        (useDeliveryToggle && deliveryRate.amount)) && (
                        <Button
                          className="ml-2 mb-2"
                          onClick={() => handleOtpGeneration("EscrowDeposit")}
                        >
                          Make Payment
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {data?.status === "paymentcompleted" &&
                data?.deliveryStatus === "Delivered" && (
                <div className="w-full flex justify-end space-x-3">
                  <Button
                    bgColor="bg-error"
                    onClick={() =>
                      router.push({
                        pathname: `/disputes/manage-dispute/${data?.escrowId}`
                      })
                    }
                  >
                      Raise Dispute
                  </Button>
                  <Button
                    onClick={() =>
                      handleOtpGeneration("EscrowOrderCompleted")
                    }
                  >
                      Confirm Delivery
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {showAgreementModal && (
          <ViewAgreement
            onClose={() => setShowAgreementModal(false)}
            file={data?.agreemmentDocPath}
            text={data?.agreementWrittenTerms}
          />
        )}

        {showAcceptModal && (
          <AcceptInvite onClose={() => setShowAcceptModal(false)} />
        )}

        <ConfirmPrompt
          title="Confirm action"
          message="Are you sure you want to reject/decline this invite?"
          isOpen={showDeclineModal}
          handleYes={handleDecline}
          onClose={() => setShowDeclineModal(false)}
        />

        {showGetDeliveryRateModal && deliveryRateList && (
          <GetDeliveryRates
            onClose={() => setShowGetDeliveryRateModal(false)}
            onSelection={handleRateSelection}
            deliveryRateList={deliveryRateList}
            onUpdateAdd={updateAddHandler}
            data={data}
          />
        )}
        {/* {showGetDeliveryRateModal && (
          <PickupAddress
            onClose={() => setShowGetDeliveryRateModal(false)}
          />
        )} */}
        {showUpdateAddModal && (
          <UpdateAddressModal
            onClose={clodeUpdateAddHandler}
            invoiceId={data?.invoiceNumber}
            recipientDetails={data?.recipientDetails}
            escrowId={data?.escrowId}
          />
        )}

        {showPaymentModal && (
          <PaymentModal
            onClose={() => setShowPaymentModal(false)}
            escrowId={data?.escrowId}
            rateId={useDeliveryToggle ? deliveryRate?.rateId : undefined}
            useDeliveryToggle={useDeliveryToggle}
          />
        )}

        <ConfirmPrompt
          title="Confirm delivery action"
          message={deliveryPrompt.current?.message}
          isOpen={confirmStatusUpdate}
          handleYes={handleDeliveryStatusUpdate}
          onClose={() => setConfirmStatusUpdate(false)}
        />

        {showDeliveryConfirmationModal && (
          <ConfirmDelivery
            onClose={() => setShowDeliveryConfirmationModal(false)}
            escrowId={data?.escrowId}
          />
        )}
      </>
    );
  }

  return null;
}

export default InvoiceDetails;
