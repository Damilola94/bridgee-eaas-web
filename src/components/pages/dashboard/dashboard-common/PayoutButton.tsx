"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { ArrowLeft, CheckCircle2, Landmark, Loader2, X } from "lucide-react";

import useGetQuery from "../../../../hooks/useGetQuery";
import handleFetch from "../../../../services/api/handleFetch";
import notification from "../../../../utilities/notification";
import { formatCurrency } from "../../../../utilities/general";

type Step = "details" | "otp" | "success";

interface ApiResponse<T> {
  isSuccess: boolean;
  statusCode?: string;
  message?: string;
  data: T;
  metaData?: unknown;
}

interface SettlementAccountDTO {
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  accountName: string | null;
  isVerified: boolean;
}

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function PayoutButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg bg-[#A3195B] px-5 py-2.5 text-sm text-white ff-bold transition-opacity hover:opacity-90"
      >
        <Landmark size={16} />
        Payout
      </button>

      {open && <PayoutModal onClose={() => setOpen(false)} />}
    </>
  );
}

function PayoutModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const [step, setStep] = useState<Step>("details");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [otp, setOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);

  const { data: settlementResponse, status: settlementStatus } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/settlement-account",
    queryKey: ["settlement-account"],
    auth: true,
  });

  const settlement: SettlementAccountDTO | null =
    settlementResponse?.isSuccess && settlementResponse.data?.accountNumber
      ? settlementResponse.data
      : null;

  const numericAmount = Number(amount);
  const isAmountValid = Number.isFinite(numericAmount) && numericAmount > 0;

  useEffect(() => {
    if (resendIn <= 0) return;

    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);

    return () => clearTimeout(timer);
  }, [resendIn]);

  const otpMutation = useMutation(handleFetch, {
    onSuccess: (res: ApiResponse<boolean>) => {
      if (!res?.isSuccess) {
        notification({
          title: "Error",
          message: res?.message || "Could not send OTP.",
          type: "danger",
        });

        return;
      }

      setOtp("");
      setResendIn(RESEND_SECONDS);
      setStep("otp");

      notification({
        title: "OTP sent",
        message: "Enter the code sent to you to confirm this payout.",
        type: "success",
      });
    },

    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Could not send OTP.",
        type: "danger",
      });
    },
  });

  const payoutMutation = useMutation(handleFetch, {
    onSuccess: async (res: ApiResponse<any>) => {
      if (!res?.isSuccess) {
        notification({
          title: "Payout failed",
          message: res?.message || "Could not process payout request.",
          type: "danger",
        });

        return;
      }

      await queryClient.invalidateQueries(["escrow-dashboard-summary"]);

      setStep("success");
    },

    onError: (err: any) => {
      notification({
        title: "Payout failed",
        message: err?.toString() || "Could not process payout request.",
        type: "danger",
      });
    },
  });

  const isRequestingOtp = otpMutation.isLoading;
  const isSubmitting = payoutMutation.isLoading;
  const isBusy = isRequestingOtp || isSubmitting;

  const requestOtp = () => {
    otpMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "wallet/settlement-requests/request-otp",
      auth: true,
      method: "POST",
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value
      .replace(/[^\d.]/g, "")
      .replace(/(\..*)\./g, "$1")
      .replace(/^(\d*\.\d{0,2}).*$/, "$1");
    setAmount(cleaned);
  };

  const handleDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!settlement) {
      notification({
        title: "No settlement bank",
        message:
          "Add a settlement bank in settings before requesting a payout.",
        type: "warning",
      });

      return;
    }

    if (!isAmountValid) {
      notification({
        title: "Invalid amount",
        message: "Enter an amount greater than zero.",
        type: "warning",
      });

      return;
    }

    if (!narration.trim()) {
      notification({
        title: "Narration required",
        message: "Add a short narration for this payout.",
        type: "warning",
      });

      return;
    }

    requestOtp();
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== OTP_LENGTH) {
      notification({
        title: "Invalid OTP",
        message: `Enter the ${OTP_LENGTH}-digit code.`,
        type: "warning",
      });

      return;
    }

    payoutMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "wallet/settlement-requests",
      auth: true,
      method: "POST",
      body: {
        otp,
        amount: numericAmount,
        narration: narration.trim(),
      },
    });
  };

  const handleClose = () => {
    if (isBusy) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payout-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            {step === "otp" && (
              <button
                type="button"
                onClick={() => setStep("details")}
                disabled={isBusy}
                aria-label="Back"
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div>
              <h2 id="payout-title" className="text-lg text-gray-900 ff-bold">
                {step === "success" ? "Payout requested" : "Payout"}
              </h2>

              {step === "details" && (
                <p className="mt-0.5 text-xs text-gray-500 ff-regular">
                  Withdraw funds to your settlement bank account.
                </p>
              )}

              {step === "otp" && (
                <p className="mt-0.5 text-xs text-gray-500 ff-regular">
                  Confirm {formatCurrency(numericAmount)} with the OTP sent to
                  you.
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isBusy}
            aria-label="Close"
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step 1: details */}
        {step === "details" && (
          <form onSubmit={handleDetailsSubmit} className="space-y-5">
            {/* Destination account */}
            {settlementStatus === "loading" ? (
              <div className="flex items-center justify-center rounded-xl border border-gray-200 py-5">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                <span className="text-sm text-gray-500">
                  Loading settlement bank...
                </span>
              </div>
            ) : settlementStatus === "error" ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                Could not load your settlement bank. Please try again.
              </div>
            ) : !settlement ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                You have not set up a settlement bank yet. Add one in Settings
                &gt; Settlement Bank to request a payout.
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A3195B]/10">
                  <Landmark size={16} className="text-[#A3195B]" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm text-gray-900 ff-bold">
                    {settlement.accountName}
                  </p>

                  <p className="truncate text-xs text-gray-500 ff-regular">
                    {settlement.bankName} · {settlement.accountNumber}
                  </p>
                </div>
              </div>
            )}

            {/* Amount */}
            <div className="space-y-1">
              <label
                htmlFor="payout-amount"
                className="text-sm font-medium text-gray-700"
              >
                Amount (NGN)
              </label>

              <input
                id="payout-amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                disabled={isBusy}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-[#A3195B] disabled:cursor-not-allowed disabled:bg-gray-50"
              />

              {isAmountValid && (
                <p className="text-xs text-gray-500">
                  You are withdrawing {formatCurrency(numericAmount)}
                </p>
              )}
            </div>

            {/* Narration */}
            <div className="space-y-1">
              <label
                htmlFor="payout-narration"
                className="text-sm font-medium text-gray-700"
              >
                Narration
              </label>

              <textarea
                id="payout-narration"
                rows={3}
                placeholder="e.g. Weekly settlement"
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                disabled={isBusy}
                className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-[#A3195B] disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            <button
              type="submit"
              disabled={
                isBusy || !settlement || !isAmountValid || !narration.trim()
              }
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A3195B] px-4 py-3 text-sm text-white ff-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isRequestingOtp && <Loader2 className="h-4 w-4 animate-spin" />}
              {isRequestingOtp ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="rounded-xl border border-gray-200 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Amount</span>
                <span className="text-gray-900 ff-bold">
                  {formatCurrency(numericAmount)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-gray-500">To</span>
                <span className="truncate text-right text-gray-900">
                  {settlement?.accountName} · {settlement?.accountNumber}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between gap-4">
                <span className="text-gray-500">Narration</span>
                <span className="truncate text-right text-gray-900">
                  {narration.trim()}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="payout-otp"
                className="text-sm font-medium text-gray-700"
              >
                One-time password
              </label>

              <input
                id="payout-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={OTP_LENGTH}
                placeholder={"•".repeat(OTP_LENGTH)}
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
                }
                disabled={isBusy}
                autoFocus
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-center text-lg tracking-[0.5em] text-gray-900 outline-none focus:border-[#A3195B] disabled:cursor-not-allowed disabled:bg-gray-50"
              />

              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-gray-500">Didn&apos;t get the code?</span>

                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={resendIn > 0 || isBusy}
                  className="text-[#A3195B] ff-bold disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isBusy || otp.length !== OTP_LENGTH}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A3195B] px-4 py-3 text-sm text-white ff-bold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Processing..." : "Confirm payout"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 size={28} className="text-emerald-600" />
            </div>

            <p className="text-base text-gray-900 ff-bold">
              {formatCurrency(numericAmount)} payout requested
            </p>

            <p className="mt-1 text-sm text-gray-500 ff-regular">
              Your settlement request has been submitted and will be paid to{" "}
              {settlement?.bankName} · {settlement?.accountNumber}.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-lg border border-[#A3195B] px-4 py-3 text-sm text-[#A3195B] ff-bold transition hover:bg-[#A3195B]/5"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

