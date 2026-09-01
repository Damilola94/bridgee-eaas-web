"use client";

import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Check, Copy, KeyRound, RefreshCw, X } from "lucide-react";
import { SettingsTabs } from "./setting-common/settings-tabs";
import useGetQuery from "../../../hooks/useGetQuery";
import handleFetch from "../../../services/api/handleFetch";
import notification from "../../../utilities/notification";
import Loading from "../../common/Loading";
import APIKey, { type ApiKey } from "./setting-common/rotate-key-dialog";

/** Shape of `data` from POST /apikeys/rotate — the plaintext `apiKey` is
 * only ever returned in this one response, never again afterward. */
interface RotatedKey {
  keyId: string;
  apiKey: string;
  previousKeyExpiresAt: string | null;
  /** label of the key that was rotated, stitched in client-side for display */
  label: string;
}

const NEW_KEY_BANNER_SECONDS = 45;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Derives a display status from the raw API status plus expiresAt, since
 * the API only ever returns "Active" or "Revoked" but a key can also be
 * past its expiresAt while technically still marked "Active".
 */
function getDisplayStatus(apiKey: ApiKey): "Active" | "Expired" | "Revoked" {
  if (apiKey.status === "Revoked") return "Revoked";
  if (apiKey.expiresAt && new Date(apiKey.expiresAt).getTime() < Date.now()) {
    return "Expired";
  }
  return "Active";
}

const STATUS_STYLES: Record<ReturnType<typeof getDisplayStatus>, string> = {
  Active: "bg-textGreen text-white",
  Expired: "bg-amber-50 text-amber-700",
  Revoked: "bg-red-50 text-red-700",
};

function StatusBadge({ apiKey }: { apiKey: ApiKey }) {
  const displayStatus = getDisplayStatus(apiKey);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${STATUS_STYLES[displayStatus]}`}
    >
      {displayStatus}
    </span>
  );
}

/**
 * Shows the freshly-rotated plaintext key exactly once, with a copy button
 * and a countdown that auto-dismisses the banner — the key isn't retrievable
 * again after this, so it shouldn't linger on screen indefinitely either.
 */
function NewKeyBanner({
  rotatedKey,
  onDismiss,
}: {
  rotatedKey: RotatedKey;
  onDismiss: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(NEW_KEY_BANNER_SECONDS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onDismiss();
      return;
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [secondsLeft, onDismiss]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(rotatedKey.apiKey);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            New key issued for &ldquo;{rotatedKey.label}&rdquo;
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Copy it now — for security, it won&apos;t be shown again.
            {rotatedKey.previousKeyExpiresAt &&
              ` The previous key stays valid until ${formatDate(rotatedKey.previousKeyExpiresAt)}.`}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-white px-3 py-2 font-mono text-xs text-gray-700">
              {rotatedKey.apiKey}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-900/90"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
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

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-linear"
          style={{ width: `${(secondsLeft / NEW_KEY_BANNER_SECONDS) * 100}%` }}
        />
      </div>
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
  const displayStatus = getDisplayStatus(apiKey);
  const isRevoked = displayStatus === "Revoked";

  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50">
          <KeyRound className="h-4 w-4 text-gray-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">{apiKey.label}</p>
            <StatusBadge apiKey={apiKey} />
            <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
              {apiKey.environment}
            </span>
          </div>
          <p className="mt-0.5 font-mono text-xs text-gray-400">{apiKey.masked}</p>
          <p className="mt-1 text-xs text-gray-400">
            Created {formatDate(apiKey.createdAt)}
            {apiKey.lastUsedAt && ` · Last used ${formatDate(apiKey.lastUsedAt)}`}
            {isRevoked && apiKey.revokedAt && ` · Revoked ${formatDate(apiKey.revokedAt)}`}
            {!isRevoked && apiKey.expiresAt && ` · Expires ${formatDate(apiKey.expiresAt)}`}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRotate(apiKey)}
        disabled={isRevoked}
        className="flex items-center gap-1.5 self-start rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
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
  const [rotatedKey, setRotatedKey] = useState<RotatedKey | null>(null);

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
      if (res?.isSuccess && res?.data) {
        setRotatedKey({ ...res.data, label: rotatingKey?.label ?? "" });
      }
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
        {rotatedKey && (
          <NewKeyBanner rotatedKey={rotatedKey} onDismiss={() => setRotatedKey(null)} />
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">API Keys</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Rotating a key immediately issues a new secret. The old key stays valid for the
            grace period you set, so in-flight integrations don&apos;t break.
          </p>

          <div className="mt-5">
            {status === "success" && apiKeys.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-400">No API keys yet.</p>
            )}
            {apiKeys.map((key) => (
              <ApiKeyRow key={key.keyId} apiKey={key} onRotate={setRotatingKey} />
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