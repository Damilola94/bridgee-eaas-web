"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsSaveButton } from "./ui/settings-field";

function PasswordField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-900">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter Password"
          className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-900"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export default function SecurityPage() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      // surface a proper validation error in your toast system
      console.error("Passwords do not match");
      return;
    }
    console.log(form);
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 space-y-5 max-w-xl">
        <h2 className="text-base font-semibold text-gray-900">Security</h2>

        <PasswordField label="Enter Old Password" value={form.oldPassword} onChange={(v) => setForm({ ...form, oldPassword: v })} />
        <PasswordField label="Create New Password" value={form.newPassword} onChange={(v) => setForm({ ...form, newPassword: v })} />
        <PasswordField label="Confirm Password" value={form.confirmPassword} onChange={(v) => setForm({ ...form, confirmPassword: v })} />

        <SettingsSaveButton />
      </form>
    </div>
  );
}