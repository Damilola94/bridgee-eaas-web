"use client";

import { useEffect, useState } from "react";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ReleaseAuthoriserForm {
  email: string;
  phone: string;
}

interface ReleaseAuthoriserResponse {
  isSuccess: boolean;
  statusCode: string;
  message: string;
  data: {
    isConfigured: boolean;
    email: string;
    phone: string;
  };
  metaData?: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
}

export default function ReleaseAuthoriserPage() {
  const queryClient = useQueryClient();

  const {
    data,
    status,
  } = useGetQuery({
    endpoint:
      "escrow-service/api/v1/settings/security/release-authoriser",
    queryKey: ["release-authoriser"],
    auth: true,
  });

  const [form, setForm] = useState<ReleaseAuthoriserForm>({
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      const response = data as ReleaseAuthoriserResponse;

      setForm({
        email: response.data?.email ?? "",
        phone: response.data?.phone ?? "",
      });
    }
  }, [data, status]);

  const saveMutation = useMutation(handleFetch, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["release-authoriser"]);
      await queryClient.invalidateQueries(["settings"]);

      notification({
        title: "Saved",
        message: "Release authoriser updated successfully.",
        type: "success",
      });

      setIsReviewing(false);
      setErrors({});
    },

    onError: (err: any) => {
      notification({
        title: "Error",
        message:
          err?.toString() || "Could not update release authoriser.",
        type: "danger",
      });
    },
  });

  const isSaving = saveMutation.isLoading;

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      email: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      email: undefined,
    }));
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);

    setForm((prev) => ({
      ...prev,
      phone: value,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!/^\d{11}$/.test(phone)) {
      nextErrors.phone = "Phone number must be 11 digits.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setIsReviewing(true);
    }
  };

  const handleConfirm = () => {
    saveMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "settings",
      extra: "security/release-authoriser",
      auth: true,
      method: "PUT",
      body: {
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 p-8 font-outfit sm:flex-row">
      <SettingsTabs />

      {isSaving && <Loading />}

      <div className="max-w-xl flex-1 space-y-6">
        <form
          onSubmit={handleContinue}
          className="space-y-5 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Release Authoriser
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              The person who can authorise the release of funds from escrow.
            </p>
          </div>

          <div>
            <SettingsField
              label="Email Address"
              value={form.email}
              disabled={isReviewing || isSaving}
              onChange={handleEmailChange}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <SettingsField
              label="Phone Number"
              maxLength={11}
              value={form.phone}
              disabled={isReviewing || isSaving}
              onChange={handlePhoneChange}
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>

          {!isReviewing && (
            <SettingsSaveButton disabled={isSaving} />
          )}
        </form>

        {isReviewing && (
          <div className="space-y-4 rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">
              Confirm release authoriser
            </h3>

            <p className="text-sm text-gray-500">
              This person will be authorised to release funds. Please check
              the details below before saving.
            </p>

            <dl className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">Email</dt>

                <dd className="break-all text-right font-medium text-gray-900">
                  {form.email.trim()}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-4">
                <dt className="text-gray-500">Phone</dt>

                <dd className="text-right font-medium text-gray-900">
                  {form.phone.trim()}
                </dd>
              </div>
            </dl>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsReviewing(false)}
                disabled={isSaving}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSaving}
                className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : "Confirm and save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}