"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsField, SettingsTextarea, SettingsSaveButton } from "./ui/settings-field";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import { SettingsDTO } from "./types/settings";
import Loading from "../../common/Loading";

export default function CompanyProfilePage() {
  const { data, status } = useGetQuery({
    endpoint: "escrow-service/api/v1/settings",
    queryKey: ["settings"],
    auth: true,
  });

  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    email: "",
    tin: "",
  });

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      const settings: SettingsDTO = data.data;
      setForm({
        companyName: settings.companyName,
        companyAddress: settings.companyAddress,
        companyPhone: settings.companyPhone,
        email: settings.companyEmail,
        tin: settings.tin,
      });
    }
  }, [data, status]);

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Saved",
        message: "Company profile updated successfully.",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "settings",
      extra: "company-profile",
      method: "PUT",
      auth:true,
      body: {
        companyName: form.companyName,
        companyAddress: form.companyAddress,
        companyPhone: form.companyPhone,
        companyEmail: form.email,
        tin: form.tin,
      },
    });
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />
  {saveMutation.isLoading && <Loading />}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-primary-500/40 shadow-sm p-8 flex-1 space-y-5">
        <h2 className="text-base font-semibold text-gray-900">Company Profile</h2>

        <SettingsField
          label="Company Name"
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
        />
        <SettingsTextarea
          label="Company Address"
          value={form.companyAddress}
          onChange={(e) => setForm({ ...form, companyAddress: e.target.value })}
        />
        <SettingsField
          label="Company Phone"
          value={form.companyPhone}
          onChange={(e) => setForm({ ...form, companyPhone: e.target.value })}
        />
        <SettingsField
          label="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <SettingsField
          label="TIN"
          value={form.tin}
          onChange={(e) => setForm({ ...form, tin: e.target.value })}
        />

        <SettingsSaveButton disabled={saveMutation.isLoading} />
      </form>
    </div>
  );
}