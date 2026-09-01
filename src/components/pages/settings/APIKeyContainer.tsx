"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Copy, KeyRound, RefreshCw, X } from "lucide-react";
import { SettingsTabs } from "./setting-common/settings-tabs";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import Loading from "../../common/Loading";
import APIKey, { type ApiKey } from "./setting-common/rotate-key-dialog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function CopyableKey({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md bg-gray-50 px-2.5 py-1 font-mono text-xs text-gray-600 transition-colors hover:bg-gray-100"
    >
      {value}
      <Copy className="h-3 w-3 shrink-0" />
      {copied && <span className="text-primary-900">Copied</span>}
    </button>
  );
}

function NewKeyBanner({
  apiKey,
  onDismiss,
}: {
  apiKey: ApiKey;
  onDismiss: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-primary-900/20 bg-primary-900/5 p-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">
          New key generated for &ldquo;{apiKey.label}&rdquo;
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Copy it now — for security, it won&apos;t be shown again.
        </p>
        {apiKey.keyId && (
          <div className="mt-2">
            <CopyableKey value={apiKey.keyId} />
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 text-gray-400 hover:text-gray-600"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function ApiKeyRow({
  apiKey,
  onRotate,
}: {
  apiKey: ApiKey;
  onRotate: (key: ApiKey) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
          <KeyRound className="h-4 w-4 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{apiKey.label}</p>
          <p className="mt-0.5 font-mono text-xs text-gray-400">
            {apiKey.maskedKey}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Created {formatDate(apiKey.createdAt)}
            {apiKey.lastRotatedAt &&
              ` · Last rotated ${formatDate(apiKey.lastRotatedAt)}`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRotate(apiKey)}
        className="flex items-center gap-1.5 self-start rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:self-auto"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Rotate
      </button>
    </div>
  );
}

export default function ApiKeysPage() {
  const {
    data,
    status,
    refetch: refetchKeys,
  } = useGetQuery({
    endpoint: "escrow-service/api/v1/apikeys",
    queryKey: ["api-keys"],
    auth: true,
  });

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [rotatingKey, setRotatingKey] = useState<ApiKey | null>(null);
  const [justRotated, setJustRotated] = useState<ApiKey | null>(null);

  useEffect(() => {
    if (status === "success" && data?.isSuccess) {
      setApiKeys(data.data ?? []);
    }
  }, [data, status]);

  const rotateMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      notification({
        title: "Key rotated",
        message: `A new key was generated for "${rotatingKey?.label}".`,
        type: "success",
      });
      setJustRotated(res?.data ?? null);
      setRotatingKey(null);
      refetchKeys();
    },
    onError: (err: any) => {
      notification({
        title: "Error",
        message: err?.toString() || "Failed to rotate key.",
        type: "danger",
      });
    },
  });

  const handleConfirmRotate = (label: string, graceHours: number) => {
    rotateMutation.mutate({
      service: "escrow-service/api/v1/",
      endpoint: "apikeys",
      extra: "rotate",
      method: "POST",
      auth: true,
      body: { label, graceHours },
    });
  };

  return (
    <div className="p-8 flex flex-col sm:flex-row gap-6 font-outfit">
      <SettingsTabs />
      {(status === "loading" || rotateMutation.isLoading) && <Loading />}

      <div className="flex-1 space-y-5 max-w-xl">
        {justRotated && (
          <NewKeyBanner
            apiKey={justRotated}
            onDismiss={() => setJustRotated(null)}
          />
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">API Keys</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Rotating a key immediately issues a new secret. The old key stays
            valid for the grace period you set, so in-flight integrations
            don&apos;t break.
          </p>

          <div className="mt-5">
            {status === "success" && apiKeys.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">
                No API keys yet.
              </p>
            )}
            {apiKeys.map((key) => (
              <ApiKeyRow key={key.id} apiKey={key} onRotate={setRotatingKey} />
            ))}
          </div>
        </div>
      </div>

      {rotatingKey && (
        <APIKey
          apiKey={rotatingKey}
          isSubmitting={rotateMutation.isLoading}
          onCancel={() => setRotatingKey(null)}
          onConfirm={handleConfirmRotate}
        />
      )}
    </div>
  );
}

