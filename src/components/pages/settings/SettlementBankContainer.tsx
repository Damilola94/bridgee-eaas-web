"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsField, SettingsSaveButton } from "./ui/settings-field";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import Loading from "../../common/Loading";

interface SettlementAccountDTO {
  bankName: string | null;
  bankCode: string | null;
  accountNumber: string | null;
  accountName: string | null;
  isVerified: boolean;
}

// TODO: replace with your real bank list (e.g. fetched from a /banks endpoint)
const BANKS = [
  { name: "Access Bank", code: "044" },
  { name: "GTBank", code: "058" },
  { name: "Zenith Bank", code: "057" },
];

export default function SettlementBankPage() {
  const { data, status } = useGetQuery({
    endpoint: "escrow-service/api/v1/wallet/settlement-account",
    queryKey: ["settlement-account"],
    auth: true,
  });

  const [form, setForm] = useState({
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      const settlement: SettlementAccountDTO = data.data;
      setForm({
        bankName: settlement.bankName || "",
        bankCode: settlement.bankCode || "",
        accountNumber: settlement.accountNumber || "",
        accountName: settlement.accountName || "",
      });
      setIsVerified(Boolean(settlement.isVerified));
    }
  }, [data, status]);

  const verifyMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      if (res?.isSuccess) {
        setForm((prev) => ({ ...prev, accountName: res.data.accountName }));
        setIsVerified(true);
        notification({
          title: "Verified",
          message: "Account name resolved successfully.",
          type: "success",
        });
      }
    },
    onError: (err: any) => {
      setIsVerified(false);
      notification({
        title: "Verification failed",
        message: err?.toString() || "Could not verify account details.",
        type: "danger",
      });
    },
  });

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Saved",
        message: "Settlement bank updated successfully.",
        type: "success",
      });
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const bank = BANKS.find((b) => b.code === code);
    setForm({
      ...form,
      bankCode: code,
      bankName: bank?.name || "",
      accountName: "",
    });
    setIsVerified(false);
  };

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, accountNumber: e.target.value, accountName: "" });
    setIsVerified(false);
  };

  const handleVerify = () => {
    if (!form.accountNumber || !form.bankCode) return;
    verifyMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "wallet/settlement-account/verify",
      auth: true,
      method: "POST",
      body: { accountNumber: form.accountNumber, bankCode: form.bankCode },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isVerified) {
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

  const isSaving = saveMutation.isLoading;
  const isVerifying = verifyMutation.isLoading;
  const canVerify =
    form.accountNumber.length === 10 && Boolean(form.bankCode) && !isVerified;

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />
      {(isSaving || isVerifying) && <Loading />}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 space-y-5 max-w-xl"
      >
        <h2 className="text-base font-semibold text-gray-900">
          Settlement Bank
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Bank</label>
          <select
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900"
            value={form.bankCode}
            onChange={handleBankChange}
          >
            <option value="">Select bank</option>
            {BANKS.map((bank) => (
              <option key={bank.code} value={bank.code}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <SettingsField
          label="Account Number"
          maxLength={10}
          value={form.accountNumber}
          onChange={handleAccountNumberChange}
        />

        {canVerify && (
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-60"
          >
            {isVerifying ? "Verifying..." : "Verify account"}
          </button>
        )}

        <SettingsField
          label="Account Name"
          value={form.accountName}
          onChange={() => {}}
          disabled
        />
        {isVerified && form.accountName && (
          <p className="text-sm text-green-600 -mt-3">Account verified</p>
        )}

        <SettingsSaveButton disabled={isSaving || !isVerified} />
      </form>
    </div>
  );
}