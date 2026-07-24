import { useState } from "react";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsField, SettingsSaveButton } from "./ui/settings-field";

export default function ContactPersonPage() {
  const [form, setForm] = useState({
    fullName: "Toluwalase Obasun",
    phone: "08142536647",
    email: "toluobasun@gmail.com",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 space-y-5 max-w-xl">
        <h2 className="text-base font-semibold text-gray-900">Contact Person</h2>

        <SettingsField
          label="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <SettingsField
          label="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <SettingsField
          label="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <SettingsSaveButton />
      </form>
    </div>
  );
}