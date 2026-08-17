"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { SettingsTabs } from "./setting-common/settings-tabs";
import { SettingsSaveButton } from "./ui/settings-field";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import { SettingsDTO } from "./types/settings";
import Loading from "../../common/Loading";

const THEME_COLORS = ["#1B1749", "#A3195B", "#22C55E", "#34D399"];

export default function PersonalizationPage() {
  const { data, status } = useGetQuery({
    endpoint: "escrow-service/api/v1/settings",
    queryKey: ["settings"],
    auth: true,
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogoUrl, setExistingLogoUrl] = useState("");
  const [selectedColor, setSelectedColor] = useState(THEME_COLORS[1]);

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      const settings: SettingsDTO = data.data;
      setExistingLogoUrl(settings.companyLogoUrl);
      if (THEME_COLORS.includes(settings.themeColor)) {
        setSelectedColor(settings.themeColor);
      }
    }
  }, [data, status]);

  const saveMutation = useMutation(handleFetch, {
    onSuccess: () => {
      notification({
        title: "Saved",
        message: "Personalization settings updated.",
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogoFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    if (logoFile) body.append("Logo", logoFile);
    body.append("ThemeColor", selectedColor);

    saveMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "settings",
      extra: "personalization",
      method: "PUT",
      auth: true,
      multipart: true, 
      body,
    });
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />
  {saveMutation.isLoading && <Loading />}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border-2 border-primary-500/40 shadow-sm p-8 flex-1 space-y-6 max-w-xl">
        <h2 className="text-base font-semibold text-gray-900">Personalization</h2>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-900">Company logo</label>
          <div className="flex items-center gap-2">
            <div className="flex-1 px-4 py-3 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400 truncate">
              {logoFile?.name || existingLogoUrl || "---"}
            </div>
            <label className="px-5 py-3 border border-pink-700 text-pink-700 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap">
              Select File
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Theme color</label>
          <div className="flex items-center gap-3">
            {THEME_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`w-9 h-9 rounded-full transition-transform ${
                  selectedColor === color ? "ring-2 ring-offset-2 ring-gray-400 scale-105" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <SettingsSaveButton disabled={saveMutation.isLoading} />
      </form>
    </div>
  );
}