"use client";

import { useState } from "react";
import { SettingsTabs } from "./setting-common/settings-tabs"
import { SettingsField, SettingsTextarea, SettingsSaveButton } from "./ui/settings-field";

export default function CompanyProfilePage() {
  const [form, setForm] = useState({
    companyName: "Verified Co Ltd",
    companyAddress: "15 Broad Street, Lagos Island, Lagos",
    companyPhone: "08152536637",
    email: "contact@verifiedco.ng",
    tin: "12345453434",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 space-y-5">
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

        <SettingsSaveButton />
      </form>
    </div>
  );
}