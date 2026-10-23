"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { SettingsTabs } from "./setting-common/settings-tabs";
import {
  SettingsField,
  SettingsSaveButton,
} from "./ui/settings-field";

import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import Loading from "../../common/Loading";

interface BankDTO {
  bankCode: string;
  bankName: string;
}

interface SettlementAccountDTO {
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  accountName: string | null;
  isVerified: boolean;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  statusCode?: string;
  message?: string;
  data: T;
  metaData?: unknown;
}

interface SettlementForm {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
}

export default function SettlementBankPage() {
  const queryClient = useQueryClient();

  // Fetch the bank list.
  const {
    data: banksResponse,
    status: banksStatus,
  } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/banks",
    queryKey: ["wallet-banks"],
    auth: true,
  });

  // Fetch the saved settlement account.
  const {
    data: settlementResponse,
    status: settlementStatus,
  } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/settlement-account",
    queryKey: ["settlement-account"],
    auth: true,
  });

  const [form, setForm] = useState<SettlementForm>({
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [hasEditedAccount, setHasEditedAccount] = useState(false);

  const lastAttemptedKey = useRef<string | null>(null);

  const formRef = useRef(form);
  formRef.current = form;

  const banks = useMemo<BankDTO[]>(
    () => (Array.isArray(banksResponse?.data) ? banksResponse.data : []),
    [banksResponse],
  );

  useEffect(() => {
    if (
      settlementStatus === "success" &&
      settlementResponse?.isSuccess &&
      !hasEditedAccount
    ) {
      const settlement =
        settlementResponse.data as SettlementAccountDTO;

      const bankCode = settlement.bankCode ?? "";

      const matchingBank = banks.find(
        (bank) => bank.bankCode === bankCode,
      );

      setForm({
        bankName: matchingBank?.bankName ?? settlement.bankName ?? "",
        bankCode,
        accountNumber: settlement.accountNumber ?? "",
        accountName: settlement.accountName ?? "",
      });

      setIsVerified(Boolean(settlement.isVerified));
    }
  }, [settlementResponse, settlementStatus, hasEditedAccount, banks]);

  const isStaleResponse = (variables: any) => {
    const current = formRef.current;

    return (
      variables?.body?.accountNumber !== current.accountNumber ||
      variables?.body?.bankCode !== current.bankCode
    );
  };

  const verifyMutation = useMutation(handleFetch, {
    onSuccess: (res: ApiResponse<any>, variables: any) => {
      if (isStaleResponse(variables)) return;

      if (!res?.isSuccess) {
        setIsVerified(false);

        notification({
          title: "Verification failed",
          message: res?.message || "Could not verify account details.",
          type: "danger",
        });

        return;
      }

      const accountName =
        res.data?.accountName ??
        res.data?.account?.accountName ??
        "";

      if (!accountName) {
        setIsVerified(false);

        notification({
          title: "Verification failed",
          message: "The verification response did not contain an account name.",
          type: "danger",
        });

        return;
      }

      setForm((prev) => ({
        ...prev,
        accountName,
      }));

      setIsVerified(true);
    },

    onError: (err: any, variables: any) => {
      if (isStaleResponse(variables)) return;

      setIsVerified(false);

      setForm((prev) => ({
        ...prev,
        accountName: "",
      }));

      notification({
        title: "Verification failed",
        message:
          err?.toString() || "Could not verify account details.",
        type: "danger",
      });
    },
  });

  const saveMutation = useMutation(handleFetch, {
    onSuccess: async (res: ApiResponse<any>) => {
      if (res?.isSuccess === false) {
        notification({
          title: "Error",
          message: res.message || "Could not save settlement account.",
          type: "danger",
        });

        return;
      }

      await queryClient.invalidateQueries(["settlement-account"]);

      notification({
        title: "Saved",
        message: "Settlement bank updated successfully.",
        type: "success",
      });

      setHasEditedAccount(false);
    },

    onError: (err: any) => {
      notification({
        title: "Error",
        message:
          err?.toString() || "Could not save settlement account.",
        type: "danger",
      });
    },
  });

  const isSaving = saveMutation.isLoading;
  const isVerifying = verifyMutation.isLoading;
  const isLoadingBanks = banksStatus === "loading";
  const isLoadingSettlement = settlementStatus === "loading";
  const isBusy = isSaving || isVerifying;

  const runVerification = (accountNumber: string, bankCode: string) => {
    lastAttemptedKey.current = `${bankCode}:${accountNumber}`;

    setIsVerified(false);

    setForm((prev) => ({
      ...prev,
      accountName: "",
    }));

    verifyMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "wallet/settlement-account/verify",
      auth: true,
      method: "POST",
      body: {
        accountNumber,
        bankCode,
      },
    });
  };

  useEffect(() => {
    if (!hasEditedAccount) return;
    if (form.accountNumber.length !== 10 || !form.bankCode) return;
    if (isVerified || verifyMutation.isLoading) return;

    const key = `${form.bankCode}:${form.accountNumber}`;
    if (lastAttemptedKey.current === key) return;

    runVerification(form.accountNumber, form.bankCode);
  }, [form.accountNumber, form.bankCode, hasEditedAccount, isVerified]);

  const handleBankChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const bankCode = e.target.value;
    const bank = banks.find((item) => item.bankCode === bankCode);

    setHasEditedAccount(true);
    lastAttemptedKey.current = null;

    setForm((prev) => ({
      ...prev,
      bankCode,
      bankName: bank?.bankName ?? "",
      accountName: "",
    }));

    setIsVerified(false);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const accountNumber = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setHasEditedAccount(true);
    lastAttemptedKey.current = null;

    setForm((prev) => ({
      ...prev,
      accountNumber,
      accountName: "",
    }));

    setIsVerified(false);
  };

  const handleVerify = () => {
    if (form.accountNumber.length !== 10 || !form.bankCode) {
      notification({
        title: "Invalid account details",
        message: "Select a bank and enter a valid 10-digit account number.",
        type: "warning",
      });

      return;
    }

    runVerification(form.accountNumber, form.bankCode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !isVerified ||
      !form.accountName ||
      !form.bankCode ||
      form.accountNumber.length !== 10
    ) {
      notification({
        title: "Verify account first",
        message: "Please verify the account number before saving.",
        type: "warning",
      });

      return;
    }

    saveMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "wallet/settlement-account",
      auth: true,
      method: "POST",
      body: {
        bankName: form.bankName,
        bankCode: form.bankCode,
        accountNumber: form.accountNumber,
        accountName: form.accountName,
      },
    });
  };

  const showRetry =
    !isVerified &&
    !isVerifying &&
    Boolean(form.bankCode) &&
    form.accountNumber.length === 10;

  return (
    <div className="flex flex-col gap-6 p-8 font-outfit sm:flex-row">
      <SettingsTabs />

      {/* Full-screen loader only while saving; verification shows inline. */}
      {isSaving && <Loading />}

      <form
        onSubmit={handleSubmit}
        className="max-w-xl flex-1 space-y-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
      >
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Settlement Bank
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Set up the bank account where your settlements will be paid.
          </p>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="settlement-bank"
            className="text-sm font-medium text-gray-700"
          >
            Bank
          </label>

          <select
            id="settlement-bank"
            value={form.bankCode}
            onChange={handleBankChange}
            disabled={isBusy || isLoadingBanks}
            required
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none focus:border-primary-500 disabled:cursor-not-allowed disabled:bg-gray-50"
          >
            <option value="">
              {isLoadingBanks ? "Loading banks..." : "Select bank"}
            </option>

            {banks.map((bank) => (
              <option key={bank.bankCode} value={bank.bankCode}>
                {bank.bankName}
              </option>
            ))}
          </select>

          {banksStatus === "error" && (
            <p className="text-sm text-red-600">
              Could not load banks. Please refresh and try again.
            </p>
          )}

          {banksStatus === "success" &&
            banksResponse?.isSuccess === false && (
              <p className="text-sm text-red-600">
                {banksResponse.message || "Could not load banks."}
              </p>
            )}

          {banksStatus === "success" &&
            banksResponse?.isSuccess &&
            banks.length === 0 && (
              <p className="text-sm text-amber-600">
                No banks were returned by the API.
              </p>
            )}
        </div>

        <div>
          <SettingsField
            label="Account Number"
            maxLength={10}
            value={form.accountNumber}
            onChange={handleAccountNumberChange}
            disabled={isBusy || isLoadingSettlement}
          />

          <p className="mt-1 text-xs text-gray-500">
            Enter the 10-digit account number registered with your bank.
            Your account name is verified automatically.
          </p>
        </div>

        <div>
          <SettingsField
            label="Account Name"
            value={isVerifying ? "Verifying..." : form.accountName}
            onChange={() => {}}
            disabled
          />

          {isVerified && form.accountName && (
            <p className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <span aria-hidden="true">✓</span>
              Account name verified
            </p>
          )}

          {showRetry && (
            <button
              type="button"
              onClick={handleVerify}
              className="mt-3 rounded-lg border border-primary-500 px-4 py-2 text-sm font-medium text-primary-600 transition hover:bg-primary-50"
            >
              Retry verification
            </button>
          )}
        </div>

        <SettingsSaveButton
          disabled={
            isBusy ||
            isLoadingSettlement ||
            !isVerified ||
            !form.accountName ||
            !form.bankCode ||
            form.accountNumber.length !== 10
          }
        />
      </form>
    </div>
  );
}