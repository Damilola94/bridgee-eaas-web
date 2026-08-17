"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsField, SettingsSaveButton } from "./ui/settings-field";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import { SettingsDTO } from "./types/settings";
import Loading from "../../common/Loading";

export default function ContactPersonPage() {
  const { data, status } = useGetQuery({
    endpoint: "escrow-service/api/v1/settings",
    queryKey: ["settings"],
    auth: true,
  });

  const [form, setForm] = useState({ fullName: "", phone: "", email: "" });
  const [originalEmail, setOriginalEmail] = useState("");
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      const settings: SettingsDTO = data.data;
      setForm({
        fullName: settings.fullName,
        phone: settings.contactPhoneNumber,
        email: settings.contactEmail,
      });
      setOriginalEmail(settings.contactEmail);
    }
  }, [data, status]);

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Saved",
        message: "Contact details updated successfully.",
        type: "success",
      });
      if (form.email !== originalEmail) {
        requestEmailChangeMutation.mutate({
          service: "escrow-service/api/v1/",
          endpoint: "settings/contact-person",
          extra: "request-email-change",
          auth:true,
          method: "POST",
          body: { newEmail: form.email },
        });
      }
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Something went wrong.",
        type: "danger",
      });
    },
  });

  const requestEmailChangeMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Verify your new email",
        message: "A verification code has been sent to your new email address.",
        type: "warning",
      });
      setAwaitingOtp(true);
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Could not start email change.",
        type: "danger",
      });
    },
  });

  const confirmEmailChangeMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Email updated",
        message: "Your email address has been changed.",
        type: "success",
      });
      setOriginalEmail(form.email);
      setAwaitingOtp(false);
      setOtp("");
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Invalid or expired code.",
        type: "danger",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "settings",
      extra: "contact-person",
      auth: true,
      method: "PUT",
      body: { fullName: form.fullName, phoneNumber: form.phone },
    });
  };

  const handleConfirmOtp = (e: React.FormEvent) => {
    e.preventDefault();
    confirmEmailChangeMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "settings/contact-person/",
      extra: "confirm-email-change",
      auth: true,
      method: "POST",
      body: { newEmail: form.email, otp },
    });
  };

  const isSaving =
    saveMutation.isLoading || requestEmailChangeMutation.isLoading;

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />
      {isSaving && <Loading />}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex-1 space-y-5 max-w-xl"
      >
        <h2 className="text-base font-semibold text-gray-900">
          Contact Person
        </h2>

        <SettingsField
          label="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <SettingsField
          label="Phone Number"
          maxLength={11}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <SettingsField
          label="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <SettingsSaveButton disabled={isSaving} />
      </form>

      {awaitingOtp && (
        <form
          onSubmit={handleConfirmOtp}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-4 max-w-sm"
        >
          <h3 className="text-sm font-semibold text-gray-900">
            Confirm new email
          </h3>
          <p className="text-sm text-gray-500">
            Enter the code sent to {form.email}.
          </p>
          <SettingsField
            label="Verification code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <SettingsSaveButton disabled={confirmEmailChangeMutation.isLoading}>
            Confirm
          </SettingsSaveButton>
        </form>
      )}
    </div>
  );
}
